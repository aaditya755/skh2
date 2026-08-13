import React, { useState } from 'react';
import { InventoryItem } from '../../types';
import { Search, Filter, MoreVertical, Database, ArrowUpDown, Clock, Sparkles } from 'lucide-react';
import { ShelfLifeCountdown } from '../ShelfLifeCountdown';

interface InventoryTableProps {
  items: InventoryItem[];
  searchQuery: string;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({ items, searchQuery }) => {
  const [selectedZoneFilter, setSelectedZoneFilter] = useState<string>('all');

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.commodity.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.farmerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.zoneName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesZone =
      selectedZoneFilter === 'all' || item.zoneId === selectedZoneFilter;

    return matchesSearch && matchesZone;
  });

  const getStatusBadge = (status: InventoryItem['status']) => {
    switch (status) {
      case 'Stored':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Expiring Soon':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Temperature Breach':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Ready for Pickup':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white border border-gray-200/80 rounded-3xl shadow-xs overflow-hidden space-y-4">
      {/* Table Header Controls */}
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#364C84] text-white rounded-2xl">
            <Database size={20} />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#2A2A2A]">Cold Chamber Inventory Log</h3>
            <p className="text-xs text-gray-500">Live ledger of batches stored across all temperature chambers</p>
          </div>
        </div>

        {/* Zone Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <select
            value={selectedZoneFilter}
            onChange={(e) => setSelectedZoneFilter(e.target.value)}
            className="px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-[#2A2A2A] focus:outline-none"
          >
            <option value="all">All Zones</option>
            <option value="ZONE-A1">Zone A1 (Fruit CA)</option>
            <option value="ZONE-B2">Zone B2 (Vegetables)</option>
            <option value="ZONE-C3">Zone C3 (Tubers)</option>
            <option value="ZONE-D4">Zone D4 (Pre-Cooling)</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#FFFDF5] border-b border-gray-100 text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
              <th className="px-6 py-3">Produce & Batch</th>
              <th className="px-6 py-3">Grade</th>
              <th className="px-6 py-3">Farmer Owner</th>
              <th className="px-6 py-3">Zone Chamber</th>
              <th className="px-6 py-3">Remaining Freshness</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Fee Accrued</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-xs">
            {filteredItems.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No inventory records matching your query.
                </td>
              </tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-[#2A2A2A] text-sm">{item.commodity}</div>
                    <span className="text-[11px] font-mono text-gray-400">{item.batchId} ({item.quantityKg} kg)</span>
                  </td>

                  <td className="px-6 py-4">
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-extrabold text-[11px]">
                      {item.qualityGrade || 'Grade A'}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-700">{item.farmerName}</td>

                  <td className="px-6 py-4 font-medium text-[#364C84]">
                    <span className="bg-blue-50 px-2 py-1 rounded-md border border-blue-100 font-mono text-[11px]">
                      {item.zoneName}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <ShelfLifeCountdown hoursRemaining={item.hoursRemaining || 36} />
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${getStatusBadge(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-right font-black text-[#364C84]">
                    ₹{item.storageFeeAccrued.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
