import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Store, X } from 'lucide-react';
import { StoreMetrics } from '../types';

interface SidebarProps {
  stores: StoreMetrics[];
  selectedStore: string | null;
  onStoreSelect: (storeId: string | null) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  stores, 
  selectedStore, 
  onStoreSelect,
  isOpen = true,
  onClose
}) => {
  const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set());

  const toggleStoreExpansion = (storeId: string) => {
    const newExpanded = new Set(expandedStores);
    if (newExpanded.has(storeId)) {
      newExpanded.delete(storeId);
    } else {
      newExpanded.add(storeId);
    }
    setExpandedStores(newExpanded);
  };

  const handleStoreSelect = (storeId: string | null) => {
    onStoreSelect(storeId);
    if (onClose) onClose(); // Close mobile sidebar after selection
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && onClose && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static fixed left-0 top-0 z-50
        w-80 sm:w-96 lg:w-80 bg-white border-r border-[#f5ebd6] h-full overflow-y-auto
        transition-transform duration-300 ease-in-out
      `}>
        <div className="p-4 border-b border-[#f5ebd6] flex items-center justify-between">
          <h2 className="text-lg font-semibold text-black flex items-center">
            <Store className="w-5 h-5 mr-2" />
            Shopify Stores ({stores.length})
          </h2>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-[#f5ebd6] rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
        
        <div className="p-2">
          <button
            onClick={() => handleStoreSelect(null)}
            className={`w-full p-3 mb-2 text-left rounded-lg transition-colors ${
              selectedStore === null 
                ? 'bg-[#f5ebd6] border border-[#fb5353] text-black' 
                : 'hover:bg-[#f5ebd6]/50 border border-transparent text-black'
            }`}
          >
            <div className="font-medium">All Stores Overview</div>
            <div className="text-sm text-gray-600">Global summary view</div>
          </button>
          
          {stores.map((store) => {
            const isExpanded = expandedStores.has(store.id);
            const isSelected = selectedStore === store.id;
            
            return (
              <div key={store.id} className="mb-2">
                <div
                  className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-[#f5ebd6] border border-[#fb5353]' 
                      : 'hover:bg-[#f5ebd6]/50 border border-transparent'
                  }`}
                  onClick={() => handleStoreSelect(store.id)}
                >
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-black truncate">{store.name}</div>
                    <div className="text-sm text-gray-600 truncate">{store.clientName || 'No client assigned'}</div>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleStoreExpansion(store.id);
                    }}
                    className="p-1 hover:bg-[#f5ebd6] rounded"
                  >
                    {isExpanded ? (
                      <ChevronDown className="w-4 h-4 text-gray-500" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>
                
                {isExpanded && (
                  <div className="ml-4 mt-2 p-3 bg-[#f5ebd6]/50 rounded-lg text-sm">
                    <div className="space-y-2 text-black">
                      <div>
                        <span className="font-medium">Orders:</span> {store.metrics.totalOrders.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Revenue:</span> ${store.metrics.totalRevenue.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">AOV:</span> ${store.metrics.averageOrderValue.toFixed(2)}
                      </div>
                      <div className="break-all">
                        <span className="font-medium">Domain:</span> {store.domain}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};