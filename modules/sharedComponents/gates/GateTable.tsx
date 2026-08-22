"use client";

import { Gate } from "@/modules/types/gate";

type Props = {
  gates: Gate[];
  selectedGate: number | null;
  onSelect: (id: number) => void;
};

export default function GatesTable({ gates, selectedGate, onSelect }: Props) {
  return (
    <div
      className="
        overflow-hidden
        rounded-[24px]
        bg-white
        shadow-sm
        dark:bg-slate-900
      "
    >
      {/* Header */}
      <div
        className="
          border-b
          border-slate-100
          px-6
          py-5
          dark:border-slate-800
        "
      >
        <h2
          className="
            text-lg
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          System Gates
        </h2>

        <p
          className="
            mt-1
            text-sm
            text-slate-400
          "
        >
          Manage and monitor all gates
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr
              className="
                border-b
                border-slate-100
                bg-slate-50/70
                text-left
                dark:border-slate-800
                dark:bg-slate-800/40
              "
            >
              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Gate
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Type
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                IP Address
              </th>

              <th
                className="
                  px-6
                  py-4
                  text-xs
                  font-bold
                  uppercase
                  tracking-wide
                  text-slate-400
                "
              >
                Description
              </th>
            </tr>
          </thead>

          <tbody>
            {gates.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="
                    px-6
                    py-12
                    text-center
                    text-sm
                    text-slate-400
                  "
                >
                  No gates found
                </td>
              </tr>
            ) : (
              gates.map((gate) => {
                const isSelected = selectedGate === gate.id;

                return (
                  <tr
                    key={gate.id}
                    onClick={() => onSelect(gate.id)}
                    className={`
                      cursor-pointer
                      border-b
                      border-slate-100
                      transition
                      last:border-b-0
                      dark:border-slate-800
                      ${
                        isSelected
                          ? "bg-cyan-50 dark:bg-cyan-500/10"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/50"
                      }
                    `}
                  >
                    {/* Gate */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="
                            flex
                            h-10
                            w-10
                            items-center
                            justify-center
                            rounded-xl
                            bg-cyan-50
                            text-sm
                            font-bold
                            text-cyan-600
                            dark:bg-cyan-500/10
                            dark:text-cyan-400
                          "
                        >
                          {gate.id}
                        </div>

                        <div>
                          <p
                            className="
                              text-sm
                              font-bold
                              text-slate-800
                              dark:text-white
                            "
                          >
                            {gate.name}
                          </p>

                          <p
                            className="
                              mt-0.5
                              text-xs
                              text-slate-400
                            "
                          >
                            Gate #{gate.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-6 py-4">
                      <span
                        className={`
                          inline-flex
                          rounded-full
                          px-3
                          py-1
                          text-xs
                          font-bold
                          ${
                            gate.type === "ENTRY"
                              ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                              : "bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                          }
                        `}
                      >
                        {gate.type}
                      </span>
                    </td>

                    {/* IP */}
                    <td className="px-6 py-4">
                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-600
                          dark:text-slate-300
                        "
                      >
                        {gate.ip}
                      </span>
                    </td>

                    {/* Description */}
                    <td className="px-6 py-4">
                      <span
                        className="
                          text-sm
                          text-slate-500
                          dark:text-slate-400
                        "
                      >
                        {gate.description || "-"}
                      </span>
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
