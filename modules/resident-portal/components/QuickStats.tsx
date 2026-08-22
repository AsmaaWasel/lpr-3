"use client";

import { HiOutlineUserGroup } from "react-icons/hi";

type Props = {
  gatesCount: number;
  entriesCount: number;
  platesCount: number;
};

export default function QuickStats({
  gatesCount,
  entriesCount,
  platesCount,
}: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5">
      <h3 className="text-white font-bold text-2xl mb-4 flex items-center gap-2">
        <HiOutlineUserGroup className="w-4 h-4" />
        Quick Stats
      </h3>

      <div className="space-y-3">
        <Stat label="Total Gates" value={gatesCount} />

        <Stat label="Total Entries" value={entriesCount} />

        <Stat label="Total Plates" value={platesCount} />
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white/5 rounded-xl p-4">
      <div className="text-slate-400 text-xs uppercase">{label}</div>

      <div className="text-white text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}
