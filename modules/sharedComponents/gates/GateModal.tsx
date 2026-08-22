"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Gate } from "@/modules/types/gate";

type GateModalProps = {
  open: boolean;
  gate?: Gate | null;
  onClose: () => void;
  onSave: (gate: Omit<Gate, "id">) => void;
};

type GateFormData = Omit<Gate, "id">;

const emptyForm: GateFormData = {
  name: "",
  type: "ENTRY",
  ip: "",
  description: "",
};

export default function GateModal({
  open,
  gate,
  onClose,
  onSave,
}: GateModalProps) {
  const [form, setForm] = useState<GateFormData>(() => {
    if (gate) {
      return {
        name: gate.name,
        type: gate.type,
        ip: gate.ip,
        description: gate.description,
      };
    }

    return emptyForm;
  });

  if (!open) return null;

  const isEditing = Boolean(gate);

  const updateField = <K extends keyof GateFormData>(
    field: K,
    value: GateFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSave(form);
    onClose();
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        bg-slate-950/40
        p-4
        backdrop-blur-sm
      "
      onMouseDown={onClose}
    >
      <div
        className="
          w-full
          max-w-lg
          rounded-3xl
          bg-white
          p-6
          shadow-2xl

          dark:bg-slate-900
        "
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* ================= HEADER ================= */}

        <div className="flex items-center justify-between">
          <div>
            <h2
              className="
                text-xl
                font-bold
                text-slate-900

                dark:text-white
              "
            >
              {isEditing ? "Edit Gate" : "Add Gate"}
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-slate-400
              "
            >
              {isEditing ? "Update gate information" : "Add a new system gate"}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              text-slate-500
              transition

              hover:bg-slate-200

              dark:bg-slate-800
              dark:text-slate-300
              dark:hover:bg-slate-700
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ================= FORM ================= */}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* Gate Name */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-600

                dark:text-slate-300
              "
            >
              Gate Name
            </label>

            <input
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              required
              placeholder="Gate-5 - Main Entrance"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* Type */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-600

                dark:text-slate-300
              "
            >
              Type
            </label>

            <select
              value={form.type}
              onChange={(e) =>
                updateField("type", e.target.value as "ENTRY" | "EXIT")
              }
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="ENTRY">ENTRY</option>

              <option value="EXIT">EXIT</option>
            </select>
          </div>

          {/* IP Address */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-600

                dark:text-slate-300
              "
            >
              IP Address
            </label>

            <input
              value={form.ip}
              onChange={(e) => updateField("ip", e.target.value)}
              required
              placeholder="http://10.20.1.11"
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* Description */}

          <div>
            <label
              className="
                mb-2
                block
                text-sm
                font-semibold
                text-slate-600

                dark:text-slate-300
              "
            >
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(e) => updateField("description", e.target.value)}
              rows={3}
              placeholder="Primary residents entry"
              className="
                w-full
                resize-none
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-3
                text-sm
                text-slate-900
                outline-none
                transition

                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/10

                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* ================= BUTTONS ================= */}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              className="
                flex-1
                rounded-xl
                bg-cyan-500
                py-3
                text-sm
                font-bold
                text-white
                transition

                hover:bg-cyan-600
                active:scale-[0.98]
              "
            >
              {isEditing ? "Update Gate" : "Save Gate"}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="
                rounded-xl
                bg-slate-100
                px-6
                py-3
                text-sm
                font-bold
                text-slate-600
                transition

                hover:bg-slate-200

                dark:bg-slate-800
                dark:text-slate-300
                dark:hover:bg-slate-700
              "
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
