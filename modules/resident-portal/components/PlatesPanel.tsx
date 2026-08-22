"use client";

import { Plate } from "@/modules/types/gateEntry";

type Props = {
  plates: Plate[];
  selectedPlate: Plate | null;
  onSelect: (plate: Plate) => void;
};

export default function PlatesPanel({
  plates,
  selectedPlate,
  onSelect,
}: Props) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-white font-bold">🚗 Plates</h2>

        <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded-full">
          {plates.length}
        </span>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto">
        {plates.map((plate) => (
          <button
            key={plate.id}
            onClick={() => onSelect(plate)}
            className={`w-full text-left p-3 rounded-xl ${
              selectedPlate?.id === plate.id
                ? "bg-white/20 text-white border border-white/40"
                : "bg-white/5 text-slate-300 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center gap-1 flex-wrap">
              {plate.plate_number_full.split("").map((char, index) => {
                const isDigit = /\d/.test(char);

                const isLetter = /[A-Za-z]/.test(char);

                return (
                  <span
                    key={index}
                    className={`
                        font-mono text-2xl font-extrabold
                        px-1 py-0.5 rounded
                        ${isDigit ? "text-white bg-white/20" : ""}
                        ${isLetter ? "text-cyan-300 bg-cyan-400/20" : ""}
                      `}
                  >
                    {char}
                  </span>
                );
              })}
            </div>

            <div className="text-[10px] text-slate-500 mt-2">
              ID: {plate.id}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
