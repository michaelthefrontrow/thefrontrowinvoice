import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { StoreMetrics } from '../types';

interface EditStoreModalProps {
  store: StoreMetrics | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (storeId: string, updates: Partial<StoreMetrics>) => void;
}

export const EditStoreModal: React.FC<EditStoreModalProps> = ({
  store,
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState({
    clientName: '',
    billingFrequency: 'Monthly' as const,
    notes: '',
    lastInvoiceDate: ''
  });

  useEffect(() => {
    if (store) {
      setFormData({
        clientName: store.clientName || '',
        billingFrequency: store.billingFrequency,
        notes: store.notes,
        lastInvoiceDate: store.lastInvoiceDate || ''
      });
    }
  }, [store]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (store) {
      onSave(store.id, formData);
      onClose();
    }
  };

  if (!isOpen || !store) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-[#f5ebd6]">
          <h2 className="text-lg sm:text-xl font-semibold text-black">Edit Store Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f5ebd6] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Store Name
            </label>
            <input
              type="text"
              value={store.name}
              disabled
              className="w-full px-3 py-2 border border-[#f5ebd6] rounded-lg bg-[#f5ebd6]/50 text-gray-500 text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Client Name
            </label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full px-3 py-2 border border-[#f5ebd6] rounded-lg focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black text-sm"
              placeholder="Enter client name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Billing Frequency
            </label>
            <select
              value={formData.billingFrequency}
              onChange={(e) => setFormData({ ...formData, billingFrequency: e.target.value as any })}
              className="w-full px-3 py-2 border border-[#f5ebd6] rounded-lg focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black text-sm"
            >
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Annual">Annual</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Last Invoice Date
            </label>
            <input
              type="date"
              value={formData.lastInvoiceDate}
              onChange={(e) => setFormData({ ...formData, lastInvoiceDate: e.target.value })}
              className="w-full px-3 py-2 border border-[#f5ebd6] rounded-lg focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black text-sm"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-[#f5ebd6] rounded-lg focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black text-sm resize-none"
              placeholder="Add billing notes, payment terms, etc."
            />
          </div>
          
          <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-black bg-[#f5ebd6] hover:bg-[#f5ebd6]/80 rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#fb5353] hover:bg-[#fb5353]/90 text-white rounded-lg transition-colors text-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};