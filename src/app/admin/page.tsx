'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { DownloadSimple, CheckCircle, XCircle, FilePdf, IdentificationCard, Clock } from '@phosphor-icons/react';

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
      <div className="min-h-screen flex items-center justify-center bg-[var(--color-gray-100)] pt-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getStatusBadgeStyle = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'approved') return { backgroundColor: 'var(--color-light-teal)', color: 'var(--color-success)', borderColor: 'var(--color-success)' };
    if (s === 'rejected') return { backgroundColor: 'var(--color-light-coral)', color: 'var(--color-error)', borderColor: 'var(--color-error)' };
    return { backgroundColor: '#fffae6', color: 'var(--color-warning)', borderColor: 'var(--color-warning)' };
  };

  return (
    <div className="min-h-screen bg-[var(--color-gray-100)] px-4 py-8 sm:px-6 lg:px-8 mt-16">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-lg shadow-sm border border-[var(--color-gray-200)]">
          <div>
            <h1 className="text-2xl font-bold text-[var(--color-gray-900)] font-sans uppercase tracking-wider">TRUFUND ADMIN</h1>
            <p className="text-[var(--color-gray-600)] text-sm mt-1">Application Review Queue</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[var(--color-gray-100)] px-4 py-2 rounded-md text-sm font-semibold text-[var(--color-gray-600)] flex items-center gap-2 border border-[var(--color-gray-200)]">
              <Clock size={18} />
              Pending Review ({applications.length})
            </div>
          </div>
        </div>

        {/* Mobile View: Cards */}
        <div className="grid grid-cols-1 gap-4 lg:hidden">
          {applications.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border border-[var(--color-gray-200)] text-[var(--color-gray-600)]">
              Queue is empty.
            </div>
          ) : (
            applications.map((app) => (
              <div key={app.id} className="bg-white rounded-lg shadow-sm border border-[var(--color-gray-200)] overflow-hidden">
                <div className="p-5 border-b border-[var(--color-gray-100)]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-[var(--color-gray-900)] text-lg">{app.full_name}</h3>
                      <p className="text-xs text-[var(--color-gray-600)]">App #: {app.id.substring(0,8).toUpperCase()}</p>
                    </div>
                    <span 
                      className="inline-flex px-2.5 py-1 text-[10px] uppercase font-bold rounded border"
                      style={getStatusBadgeStyle(app.status)}
                    >
                      {app.status}
                    </span>
                  </div>
                  
                  <div className="bg-[var(--color-gray-100)] rounded p-3 mb-4 border border-[var(--color-gray-200)]">
                    <div className="flex flex-col">
                      <span className="text-xs text-[var(--color-gray-600)] mb-1">Institution</span>
                      <span className="text-sm font-medium text-[var(--color-gray-900)] truncate">{app.school_name}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {app.passport_path ? (
                      <button 
                        onClick={() => downloadDocument(app.passport_path!, `${app.full_name.replace(' ', '_')}_ID.jpg`)}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] text-[var(--color-gray-900)] text-xs font-medium rounded transition-colors border border-[var(--color-gray-200)]"
                      >
                        <IdentificationCard size={16} /> View ID
                      </button>
                    ) : (
                      <span className="flex-1 flex justify-center items-center px-3 py-2 bg-[var(--color-gray-100)] text-[var(--color-gray-400)] text-xs rounded border border-[var(--color-gray-200)]">No ID</span>
                    )}
                    
                    {app.transcript_path ? (
                      <button 
                        onClick={() => downloadDocument(app.transcript_path!, `${app.full_name.replace(' ', '_')}_Transcript.pdf`)}
                        className="flex-1 flex justify-center items-center gap-1.5 px-3 py-2 bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-200)] text-[var(--color-gray-900)] text-xs font-medium rounded transition-colors border border-[var(--color-gray-200)]"
                      >
                        <FilePdf size={16} /> Transcript
                      </button>
                    ) : (
                      <span className="flex-1 flex justify-center items-center px-3 py-2 bg-[var(--color-gray-100)] text-[var(--color-gray-400)] text-xs rounded border border-[var(--color-gray-200)]">No Transcript</span>
                    )}
                  </div>
                </div>
                
                {/* Actions Grid */}
                <div className="grid grid-cols-2 divide-x divide-[var(--color-gray-200)] bg-[var(--color-gray-100)] border-t border-[var(--color-gray-200)]">
                  <button 
                    onClick={() => updateStatus(app.id, 'approved')}
                    className="py-3 flex justify-center items-center gap-2 text-[var(--color-success)] font-semibold text-sm hover:bg-white transition-colors"
                  >
                    <CheckCircle weight="bold" size={18} /> Approve
                  </button>
                  <button 
                    onClick={() => updateStatus(app.id, 'rejected')}
                    className="py-3 flex justify-center items-center gap-2 text-[var(--color-error)] font-semibold text-sm hover:bg-white transition-colors"
                  >
                    <XCircle weight="bold" size={18} /> Decline
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Table */}
        <div className="hidden lg:block bg-white rounded-lg shadow-sm border border-[var(--color-gray-200)] overflow-hidden">
          <table className="min-w-full divide-y divide-[var(--color-gray-200)]">
            <thead className="bg-[var(--color-gray-100)]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-[var(--color-gray-600)] uppercase tracking-wider">App # & Name</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[var(--color-gray-600)] uppercase tracking-wider">Institution</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[var(--color-gray-600)] uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-[var(--color-gray-600)] uppercase tracking-wider">Documents</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[var(--color-gray-600)] uppercase tracking-wider">Decision</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-[var(--color-gray-200)]">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-[var(--color-gray-600)] border-b border-[var(--color-gray-200)]">
                    Queue is empty.
                  </td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-[var(--color-gray-100)] transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-[var(--color-gray-900)]">{app.full_name}</div>
                      <div className="text-xs text-[var(--color-gray-600)] mt-1 font-mono">
                        APP-{app.id.substring(0,5).toUpperCase()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-[var(--color-gray-900)] truncate max-w-[250px]">{app.school_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span 
                        className="inline-flex px-3 py-1 text-[11px] font-bold uppercase rounded border"
                        style={getStatusBadgeStyle(app.status)}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        {app.passport_path ? (
                          <button 
                            onClick={() => downloadDocument(app.passport_path!, `${app.full_name.replace(' ', '_')}_ID.jpg`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[var(--color-gray-100)] text-[var(--color-gray-900)] text-xs font-semibold rounded transition-colors border border-[var(--color-gray-200)] shadow-sm"
                          >
                            <IdentificationCard weight="bold" size={16} /> ID
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 text-xs text-[var(--color-gray-400)] italic">N/A</span>
                        )}
                        {app.transcript_path ? (
                          <button 
                            onClick={() => downloadDocument(app.transcript_path!, `${app.full_name.replace(' ', '_')}_Transcript.pdf`)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-white hover:bg-[var(--color-gray-100)] text-[var(--color-gray-900)] text-xs font-semibold rounded transition-colors border border-[var(--color-gray-200)] shadow-sm"
                          >
                            <FilePdf weight="bold" size={16} /> Transcript
                          </button>
                        ) : (
                          <span className="px-3 py-1.5 text-xs text-[var(--color-gray-400)] italic">N/A</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateStatus(app.id, 'approved')}
                          className="px-3 py-1.5 text-white bg-[var(--color-success)] hover:bg-green-600 rounded font-semibold text-xs transition-colors shadow-sm"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => updateStatus(app.id, 'rejected')}
                          className="px-3 py-1.5 text-[var(--color-error)] bg-white border border-[var(--color-error)] hover:bg-red-50 rounded font-semibold text-xs transition-colors shadow-sm"
                        >
                          Decline
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
