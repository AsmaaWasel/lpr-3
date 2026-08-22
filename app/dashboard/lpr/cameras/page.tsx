"use client";

import CameraCRUD from "@/modules/sharedComponents/cameras/CameraCRUD";

export default function CamerasPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Cameras</h1>

          <p className="text-slate-400 mt-1 text-2xl">
            Manage system cameras and entry points
          </p>
        </div>
      </div>

      {/* CRUD */}
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6">
        <CameraCRUD />
      </div>
    </div>
  );
}
