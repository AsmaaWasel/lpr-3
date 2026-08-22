"use client";

import { Check } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Gate } from "@/modules/types/gate";

type Props = {
  data: Gate[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function GateTable({ data, selectedId, onSelect }: Props) {
  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <Table>
        {/* ================= HEADER ================= */}
        <TableHeader>
          <TableRow
            className="
              border-0
              bg-slate-50
              hover:bg-slate-50

              dark:bg-slate-800/60
              dark:hover:bg-slate-800/60
            "
          >
            {/* Selection */}
            <TableHead className="w-[65px] px-6 py-4">
              <span className="sr-only">Select</span>
            </TableHead>

            {/* Gate Name */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Gate Name
              </span>
            </TableHead>

            {/* Type */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Type
              </span>
            </TableHead>

            {/* IP */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                IP Address
              </span>
            </TableHead>

            {/* Description */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Description
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {data.map((gate) => {
            const selected = selectedId === gate.id;

            return (
              <TableRow
                key={gate.id}
                onClick={() => onSelect(gate.id)}
                className={`
                  cursor-pointer
                  border-t
                  border-slate-100
                  transition-colors

                  hover:bg-slate-50

                  dark:border-slate-800
                  dark:hover:bg-slate-800/60

                  ${selected ? "bg-cyan-50/60 dark:bg-cyan-500/10" : ""}
                `}
              >
                {/* ================= CHECKBOX ================= */}
                <TableCell className="px-6 py-5">
                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-md
                      border
                      transition-all

                      ${
                        selected
                          ? `
                            border-cyan-500
                            bg-cyan-500
                            text-white
                          `
                          : `
                            border-slate-300
                            bg-white

                            dark:border-slate-600
                            dark:bg-slate-800
                          `
                      }
                    `}
                  >
                    {selected && <Check size={13} strokeWidth={3} />}
                  </div>
                </TableCell>

                {/* ================= GATE NAME ================= */}
                <TableCell className="px-6 py-5">
                  <div className="flex flex-col">
                    <span
                      className="
                        text-sm
                        font-bold
                        text-slate-800

                        dark:text-white
                      "
                    >
                      {gate.name}
                    </span>

                    <span
                      className="
                        mt-1
                        text-xs
                        font-medium
                        text-slate-400
                      "
                    >
                      {gate.desc}
                    </span>
                  </div>
                </TableCell>

                {/* ================= TYPE ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-lg
                      px-3
                      py-1.5
                      text-[11px]
                      font-bold

                      ${
                        gate.type === "ENTRY"
                          ? `
                            bg-blue-50
                            text-blue-500

                            dark:bg-blue-500/10
                            dark:text-blue-400
                          `
                          : `
                            bg-slate-100
                            text-slate-600

                            dark:bg-slate-700
                            dark:text-slate-300
                          `
                      }
                    `}
                  >
                    {gate.type}
                  </span>
                </TableCell>

                {/* ================= IP ADDRESS ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className="
                      whitespace-nowrap
                      text-sm
                      font-semibold
                      text-cyan-500
                    "
                  >
                    {gate.ip}
                  </span>
                </TableCell>

                {/* ================= DESCRIPTION ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {gate.desc}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}

          {/* ================= EMPTY STATE ================= */}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={5}
                className="
                  h-40
                  text-center
                  text-sm
                  font-medium
                  text-slate-400
                "
              >
                No gates found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
