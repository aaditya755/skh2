import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Flame, RefreshCw } from 'lucide-react';
import { CROP_COMPATIBILITY_DATABASE } from '../utils/segregationRules';

export const BatchSegregationMatrix: React.FC = () => {
  const ethyleneProducers = Object.values(CROP_COMPATIBILITY_DATABASE).filter(
    (c) => c.isEthyleneProducer
  );
  const ethyleneSensitive = Object.values(CROP_COMPATIBILITY_DATABASE).filter(
    (c) => c.isEthyleneSensitive && !c.isEthyleneProducer
  );

  return (
    <div className="bg-white border border-[#EEEEEE] p-5 sm:p-6 rounded-3xl space-y-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
            <ShieldAlert size={22} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-[#2A2A2A]">
              Batch Segregation & Ethylene Compatibility Guidance
            </h3>
            <p className="text-xs text-gray-500">
              Prevent premature decay: Never store Ethylene Gas Producers with Ethylene-Sensitive crops
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Ethylene Producers */}
        <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200 space-y-2">
          <div className="flex items-center gap-2 text-rose-900 font-extrabold text-xs uppercase tracking-wider">
            <Flame size={16} className="text-rose-600" />
            <span>High Ethylene Gas Producers (Releasers)</span>
          </div>
          <p className="text-xs text-rose-950 font-medium leading-relaxed">
            These produce natural ethylene gas (C₂H₄) which triggers rapid ripening in surrounding produce:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {ethyleneProducers.map((c) => (
              <span
                key={c.name}
                className="px-2.5 py-1 bg-white border border-rose-300 text-rose-900 font-bold text-xs rounded-lg shadow-2xs"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>

        {/* Ethylene Sensitive Crops */}
        <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2">
          <div className="flex items-center gap-2 text-amber-900 font-extrabold text-xs uppercase tracking-wider">
            <AlertTriangle size={16} className="text-amber-600" />
            <span>Ethylene-Sensitive Produce (Risk of Rotting)</span>
          </div>
          <p className="text-xs text-amber-950 font-medium leading-relaxed">
            When exposed to ethylene producers, these yellow, soften, develop dark spots, or rot rapidly:
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {ethyleneSensitive.map((c) => (
              <span
                key={c.name}
                className="px-2.5 py-1 bg-white border border-amber-300 text-amber-900 font-bold text-xs rounded-lg shadow-2xs"
              >
                {c.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
