export interface ShopifyStore {
  id: string;
  name: string;
  domain: string;
  clientName?: string;
  notes: string;
  lastInvoiceDate?: string;
  billingFrequency: 'Monthly' | 'Quarterly' | 'Annual';
}

export interface OrderMetrics {
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface StoreMetrics extends ShopifyStore {
  metrics: OrderMetrics;
}

export interface GlobalMetrics {
  totalStores: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface DateRange {
  start: string;
  end: string;
}