import React from 'react';
import { StorageRequest } from '../../types';
import { Check, X, Phone, Calendar, Scale, Inbox, User, Clock } from 'lucide-react';

interface RequestCardsProps {
  requests: StorageRequest[];
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

export const RequestCards: React.FC<RequestCardsProps> = ({ requests, onAccept, onReject }) => {
  const pendingRequests = requests.filter((r) => r.status === 'pending');

  if (pendingRequests.length === 0) {
    return (
      <div className="bg-white border border-gray-200/80 rounded-3xl p-6 text-center space-y-2">
        <Inbox size={32} className="mx-auto text-gray-400" />
        <h4 className="font-bold text-sm text-[#2A2A2A]">No Pending Booking Requests</h4>
        <p className="text-xs text-gray-500">All incoming farmer storage reservations have been processed.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-base text-[#2A2A2A] flex items-center gap-2">
          <Inbox size={18} className="text-[#364C84]" />
          <span>Incoming Farmer Storage Requests</span>
        </h3>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#95B1EE]/20 text-[#364C84]">
          {pendingRequests.length} Pending
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {pendingRequests.map((req) => (
          <div
            key={req.id}
            className="bg-white border border-gray-200/80 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between hover:border-[#364C84] transition-all"
          >
            <div>
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#364C84] text-white flex items-center justify-center font-bold text-xs">
                    {req.farmerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#2A2A2A]">{req.farmerName}</h4>
                    <span className="text-[11px] text-gray-500 flex items-center gap-1">
                      <Phone size={10} /> {req.farmerPhone}
                    </span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">{req.requestTimestamp}</span>
              </div>

              {/* Booking Request Details */}
              <div className="bg-[#FFFDF5] p-3 rounded-xl border border-gray-100 space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Commodity:</span>
                  <span className="font-bold text-[#2A2A2A]">{req.commodity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Quantity:</span>
                  <span className="font-bold text-[#2A2A2A]">{req.quantityKg} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Duration:</span>
                  <span className="font-bold text-[#2A2A2A]">{req.durationDays} Days (From {req.startDate})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Zone:</span>
                  <span className="font-semibold text-[#364C84]">{req.requestedZone}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-gray-200/60 font-bold">
                  <span className="text-gray-700">Estimated Revenue:</span>
                  <span className="text-[#364C84]">₹{req.estimatedCost.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Accept / Reject Buttons */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => onReject(req.id)}
                className="flex-1 py-2 px-3 border border-[#364C84] text-[#364C84] rounded-xl text-xs font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-1"
              >
                <X size={14} />
                <span>Reject</span>
              </button>
              <button
                onClick={() => onAccept(req.id)}
                className="flex-1 py-2 px-3 bg-[#364C84] text-white rounded-xl text-xs font-bold hover:bg-[#283863] transition-colors flex items-center justify-center gap-1 shadow-2xs"
              >
                <Check size={14} />
                <span>Accept</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
