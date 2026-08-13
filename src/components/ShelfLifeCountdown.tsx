import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ShelfLifeCountdownProps {
  hoursRemaining?: number;
  expiresAtTimestamp?: number; // target epoch ms
  showDetailed?: boolean;
}

export const ShelfLifeCountdown: React.FC<ShelfLifeCountdownProps> = ({
  hoursRemaining = 18,
  expiresAtTimestamp,
  showDetailed = false,
}) => {
  // Calculate initial seconds
  const initialSeconds = expiresAtTimestamp
    ? Math.max(0, Math.floor((expiresAtTimestamp - Date.now()) / 1000))
    : Math.floor(hoursRemaining * 3600);

  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  const isCritical = secondsLeft < 12 * 3600; // less than 12 hours
  const isWarning = secondsLeft < 36 * 3600; // less than 36 hours

  const formatUnit = (num: number) => String(num).padStart(2, '0');

  if (showDetailed) {
    return (
      <div
        className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs ${
          isCritical
            ? 'bg-rose-50 border-rose-200 text-rose-950'
            : isWarning
            ? 'bg-amber-50 border-amber-200 text-amber-950'
            : 'bg-emerald-50 border-emerald-200 text-emerald-950'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`p-2.5 rounded-xl text-white ${
              isCritical ? 'bg-rose-600 animate-pulse' : isWarning ? 'bg-amber-500' : 'bg-emerald-600'
            }`}
          >
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
              Optimal Freshness Countdown
            </span>
            <span className="text-xs font-semibold">
              {isCritical
                ? 'Critical: Book cold chamber immediately!'
                : isWarning
                ? 'Action Required: Transport or cold store within 24h'
                : 'Optimal Condition: Extended shelf life'}
            </span>
          </div>
        </div>

        {/* Live Ticker Clock Display */}
        <div className="flex items-center gap-1.5 font-mono font-black text-base sm:text-lg bg-white/80 px-3 py-1.5 rounded-xl border border-black/5 shadow-2xs">
          <span className="text-gray-800">{formatUnit(hours)}h</span>
          <span className="text-gray-400">:</span>
          <span className="text-gray-800">{formatUnit(minutes)}m</span>
          <span className="text-gray-400">:</span>
          <span className="text-rose-600 animate-pulse">{formatUnit(seconds)}s</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono font-bold border ${
        isCritical
          ? 'bg-rose-100 text-rose-800 border-rose-300 animate-pulse'
          : isWarning
          ? 'bg-amber-100 text-amber-800 border-amber-300'
          : 'bg-emerald-100 text-emerald-800 border-emerald-300'
      }`}
    >
      <Clock size={12} />
      <span>
        {formatUnit(hours)}h {formatUnit(minutes)}m {formatUnit(seconds)}s
      </span>
    </div>
  );
};
