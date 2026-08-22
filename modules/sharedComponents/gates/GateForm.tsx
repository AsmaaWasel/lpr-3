"use client";

import { useState } from "react";
import { X } from "lucide-react";

import { Gate } from "@/modules/types/gate";

type GateFormData = {
  name: string;
  type: "ENTRY" | "EXIT";
  description: string;
  ip: string;
};

type Props = {
  editing?: Gate | null;
  onClose: () => void;
  onSubmit: (data: GateFormData) => void | Promise<void>;
};

export default function GateForm({ editing, onClose, onSubmit }: Props) {
  const [name, setName] = useState(editing?.name ?? "");

  const [type, setType] = useState<"ENTRY" | "EXIT">(editing?.type ?? "ENTRY");

  const [description, setDescription] = useState(editing?.description ?? "");

  const [ip, setIp] = useState(editing?.ip ?? "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await onSubmit({
      name,
      type,
      description,
      ip,
    });
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
        {/* HEADER */}
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
              {editing ? "Edit Gate" : "Add Gate"}
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              {editing ? "Update gate information" : "Add a new system gate"}
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

        {/* FORM */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {/* NAME */}
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
              value={name}
              onChange={(e) => setName(e.target.value)}
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
                outline-none
                transition
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* TYPE */}
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
              value={type}
              onChange={(e) => setType(e.target.value as "ENTRY" | "EXIT")}
              className="
                h-11
                w-full
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                text-sm
                outline-none
                transition
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            >
              <option value="ENTRY">ENTRY</option>
              <option value="EXIT">EXIT</option>
            </select>
          </div>

          {/* IP */}
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
              value={ip}
              onChange={(e) => setIp(e.target.value)}
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
                outline-none
                transition
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* DESCRIPTION */}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
                outline-none
                transition
                focus:border-cyan-400
                focus:ring-2
                focus:ring-cyan-400/20
                dark:border-slate-700
                dark:bg-slate-800
                dark:text-white
              "
            />
          </div>

          {/* BUTTONS */}
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
              {editing ? "Update Gate" : "Save Gate"}
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
