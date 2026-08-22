// CameraTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Camera } from "@/modules/types/camera";
import Link from "next/link";

type Props = {
  data: Camera[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function CameraTable({ data, selectedId, onSelect }: Props) {
  return (
    <div className="border border-white/10 rounded-2xl bg-[#0f172a] overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead />
            <TableHead className="text-slate-300">Location</TableHead>
            <TableHead className="text-slate-300">IP</TableHead>
            <TableHead className="text-slate-300">Port</TableHead>
            <TableHead className="text-slate-300">Gate ID</TableHead>
            <TableHead className="text-slate-300">URL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((cam) => {
            const selected = selectedId === cam.id;

            return (
              <TableRow
                key={cam.id}
                onClick={() => onSelect(cam.id)}
                className={`cursor-pointer ${selected ? "bg-sky-500/10" : ""}`}
              >
                <TableCell>
                  <input type="checkbox" checked={selected} readOnly />
                </TableCell>

                <TableCell className="text-white">{cam.location}</TableCell>

                <TableCell className="text-slate-300">
                  {cam.ip_address}
                </TableCell>

                <TableCell className="text-slate-300">{cam.port}</TableCell>

                <TableCell className="text-slate-300">{cam.gate_id}</TableCell>

                <TableCell className="text-slate-300 break-all max-w-md">
                  {cam.url ? (
                    <Link
                      href={`/dashboard/qr/cameras/${cam.id}`}
                      className="text-sky-400 hover:text-sky-300 underline"
                    >
                      {cam.url}
                    </Link>
                  ) : (
                    <span className="text-slate-500">No URL</span>
                  )}
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
                No cameras found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
