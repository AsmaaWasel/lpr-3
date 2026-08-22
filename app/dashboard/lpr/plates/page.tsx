"use client";

import PlateCRUD from "@/modules/lpr/components/plates/PlateCRUD";

export default function PlatesPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Plate Numbers</h1>

          <p className="text-slate-400 mt-1">
            Manage allowed vehicle plate numbers for the LPR system
          </p>
        </div>
      </div>

      {/* CRUD */}
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6">
        <PlateCRUD />
      </div>
    </div>
  );
}
