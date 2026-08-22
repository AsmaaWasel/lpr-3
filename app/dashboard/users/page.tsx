"use client";

import UserCRUD from "@/modules/sharedComponents/users/UserCRUD";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>

          <p className="text-slate-400 text-2xl mt-1">Manage system users</p>
        </div>
      </div>

      {/* CRUD */}
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6">
        <UserCRUD />
      </div>
    </div>
  );
}
