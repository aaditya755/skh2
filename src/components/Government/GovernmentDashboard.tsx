import React, { useState } from 'react';
import {
  Landmark,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Building2,
  Download,
  Search,
  ExternalLink,
  Award,
  CheckCircle2,
  Layers,
  Sparkles,
  BarChart3,
  Calendar,
  Truck,
  DollarSign,
  ArrowUpRight,
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import { DistrictMetric, GovernmentFacilityAudit, SystemAlert, Role, Language } from '../../types';

interface GovernmentDashboardProps {
  districtMetrics: DistrictMetric[];
  facilityAudits: GovernmentFacilityAudit[];
  alerts: SystemAlert[];
  onOpenAuditDetails?: (auditId: string) => void;
  onIssueAdvisory?: () => void;
}

export const GovernmentDashboard: React.FC<GovernmentDashboardProps> = ({
  districtMetrics,
  facilityAudits,
  alerts,
  onOpenAuditDetails,
  onIssueAdvisory,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const totalCapMT = districtMetrics.reduce((acc, d) => acc + d.totalCapacityMT, 0);
  const totalOccupiedMT = districtMetrics.reduce((acc, d) => acc + d.occupiedMT, 0);
  const overallOccupancyPct = Math.round((totalOccupiedMT / (totalCapMT || 1)) * 100);
  const totalLossPreventedCr = (
    districtMetrics.reduce((acc, d) => acc + d.lossPreventedValueLakhs, 0) / 100
  ).toFixed(2);

  const chartData = districtMetrics.map((d) => ({
    name: d.district.replace(' District', '').replace(' (Junnar & Khed)', ''),
    capacity: d.totalCapacityMT,
    occupied: d.occupiedMT,
    occupancyPct: d.occupancyPct,
  }));

  const filteredAudits = facilityAudits.filter((audit) => {
    const matchesSearch =
      !searchQuery ||
      audit.facilityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.licenseNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      audit.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || audit.district.toLowerCase().includes(selectedDistrict.toLowerCase());
    const matchesStatus = statusFilter === 'all' || audit.status === statusFilter;
    return matchesSearch && matchesDistrict && matchesStatus;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-300">
      {/* Top Header Card in #3A2E1F and #EFD17F */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase tracking-wider bg-[#EFD17F] text-[#3A2E1F]">
              Maharashtra Agri-Marketing Board
            </span>
            <span className="text-xs text-gray-500 font-semibold">Post-Harvest & Cold-Chain Governance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#2A2A2A] tracking-tight">
            Hey Dr. Anand,
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 font-medium mt-1">
            District Cold Infrastructure Capacity, Food Loss Reduction KPI, and Regulatory Compliance Dashboard.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const csvContent = "data:text/csv;charset=utf-8," 
                + ["Facility,District,License,Capacity(T),Compliance%,Status", 
                   ...facilityAudits.map(f => `"${f.facilityName}","${f.district}","${f.licenseNumber}",${f.totalCapacityTons},${f.complianceScorePct}%,"${f.status}"`)
                  ].join("\n");
              const encodedUri = encodeURI(csvContent);
              const link = document.createElement("a");
              link.setAttribute("href", encodedUri);
              link.setAttribute("download", "district_cold_chain_audit_report.csv");
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}
            className="px-4 py-2.5 rounded-2xl bg-white border border-[#EADDC0] hover:bg-[#FFFDF5] text-[#3A2E1F] font-bold text-xs flex items-center gap-2 shadow-2xs transition-all"
          >
            <Download size={15} className="text-[#3A2E1F]" />
            <span>Export District Audit CSV</span>
          </button>

          <button
            onClick={onIssueAdvisory}
            className="px-5 py-2.5 rounded-2xl bg-[#3A2E1F] hover:bg-[#2A2116] text-[#EFD17F] font-extrabold text-xs flex items-center gap-2 shadow-md transition-all group"
          >
            <Sparkles size={15} className="group-hover:rotate-12 transition-transform text-[#EFD17F]" />
            <span>Broadcast Cold Advisory</span>
          </button>
        </div>
      </div>

      {/* Top Level Metric KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Regional Cold Capacity</span>
            <Building2 size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">
            {(totalCapMT / 1000).toFixed(1)}k MT
          </div>
          <div className="flex items-center justify-between text-[11px] text-gray-500 font-medium mt-1">
            <span>Occupancy: {overallOccupancyPct}%</span>
            <span className="font-bold text-[#3A2E1F]">{(totalOccupiedMT / 1000).toFixed(1)}k MT Active</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Food Loss Prevented</span>
            <ShieldCheck size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#3A2E1F]">
            ₹{totalLossPreventedCr} Cr
          </div>
          <span className="text-[11px] text-emerald-800 font-bold mt-1">
            ↑ 94.2% average harvest saved
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">Registered Facilities</span>
            <Landmark size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#2A2A2A]">
            {districtMetrics.reduce((acc, d) => acc + d.facilitiesCount, 0)} Units
          </div>
          <span className="text-[11px] text-gray-500 font-medium mt-1">Across 4 Perishable Corridors</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#EADDC0] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider">PMKSY Subsidy Pool</span>
            <Award size={16} className="text-[#3A2E1F]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#3A2E1F]">₹4.20 Cr</div>
          <span className="text-[11px] text-emerald-800 font-bold mt-1">Tranche II 86% Disbursed</span>
        </div>
      </div>

      {/* District Utilization Bar Chart & District Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* District Chart Card */}
        <div className="lg:col-span-2 bg-white p-6 sm:p-7 rounded-3xl border border-[#EADDC0] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#2A2A2A] flex items-center gap-2">
                <BarChart3 size={20} className="text-[#3A2E1F]" />
                <span>District Cold Capacity & Utilization Breakdown</span>
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Metric tonnes capacity vs. occupied storage space per agricultural hub.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 bg-[#EFD17F]/40 text-[#3A2E1F] rounded-full">
              Live IoT Aggregation
            </span>
          </div>

          <div className="h-64 w-full pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [`${value.toLocaleString()} MT`, '']}
                  contentStyle={{
                    backgroundColor: '#3A2E1F',
                    borderRadius: '1rem',
                    border: 'none',
                    color: '#EFD17F',
                    fontSize: '12px',
                    fontWeight: 'bold',
                  }}
                />
                <Bar dataKey="capacity" name="Total Capacity (MT)" fill="#EADDC0" radius={[8, 8, 0, 0]} />
                <Bar dataKey="occupied" name="Occupied (MT)" fill="#EFD17F" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-6 text-xs font-bold text-gray-600 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EADDC0]" />
              <span>Total Available Capacity (MT)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#EFD17F]" />
              <span>Currently Stored Produce (MT)</span>
            </div>
          </div>
        </div>

        {/* District Fast Metrics */}
        <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#EADDC0] shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-[#2A2A2A] flex items-center gap-2">
              <ShieldCheck size={18} className="text-[#3A2E1F]" />
              <span>Corridor Efficiency Ratings</span>
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">Post-harvest loss mitigation per cluster.</p>
          </div>

          <div className="space-y-3.5 my-auto">
            {districtMetrics.map((dm) => (
              <div key={dm.district} className="space-y-1.5 p-3 rounded-2xl bg-[#FFFDF5] border border-[#EADDC0]/60">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-[#2A2A2A]">{dm.district}</span>
                  <span className="text-[#3A2E1F]">{dm.spoilagePreventedPct}% Saved</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#EFD17F] rounded-full"
                    style={{ width: `${dm.spoilagePreventedPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-gray-500 font-medium">
                  <span>{dm.facilitiesCount} Hubs</span>
                  <span>₹{(dm.lossPreventedValueLakhs / 100).toFixed(2)} Cr Saved</span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold text-[#3A2E1F]">
              <span>Annual Food Security Target:</span>
              <span className="px-2 py-0.5 rounded-md bg-[#EFD17F] text-[#3A2E1F]">95.0% Saved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Inspection & Compliance Audit Section */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-[#EADDC0] shadow-xs space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-[#2A2A2A] flex items-center gap-2">
              <FileCheck size={22} className="text-[#3A2E1F]" />
              <span>Cold Storage Facility Audits & FSSAI Compliance</span>
            </h2>
            <p className="text-xs text-gray-500 font-medium mt-0.5">
              Official inspection logs, IoT telemetry uptime audits, and cold storage subsidy eligibility status.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px]">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search facility, license #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FFFDF5] rounded-full border border-[#EADDC0] text-xs font-medium text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#EFD17F]"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-[#FFFDF5] rounded-full border border-[#EADDC0] text-xs font-bold text-[#3A2E1F] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="Compliant">Compliant</option>
              <option value="Inspection Required">Inspection Required</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
        </div>

        {/* Audit Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#EADDC0] text-gray-400 font-bold uppercase tracking-wider text-[10px] bg-[#FFFDF5]">
                <th className="py-3.5 px-4 rounded-l-2xl">Facility & District</th>
                <th className="py-3.5 px-4">License & FSSAI</th>
                <th className="py-3.5 px-4">Capacity (Tons)</th>
                <th className="py-3.5 px-4">Audit Score</th>
                <th className="py-3.5 px-4">Subsidy Status</th>
                <th className="py-3.5 px-4">Compliance Status</th>
                <th className="py-3.5 px-4 text-right rounded-r-2xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {filteredAudits.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-400 font-medium">
                    No facility audit records match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredAudits.map((audit) => (
                  <tr key={audit.id} className="hover:bg-[#FFFDF5] transition-colors">
                    <td className="py-4 px-4">
                      <div className="font-extrabold text-sm text-[#2A2A2A]">{audit.facilityName}</div>
                      <div className="text-[11px] text-gray-500 font-semibold">{audit.district} District</div>
                    </td>

                    <td className="py-4 px-4 font-mono text-[11px] text-gray-600">
                      <div>{audit.licenseNumber}</div>
                      <div className="text-gray-400">FSSAI: {audit.fssaiNumber}</div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="font-bold text-[#2A2A2A]">
                        {audit.utilizedCapacityTons.toLocaleString()} / {audit.totalCapacityTons.toLocaleString()} T
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {Math.round((audit.utilizedCapacityTons / audit.totalCapacityTons) * 100)}% Utilized
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1.5 font-extrabold text-[#3A2E1F]">
                        <span className="w-2 h-2 rounded-full bg-[#EFD17F]" />
                        <span>{audit.complianceScorePct}%</span>
                      </div>
                      <div className="text-[10px] text-gray-400">Last: {audit.lastInspectionDate}</div>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                          audit.subsidyStatus === 'Disbursed'
                            ? 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                            : audit.subsidyStatus === 'Under Review'
                            ? 'bg-[#EFD17F]/40 text-[#3A2E1F] border border-[#EFD17F]'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {audit.subsidyStatus}
                      </span>
                    </td>

                    <td className="py-4 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold ${
                          audit.status === 'Compliant'
                            ? 'bg-emerald-100 text-emerald-900'
                            : audit.status === 'Inspection Required'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {audit.status === 'Compliant' && <CheckCircle2 size={12} className="text-emerald-700" />}
                        {audit.status === 'Inspection Required' && <AlertTriangle size={12} className="text-amber-700" />}
                        {audit.status === 'Warning' && <AlertTriangle size={12} className="text-rose-700" />}
                        <span>{audit.status}</span>
                      </span>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <button
                        onClick={() => onOpenAuditDetails?.(audit.id)}
                        className="px-3 py-1.5 rounded-xl bg-[#3A2E1F] text-[#EFD17F] hover:bg-[#2A2116] font-bold text-xs shadow-2xs transition-all"
                      >
                        Audit Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
