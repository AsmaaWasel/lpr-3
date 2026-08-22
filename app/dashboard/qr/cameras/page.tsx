"use client";

import ReaderCRUD from "@/modules/sharedComponents/cameras/ReaderCRUD";

export default function CamerasPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">QR Readers</h1>

          <p className="text-slate-400 mt-1 text-xl">
            Manage system readers and entry points
          </p>
        </div>
      </div>

      {/* CRUD */}
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6">
        <ReaderCRUD />
      </div>
    </div>
  );
}
