import React from 'react';
import { Edit3, Calendar, FileText } from 'lucide-react';
import { StoreMetrics } from '../types';

interface StoreCardProps {
  store: StoreMetrics;
  onEdit: (store: StoreMetrics) => void;
}

export const StoreCard: React.FC<StoreCardProps> = ({ store, onEdit }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-[#f5ebd6] p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-black mb-1 truncate">{store.name}</h3>
          <p className="text-gray-600 text-xs sm:text-sm truncate">{store.domain}</p>
          {store.clientName && (
            <p className="text-xs sm:text-sm text-black mt-1">
              <span className="font-medium">Client:</span> {store.clientName}
            </p>
          )}
        </div>
        
        <button
          onClick={() => onEdit(store)}
          className="p-2 hover:bg-[#f5ebd6] rounded-lg transition-colors flex-shrink-0"
          title="Edit store details"
        >
          <Edit3 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4">
        <div className="text-center">
          <p className="text-lg sm:text-2xl font-bold text-black">{store.metrics.totalOrders.toLocaleString()}</p>
          <p className="text-xs sm:text-sm text-gray-600">Orders</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-2xl font-bold text-black">{formatCurrency(store.metrics.totalRevenue)}</p>
          <p className="text-xs sm:text-sm text-gray-600">Revenue</p>
        </div>
        <div className="text-center">
          <p className="text-lg sm:text-2xl font-bold text-black">{formatCurrency(store.metrics.averageOrderValue)}</p>
          <p className="text-xs sm:text-sm text-gray-600">AOV</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center text-xs sm:text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">Billing:</span>
          <span className="ml-1">{store.billingFrequency}</span>
          {store.lastInvoiceDate && (
            <span className="ml-2 text-gray-500 hidden sm:inline">
              (Last: {new Date(store.lastInvoiceDate).toLocaleDateString()})
            </span>
          )}
        </div>
        
        {store.notes && (
          <div className="flex items-start text-xs sm:text-sm text-gray-600">
            <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 break-words">{store.notes}</span>
          </div>
        )}
      </div>
    </div>
  );
};