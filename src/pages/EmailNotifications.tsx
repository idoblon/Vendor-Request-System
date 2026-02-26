import React, { useState, useEffect } from 'react';
import { emailService } from '../services/emailService';
import { EmailNotification, EmailType } from '../types/email';
import { formatDate } from '../utils/orderUtils';

const EmailNotifications: React.FC = () => {
  const [emails, setEmails] = useState<EmailNotification[]>([]);
  const [filteredEmails, setFilteredEmails] = useState<EmailNotification[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<EmailNotification | null>(null);

  useEffect(() => {
    loadEmails();
  }, []);

  useEffect(() => {
    filterEmails();
  }, [emails, selectedType]);

  const loadEmails = async () => {
    try {
      setLoading(true);
      const data = await emailService.getAll();
      setEmails(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) {
      setError('Failed to load email notifications');
    } finally {
      setLoading(false);
    }
  };

  const filterEmails = () => {
    if (selectedType === 'all') {
      setFilteredEmails(emails);
    } else {
      setFilteredEmails(emails.filter(e => e.type === selectedType));
    }
  };

  const handleClearAll = async () => {
    if (!window.confirm('Are you sure you want to clear all email notifications?')) return;

    try {
      await emailService.clearAll();
      await loadEmails();
    } catch (err) {
      setError('Failed to clear notifications');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-500 text-white';
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'failed':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: EmailType) => {
    const labels = {
      order_confirmation: 'Order Confirmation',
      order_status_update: 'Status Update',
      password_reset: 'Password Reset',
      low_stock_alert: 'Low Stock Alert',
      welcome: 'Welcome Email',
    };
    return labels[type];
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="text-white">Loading email notifications...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Email Notifications ({filteredEmails.length})</h1>
        <div className="flex gap-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Types</option>
            <option value="order_confirmation">Order Confirmation</option>
            <option value="order_status_update">Status Update</option>
            <option value="password_reset">Password Reset</option>
            <option value="low_stock_alert">Low Stock Alert</option>
            <option value="welcome">Welcome Email</option>
          </select>
          <button
            onClick={handleClearAll}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          >
            Clear All
          </button>
        </div>
      </div>

      {error && <div className="bg-red-500 text-white px-4 py-2 rounded-lg mb-4">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Total Emails</h3>
          <p className="text-white text-2xl font-bold">{emails.length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Sent</h3>
          <p className="text-white text-2xl font-bold">{emails.filter(e => e.status === 'sent').length}</p>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-gray-400 text-sm font-medium mb-2">Pending</h3>
          <p className="text-white text-2xl font-bold">{emails.filter(e => e.status === 'pending').length}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredEmails.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-400">
                  No email notifications found
                </td>
              </tr>
            ) : (
              filteredEmails.map((email) => (
                <tr key={email.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-700 text-gray-300">
                      {getTypeLabel(email.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-300">{email.to}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-white">{email.subject}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(email.status)}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">{formatDate(email.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => setSelectedEmail(email)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {selectedEmail && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Email Details</h2>
              <button onClick={() => setSelectedEmail(null)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-400">Type</p>
                <p className="text-white">{getTypeLabel(selectedEmail.type)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">To</p>
                <p className="text-white">{selectedEmail.to}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Subject</p>
                <p className="text-white">{selectedEmail.subject}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Status</p>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(selectedEmail.status)}`}>
                  {selectedEmail.status}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-400">Created</p>
                <p className="text-white">{formatDate(selectedEmail.createdAt)}</p>
              </div>
              {selectedEmail.sentAt && (
                <div>
                  <p className="text-sm text-gray-400">Sent</p>
                  <p className="text-white">{formatDate(selectedEmail.sentAt)}</p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-400 mb-2">Body</p>
                <div className="bg-gray-700 p-4 rounded-lg">
                  <pre className="text-white text-sm whitespace-pre-wrap">{selectedEmail.body}</pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailNotifications;
