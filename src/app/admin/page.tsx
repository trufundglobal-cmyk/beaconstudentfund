'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DownloadSimple, CheckCircle, XCircle, FilePdf, IdentificationCard } from '@phosphor-icons/react';

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

      // Create a temporary link to download the file directly to the admin's machine
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
      alert('Could not download the document. Please ensure the path exists in the storage bucket.');
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">TruFund Admin Portal</h1>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 shadow-sm">
            Total Applications: {applications.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Loan Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Documents</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                    No applications found in the database yet.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    
                    {/* Applicant Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-slate-900">{app.full_name}</div>
                      <div className="text-xs text-slate-500 mt-1">
                        Applied: {new Date(app.created_at).toLocaleDateString()}
                      </div>
                    </td>
                    
                    {/* Loan Info */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-teal-700">${app.loan_amount.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 mt-1">{app.school_name}</div>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-800 border border-red-200' :
                        'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      }`}>
                        {app.status.toUpperCase()}
                      </span>
                    </td>

                    {/* Documents (Download functionality) */}
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {app.passport_path ? (
                          <button 
                            onClick={() => downloadDocument(app.passport_path!, `${app.full_name.replace(' ', '_')}_Passport.jpg`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors border border-slate-200"
                            title="Download Passport"
                          >
                            <IdentificationCard weight="duotone" size={16} /> Passport
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No Passport</span>
                        )}
                        
                        {app.transcript_path ? (
                          <button 
                            onClick={() => downloadDocument(app.transcript_path!, `${app.full_name.replace(' ', '_')}_Transcript.pdf`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded transition-colors border border-slate-200"
                            title="Download Transcript"
                          >
                            <FilePdf weight="duotone" size={16} /> Transcript
                          </button>
                        ) : (
                          <span className="text-xs text-slate-400 italic">No Transcript</span>
                        )}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(app.id, 'approved')}
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-200"
                          title="Approve"
                        >
                          <CheckCircle weight="fill" size={24} />
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'rejected')}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-200"
                          title="Reject"
                        >
                          <XCircle weight="fill" size={24} />
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
