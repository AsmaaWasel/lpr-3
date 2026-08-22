"use client";

import { CongestionLevel, GateData } from "@/modules/types/gateEntry";
import { HiOutlineOfficeBuilding } from "react-icons/hi";

type Props = {
  gates: GateData[];
  selectedGate: GateData | null;

  onSelect: (gate: GateData) => void;

  onDragStart: (e: React.DragEvent, gate: GateData) => void;

  getCongestionLevel: (count: number) => CongestionLevel;
};

export default function GatesTable({
  gates,
  selectedGate,
  onSelect,
  onDragStart,
  getCongestionLevel,
}: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold flex items-center gap-2">
          <HiOutlineOfficeBuilding className="w-5 h-5" />
          All Gates List
          <span className="text-xs text-slate-400 font-normal ml-2">
            (Drag any gate to the map to reposition)
          </span>
        </h2>

        <span className="text-xs text-slate-400 bg-white/5 px-3 py-1 rounded-full">
          Total: {gates.length} gates
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-2xl">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-slate-400">#</th>

              <th className="text-left py-3 px-4 text-slate-400">Gate Name</th>

              <th className="text-left py-3 px-4 text-slate-400">
                Description
              </th>

              <th className="text-left py-3 px-4 text-slate-400">Status</th>

              <th className="text-left py-3 px-4 text-slate-400">Entries</th>

              <th className="text-left py-3 px-4 text-slate-400">Traffic</th>

              <th className="text-left py-3 px-4 text-slate-400">Action</th>
            </tr>
          </thead>

          <tbody>
            {gates.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-slate-500">
                  No gates available
                </td>
              </tr>
            ) : (
              gates.map((gate, index) => {
                const entryCount = gate.entryCount || 0;

                const level = getCongestionLevel(entryCount);

                const isOpen = gate.isOpen || false;

                return (
                  <tr
                    key={gate.id}
                    onClick={() => onSelect(gate)}
                    draggable
                    onDragStart={(e) => onDragStart(e, gate)}
                    className={`border-b border-white/5 hover:bg-white/5 cursor-grab ${
                      selectedGate?.id === gate.id ? "bg-blue-500/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4 text-slate-500">#{index + 1}</td>

                    <td className="py-3 px-4 text-white font-medium">
                      {gate.name}
                    </td>

                    <td className="py-3 px-4 text-slate-400">
                      {gate.desc || "—"}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={
                          isOpen ? "text-emerald-400" : "text-slate-400"
                        }
                      >
                        {isOpen ? "OPEN" : "CLOSED"}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-white">{entryCount}</td>

                    <td className="py-3 px-4">
                      <span
                        className={
                          level === "heavy"
                            ? "text-rose-400"
                            : level === "medium"
                              ? "text-amber-400"
                              : "text-emerald-400"
                        }
                      >
                        {level.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-500">
                      ↕ Drag to map
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
