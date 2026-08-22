"use client";

import { IdentityVisitor } from "@/modules/types/visitor";

type Props = {
  data: IdentityVisitor[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

// Helper function
const getStatusBadge = (status: string) => {
  switch (status) {
    case "inside":
      return "bg-green-500/20 text-green-400";
    case "outside":
      return "bg-red-500/20 text-red-400";
    default:
      return "bg-gray-500/20 text-gray-400";
  }
};

export default function IdentityVisitorsTable({
  data,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[800px]">
        <thead className="bg-[#111827]">
          <tr className="text-left text-slate-400 text-2xl">
            <th className="p-4">ID</th>
            <th className="p-4">Full Name</th>
            <th className="p-4">Document Type</th>
            <th className="p-4">Status</th>
            <th className="p-4">Job Title</th>
            <th className="p-4">Department</th>
            <th className="p-4">Birth Date</th>
            <th className="p-4">Address</th>
            <th className="p-4">Created At</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={9} className="text-center p-8 text-slate-400">
                No visitors found
              </td>
            </tr>
          ) : (
            data.map((visitor) => (
              <tr
                key={visitor.id}
                onClick={() => onSelect(visitor.id)}
                className={`border-t border-white/5 cursor-pointer transition ${
                  selectedId === visitor.id
                    ? "bg-sky-500/20"
                    : "hover:bg-white/5"
                }`}
              >
                <td className="p-4 text-white">{visitor.id}</td>

                <td className="p-4 text-white font-medium">
                  {visitor.full_name || "-"}
                </td>

                <td className="p-4">
                  <span className="px-2 py-1 rounded-full text-xs bg-purple-500/20 text-purple-400">
                    {visitor.document_type === "national_id"
                      ? "National ID"
                      : "Driving License"}
                  </span>
                </td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${getStatusBadge(
                      visitor.status || "outside",
                    )}`}
                  >
                    {visitor.status === "inside" ? "Inside" : "Outside"}
                  </span>
                </td>

                <td className="p-4 text-slate-300">
                  {visitor.job_title || "-"}
                </td>

                <td className="p-4 text-slate-300">
                  {visitor.department || "-"}
                </td>

                <td className="p-4 text-slate-300">
                  {visitor.birth_date || "-"}
                </td>

                <td className="p-4 text-slate-300 max-w-[200px] truncate">
                  {visitor.address || "-"}
                </td>

                <td className="p-4 text-slate-300 text-2xl">
                  {visitor.created_at
                    ? new Date(visitor.created_at).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
