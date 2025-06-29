import { useState, useEffect, useCallback } from 'react';
import { StoreMetrics, GlobalMetrics, DateRange } from '../types';
import { mockStores, generateMockMetrics } from '../utils/mockData';

export const useShopifyData = () => {
  const [stores, setStores] = useState<StoreMetrics[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetrics | null>(null);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchData = useCallback(async (dateRange: DateRange) => {
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const storeMetrics: StoreMetrics[] = mockStores.map(store => ({
        ...store,
        metrics: generateMockMetrics(store.id, dateRange)
      }));

      // Calculate global metrics
      const totalOrders = storeMetrics.reduce((sum, store) => sum + store.metrics.totalOrders, 0);
      const totalRevenue = storeMetrics.reduce((sum, store) => sum + store.metrics.totalRevenue, 0);
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      const global: GlobalMetrics = {
        totalStores: storeMetrics.length,
        totalOrders,
        totalRevenue,
        averageOrderValue,
        dateRange
      };

      setStores(storeMetrics);
      setGlobalMetrics(global);
      setLastUpdated(new Date().toISOString());
    } catch (error) {
      console.error('Error fetching Shopify data:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateStore = useCallback((storeId: string, updates: Partial<StoreMetrics>) => {
    setStores(prev => prev.map(store => 
      store.id === storeId ? { ...store, ...updates } : store
    ));
  }, []);

  return {
    stores,
    globalMetrics,
    loading,
    lastUpdated,
    fetchData,
    updateStore
  };
};