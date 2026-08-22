"use client";

import { User } from "lucide-react";

type ResidentUser = {
  full_name?: string;
  building_number?: string;
  flat_number?: string;
};

type Props = {
  user: ResidentUser | null;
  activeTab: "qr" | "profile";
  onChangeTab: (tab: "qr" | "profile") => void;
};

export default function ResidentSummaryCard({ user }: Props) {
  return (
    <div className="mb-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-6 backdrop-blur-md sm:flex-row">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-sky-400/20 bg-sky-500/5">
          <User className="h-6 w-6 text-sky-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">{user?.full_name || "Name"}</h2>

          <p className="text-xs text-slate-400">
            Building{" "}
            <span className="text-white">{user?.building_number || "-"}</span>
            {" • "}
            Flat <span className="text-white">{user?.flat_number || "-"}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
