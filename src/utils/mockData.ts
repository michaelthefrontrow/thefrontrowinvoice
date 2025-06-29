import { ShopifyStore, StoreMetrics } from '../types';

export const mockStores: ShopifyStore[] = [
  {
    id: 'store-1',
    name: 'Bella Vista Boutique',
    domain: 'bellavista.myshopify.com',
    clientName: 'Sarah Johnson',
    notes: 'Last invoice sent 2024-12-15. Monthly billing cycle.',
    lastInvoiceDate: '2024-12-15',
    billingFrequency: 'Monthly'
  },
  {
    id: 'store-2',
    name: 'Urban Edge Fashion',
    domain: 'urbanedge.myshopify.com',
    clientName: 'Marcus Chen',
    notes: 'Invoice #INV-2024-003 sent. Awaiting payment.',
    lastInvoiceDate: '2024-12-10',
    billingFrequency: 'Monthly'
  },
  {
    id: 'store-3',
    name: 'Coastal Collections',
    domain: 'coastal.myshopify.com',
    clientName: 'Emma Rodriguez',
    notes: 'New client. First invoice due end of month.',
    billingFrequency: 'Monthly'
  },
  {
    id: 'store-4',
    name: 'Metro Style Co',
    domain: 'metrostyle.myshopify.com',
    clientName: 'David Kim',
    notes: 'Quarterly billing. Next invoice due March 2025.',
    lastInvoiceDate: '2024-12-01',
    billingFrequency: 'Quarterly'
  },
  {
    id: 'store-5',
    name: 'Artisan Crafts',
    domain: 'artisancrafts.myshopify.com',
    clientName: 'Lisa Thompson',
    notes: 'Invoice sent 2024-12-18. Payment terms: NET 30.',
    lastInvoiceDate: '2024-12-18',
    billingFrequency: 'Monthly'
  }
];

export const generateMockMetrics = (storeId: string, dateRange: { start: string; end: string }) => {
  // Generate realistic but randomized metrics based on store
  const baseMetrics = {
    'store-1': { orders: 145, revenue: 24580 },
    'store-2': { orders: 203, revenue: 38420 },
    'store-3': { orders: 89, revenue: 15690 },
    'store-4': { orders: 167, revenue: 31240 },
    'store-5': { orders: 72, revenue: 12890 }
  };

  const base = baseMetrics[storeId as keyof typeof baseMetrics] || { orders: 100, revenue: 20000 };
  
  // Add some randomization based on date range
  const daysDiff = Math.abs(new Date(dateRange.end).getTime() - new Date(dateRange.start).getTime()) / (1000 * 60 * 60 * 24);
  const factor = Math.max(0.5, daysDiff / 30); // Scale based on date range
  
  const totalOrders = Math.floor(base.orders * factor * (0.8 + Math.random() * 0.4));
  const totalRevenue = Math.floor(base.revenue * factor * (0.8 + Math.random() * 0.4));
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return {
    totalOrders,
    totalRevenue,
    averageOrderValue,
    dateRange
  };
};