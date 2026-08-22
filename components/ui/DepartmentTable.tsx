// /components/departments/DepartmentTable.tsx

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Department } from "@/modules/types/department";

type Props = {
  data: Department[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function DepartmentTable({ data, selectedId, onSelect }: Props) {
  return (
    <div className="border border-white/10 rounded-2xl bg-[#0f172a] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead />
            <TableHead className="text-slate-300">Name</TableHead>
            <TableHead className="text-slate-300">Description</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((dept) => {
            const selected = selectedId === dept.id;

            return (
              <TableRow
                key={dept.id}
                onClick={() => onSelect(dept.id)}
                className={`cursor-pointer ${selected ? "bg-sky-500/10" : ""}`}
              >
                <TableCell>
                  <input type="checkbox" checked={selected} readOnly />
                </TableCell>

                <TableCell className="text-white font-medium">
                  {dept.name}
                </TableCell>

                <TableCell className="text-slate-300 max-w-md truncate">
                  {dept.description || "—"}
                </TableCell>
              </TableRow>
            );
          })}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-slate-400 py-8"
              >
                No departments found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
