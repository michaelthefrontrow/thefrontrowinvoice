import { StoreMetrics, GlobalMetrics } from '../types';

export const exportToCSV = (data: StoreMetrics[], filename: string) => {
  const headers = [
    'Store Name',
    'Client Name',
    'Domain',
    'Total Orders',
    'Total Revenue',
    'Average Order Value',
    'Billing Status',
    'Last Invoice Date',
    'Billing Frequency',
    'Notes'
  ];

  const rows = data.map(store => [
    store.name,
    store.clientName || '',
    store.domain,
    store.metrics.totalOrders.toString(),
    `$${store.metrics.totalRevenue.toFixed(2)}`,
    `$${store.metrics.averageOrderValue.toFixed(2)}`,
    store.billingStatus,
    store.lastInvoiceDate || '',
    store.billingFrequency,
    store.notes.replace(/,/g, ';') // Replace commas to avoid CSV issues
  ]);

  const csvContent = [headers, ...rows]
    .map(row => row.map(field => `"${field}"`).join(','))
    .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToPDF = async (data: StoreMetrics[], globalMetrics: GlobalMetrics | null, filename: string) => {
  // For a production app, you'd use a library like jsPDF or html2pdf
  // For now, we'll create a formatted text version
  
  const formatCurrency = (amount: number) => `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  
  let content = `FRONTROW INVOICE SYSTEM REPORT\n`;
  content += `Generated: ${new Date().toLocaleString()}\n`;
  content += `Date Range: ${globalMetrics?.dateRange.start} to ${globalMetrics?.dateRange.end}\n\n`;
  
  if (globalMetrics) {
    content += `GLOBAL SUMMARY\n`;
    content += `Total Stores: ${globalMetrics.totalStores}\n`;
    content += `Total Orders: ${globalMetrics.totalOrders.toLocaleString()}\n`;
    content += `Total Revenue: ${formatCurrency(globalMetrics.totalRevenue)}\n`;
    content += `Average Order Value: ${formatCurrency(globalMetrics.averageOrderValue)}\n\n`;
  }
  
  content += `STORE DETAILS\n`;
  content += `${'='.repeat(50)}\n\n`;
  
  data.forEach(store => {
    content += `${store.name.toUpperCase()}\n`;
    content += `Client: ${store.clientName || 'N/A'}\n`;
    content += `Domain: ${store.domain}\n`;
    content += `Orders: ${store.metrics.totalOrders.toLocaleString()}\n`;
    content += `Revenue: ${formatCurrency(store.metrics.totalRevenue)}\n`;
    content += `AOV: ${formatCurrency(store.metrics.averageOrderValue)}\n`;
    content += `Status: ${store.billingStatus}\n`;
    content += `Billing: ${store.billingFrequency}\n`;
    if (store.notes) {
      content += `Notes: ${store.notes}\n`;
    }
    content += `\n${'-'.repeat(30)}\n\n`;
  });
  
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.txt`);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};