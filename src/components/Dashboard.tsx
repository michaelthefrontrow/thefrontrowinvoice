import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { KPICards } from './KPICards';
import { StoreCard } from './StoreCard';
import { EditStoreModal } from './EditStoreModal';
import { useShopifyData } from '../hooks/useShopifyData';
import { exportToCSV, exportToPDF } from '../utils/export';
import { DateRange, StoreMetrics } from '../types';

export const Dashboard: React.FC = () => {
  const { stores, globalMetrics, loading, lastUpdated, fetchData, updateStore } = useShopifyData();
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [editingStore, setEditingStore] = useState<StoreMetrics | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>(() => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - 30);
    
    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    };
  });

  useEffect(() => {
    fetchData(dateRange);
  }, [fetchData, dateRange]);

  const handleRefresh = () => {
    fetchData(dateRange);
  };

  const handleExport = (type: 'csv' | 'pdf') => {
    const filename = `frontrow-invoice-${new Date().toISOString().split('T')[0]}`;
    const exportData = selectedStore 
      ? stores.filter(store => store.id === selectedStore)
      : stores;

    if (type === 'csv') {
      exportToCSV(exportData, filename);
    } else {
      exportToPDF(exportData, globalMetrics, filename);
    }
  };

  const handleStoreEdit = (store: StoreMetrics) => {
    setEditingStore(store);
  };

  const handleStoreSave = (storeId: string, updates: Partial<StoreMetrics>) => {
    updateStore(storeId, updates);
  };

  const selectedStoreData = selectedStore ? stores.find(s => s.id === selectedStore) : null;
  const displayStores = selectedStore ? (selectedStoreData ? [selectedStoreData] : []) : stores;

  return (
    <div className="min-h-screen bg-[#f5ebd6]">
      <Header
        dateRange={dateRange}
        onDateRangeChange={setDateRange}
        onRefresh={handleRefresh}
        onExport={handleExport}
        loading={loading}
        lastUpdated={lastUpdated}
        onMenuToggle={() => setSidebarOpen(true)}
      />
      
      <div className="flex h-[calc(100vh-80px)]">
        <Sidebar
          stores={stores}
          selectedStore={selectedStore}
          onStoreSelect={setSelectedStore}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {selectedStore === null ? (
            <>
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">Global Overview</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Summary across all {stores.length} connected Shopify stores
                </p>
              </div>
              <KPICards metrics={globalMetrics} loading={loading} />
            </>
          ) : (
            selectedStoreData && (
              <div className="mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-black mb-2">{selectedStoreData.name}</h2>
                <p className="text-sm sm:text-base text-gray-600">
                  Individual store metrics and billing details
                </p>
              </div>
            )
          )}
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border border-[#f5ebd6] p-4 sm:p-6">
                  <div className="animate-pulse">
                    <div className="h-4 bg-[#f5ebd6] rounded w-3/4 mb-4"></div>
                    <div className="h-8 bg-[#f5ebd6] rounded w-1/2 mb-4"></div>
                    <div className="space-y-2">
                      <div className="h-3 bg-[#f5ebd6] rounded"></div>
                      <div className="h-3 bg-[#f5ebd6] rounded w-2/3"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {displayStores.map((store) => (
                <StoreCard
                  key={store.id}
                  store={store}
                  onEdit={handleStoreEdit}
                />
              ))}
            </div>
          )}
          
          {!loading && displayStores.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No stores found for the selected criteria.</p>
            </div>
          )}
        </div>
      </div>
      
      <EditStoreModal
        store={editingStore}
        isOpen={!!editingStore}
        onClose={() => setEditingStore(null)}
        onSave={handleStoreSave}
      />
    </div>
  );
};