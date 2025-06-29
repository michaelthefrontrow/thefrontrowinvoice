import React from 'react';
import { ShoppingBag, DollarSign, TrendingUp, Store } from 'lucide-react';
import { GlobalMetrics } from '../types';

interface KPICardsProps {
  metrics: GlobalMetrics | null;
  loading: boolean;
}

export const KPICards: React.FC<KPICardsProps> = ({ metrics, loading }) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const cards = [
    {
      title: 'Total Stores',
      value: metrics?.totalStores || 0,
      icon: Store,
      color: 'bg-[#fb5353]',
      formatter: formatNumber
    },
    {
      title: 'Total Orders',
      value: metrics?.totalOrders || 0,
      icon: ShoppingBag,
      color: 'bg-[#fb5353]',
      formatter: formatNumber
    },
    {
      title: 'Total Revenue',
      value: metrics?.totalRevenue || 0,
      icon: DollarSign,
      color: 'bg-[#fb5353]',
      formatter: formatCurrency
    },
    {
      title: 'Average Order Value',
      value: metrics?.averageOrderValue || 0,
      icon: TrendingUp,
      color: 'bg-[#fb5353]',
      formatter: formatCurrency
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
      {cards.map((card, index) => {
        const Icon = card.icon;
        
        return (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-[#f5ebd6] p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1 truncate">{card.title}</p>
                <p className="text-lg sm:text-2xl font-bold text-black">
                  {loading ? (
                    <div className="w-12 sm:w-16 h-6 sm:h-8 bg-[#f5ebd6] animate-pulse rounded"></div>
                  ) : (
                    <span className="break-all">{card.formatter(card.value)}</span>
                  )}
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg ${card.color} flex-shrink-0`}>
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};