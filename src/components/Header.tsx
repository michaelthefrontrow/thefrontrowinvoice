import React from 'react';
import { RefreshCw, Download, Calendar, Menu } from 'lucide-react';
import { DateRange } from '../types';

interface HeaderProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  onRefresh: () => void;
  onExport: (type: 'csv' | 'pdf') => void;
  loading: boolean;
  lastUpdated: string;
  onMenuToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  dateRange,
  onDateRangeChange,
  onRefresh,
  onExport,
  loading,
  lastUpdated,
  onMenuToggle
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white border-b border-[#f5ebd6] px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-6">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 hover:bg-[#f5ebd6] rounded-lg transition-colors"
            >
              <Menu className="w-5 h-5 text-gray-500" />
            </button>
          )}
          <div>
            <h1 className="text-lg sm:text-2xl font-bold text-black">FrontRow Invoice System</h1>
            {lastUpdated && (
              <span className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                Last updated: {formatDate(lastUpdated)}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop Date Range */}
          <div className="hidden md:flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 border border-[#f5ebd6] rounded-lg text-sm focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 border border-[#f5ebd6] rounded-lg text-sm focus:ring-2 focus:ring-[#fb5353] focus:border-transparent bg-white text-black"
            />
          </div>
          
          {/* Mobile Date Range */}
          <div className="md:hidden flex flex-col space-y-1">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => onDateRangeChange({ ...dateRange, start: e.target.value })}
              className="px-2 py-1 border border-[#f5ebd6] rounded text-xs focus:ring-1 focus:ring-[#fb5353] focus:border-transparent bg-white text-black w-24"
            />
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => onDateRangeChange({ ...dateRange, end: e.target.value })}
              className="px-2 py-1 border border-[#f5ebd6] rounded text-xs focus:ring-1 focus:ring-[#fb5353] focus:border-transparent bg-white text-black w-24"
            />
          </div>
          
          <button
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-[#f5ebd6] hover:bg-[#f5ebd6]/80 disabled:opacity-50 rounded-lg transition-colors text-black"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="text-xs sm:text-sm font-medium hidden sm:inline">Refresh</span>
          </button>
          
          <div className="relative group">
            <button className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 bg-[#fb5353] hover:bg-[#fb5353]/90 text-white rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">Export</span>
            </button>
            
            <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-[#f5ebd6] rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button
                onClick={() => onExport('csv')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#f5ebd6] first:rounded-t-lg text-black"
              >
                Export CSV
              </button>
              <button
                onClick={() => onExport('pdf')}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[#f5ebd6] last:rounded-b-lg text-black"
              >
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};