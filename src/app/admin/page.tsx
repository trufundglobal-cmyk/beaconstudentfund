'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DownloadSimple, CheckCircle, XCircle, FilePdf, IdentificationCard, Funnel, Clock, MagnifyingGlass } from '@phosphor-icons/react';

type Application = {
  id: string;
  created_at: string;
  status: string;
  full_name: string;
  loan_amount: number;
  school_name: string;
  passport_path: string | null;
  transcript_path: string | null;
};

export default function AdminPortal() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  async function fetchApplications() {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setLoading(false);
    }
  }

  async function downloadDocument(path: string, fileName: string) {
    if (!path) return;
    
    try {
      const { data, error } = await supabase
        .storage
        .from('documents')
        .download(path);

      if (error) throw error;

      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
    } catch (error) {
      console.error('Error downloading document:', error);
      alert('Could not download the document.');
    }
  }

  async function updateStatus(id: string, newStatus: string) {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      fetchApplications(); // Refresh list
    } catch (error) {
      console.error('Error updating status:', error);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'approved') return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    if (s === 'rejected') return 'bg-rose-100 text-rose-800 border-rose-200';
    return 'bg-amber-100 text-amber-800 border-amber-200';
  };

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 font-outfit">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm mt-1">Manage student loan applications</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-100 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 flex items-center gap-2">
              <Clock size={18} />
              Total: {applications.length}
            </div>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500">
              No applications found.
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-5 border-b border-slate-100">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{app.full_name}</h3>
                      <p className="text-xs text-slate-500">Applied: {new Date(app.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className={`inline-flex px-2.5 py-1 text-[10px] uppercase font-bold rounded-full border ${getStatusBadge(app.status)}`}>
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="bg-slate-50 rounded-xl p-3 mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-500">Requested Amount</span>
                      <span className="font-bold text-teal-700">${app.loan_amount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">Institution</span>
                      <span className="text-sm font-medium text-slate-700 truncate ml-4">{app.school_name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {app.passport_path ? (
                      <button 
                        onClick={() => downloadDocument(app.passport_path!, `${app.full_name.replace(' ', '_')}_Passport.jpg`)}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors border border-slate-200"
                      >
                        <IdentificationCard size={16} /> Passport
                      </button>
                    ) : (
                      <span className="flex-1 flex justify-center items-center px-3 py-2 bg-slate-50 text-slate-400 text-xs italic rounded-lg border border-slate-100">No Passport</span>
                    )}
                    
                    {app.transcript_path ? (
                      <button 
                        onClick={() => downloadDocument(app.transcript_path!, `${app.full_name.replace(' ', '_')}_Transcript.pdf`)}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors border border-slate-200"
                      >
                        <FilePdf size={16} /> Transcript
                      </button>
                    ) : (
                      <span className="flex-1 flex justify-center items-center px-3 py-2 bg-slate-50 text-slate-400 text-xs italic rounded-lg border border-slate-100">No Transcript</span>
                    )}
                  </div>
                </div>
                
                {/* Actions Grid */}
                <div className="grid grid-cols-2 divide-x divide-slate-100 bg-slate-50">
                  <button 
                    onClick={() => updateStatus(app.id, 'approved')}
                    className="py-3 flex justify-center items-center gap-2 text-emerald-600 font-semibold text-sm hover:bg-emerald-50 transition-colors"
                  >
                    <CheckCircle weight="fill" size={20} /> Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(app.id, 'rejected')}
                    className="py-3 flex justify-center items-center gap-2 text-rose-600 font-semibold text-sm hover:bg-rose-50 transition-colors"
                  >
                    <XCircle weight="fill" size={20} /> Reject
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Info</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-5 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-100">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No applications found in the database yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900 group-hover:text-primary transition-colors">{app.full_name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-teal-700">${app.loan_amount.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 mt-1 truncate max-w-[200px]">{app.school_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-[11px] font-bold uppercase rounded-full border ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {app.passport_path ? (
                          <button 
                            onClick={() => downloadDocument(app.passport_path!, `${app.full_name.replace(' ', '_')}_Passport.jpg`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
                          >
                            <IdentificationCard weight="duotone" size={16} /> Passport
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 text-xs text-slate-400 italic">N/A</span>
                        )}
                        {app.transcript_path ? (
                          <button 
                            onClick={() => downloadDocument(app.transcript_path!, `${app.full_name.replace(' ', '_')}_Transcript.pdf`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors border border-slate-200"
                          >
                            <FilePdf weight="duotone" size={16} /> Transcript
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 text-xs text-slate-400 italic">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(app.id, 'approved')}
                          className="p-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200"
                          title="Approve"
                        >
                          <CheckCircle weight="fill" size={20} />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'rejected')}
                          className="p-2 text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
                          title="Reject"
                        >
                          <XCircle weight="fill" size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
