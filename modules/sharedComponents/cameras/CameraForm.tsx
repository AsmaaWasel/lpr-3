"use client";

import { CameraFormData } from "@/modules/types/camera";
import { getGates } from "@/services/gate";
import { useEffect, useState } from "react";

type Gate = {
  id: number;
  name: string;
};

type Props = {
  editing?: Partial<CameraFormData> | null;
  onClose: () => void;
  onSubmit: (data: CameraFormData) => void;
};

export default function CameraForm({ editing, onClose, onSubmit }: Props) {
  const [gates, setGates] = useState<Gate[]>([]);

  const [form, setForm] = useState<CameraFormData>({
    gate_id: editing?.gate_id ?? 0,
    location: editing?.location ?? "",
    username: editing?.username ?? "",
    password: editing?.password ?? "",
    ip_address: editing?.ip_address ?? "",
    port: editing?.port ?? "",
    notes: editing?.notes ?? "",
    add_string_to_url: editing?.add_string_to_url ?? "",
  });

  // =========================
  // GET GATES
  // =========================
  useEffect(() => {
    const fetchGates = async () => {
      try {
        const data = await getGates();
        setGates(data);
      } catch (error) {
        console.error("Failed to fetch gates", error);
      }
    };

    fetchGates();
  }, []);

  const handleChange = <K extends keyof CameraFormData>(
    key: K,
    value: CameraFormData[K],
  ) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleGateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const gateId = Number(e.target.value);

    const selectedGate = gates.find((gate) => gate.id === gateId);

    setForm((prev) => ({
      ...prev,
      gate_id: gateId,
      location: selectedGate?.name || "",
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-[#0f172a] p-6 rounded-xl w-[500px] space-y-4">
        <h2 className="text-2xl font-bold text-white">
          {editing ? "Edit Camera" : "Add Camera"}
        </h2>

        {/* Gate Dropdown */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Gate</label>
          <select
            className="w-full p-2.5 rounded bg-black/30 text-white text-base"
            value={form.gate_id}
            onChange={handleGateChange}
          >
            <option value="" className="text-black">
              Select Gate
            </option>

            {gates.map((gate) => (
              <option key={gate.id} value={gate.id} className="text-black">
                {gate.name}
              </option>
            ))}
          </select>
        </div>

        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Username</label>
          <input
            placeholder="Enter username"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.username}
            onChange={(e) => handleChange("username", e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Password</label>
          <input
            placeholder="Enter password"
            type="password"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        {/* IP Address */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">IP Address</label>
          <input
            placeholder="Enter IP address (e.g., 192.168.1.100)"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.ip_address}
            onChange={(e) => handleChange("ip_address", e.target.value)}
          />
        </div>

        {/* Port */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Port</label>
          <input
            placeholder="Enter port number (e.g., 8080)"
            type="number"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.port}
            onChange={(e) => handleChange("port", e.target.value)}
          />
        </div>

        {/* Add SubURL */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Add SubURL</label>
          <input
            placeholder="Enter string to append to URL (e.g., /stream)"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.add_string_to_url}
            onChange={(e) => handleChange("add_string_to_url", e.target.value)}
          />
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-white text-base font-medium">Notes</label>
          <input
            placeholder="Enter notes"
            className="w-full p-2.5 rounded bg-black/30 text-white text-base placeholder:text-slate-400"
            value={form.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-base font-medium px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              const selectedGate = gates.find(
                (gate) => gate.name === form.location,
              );

              if (!selectedGate) {
                alert("Gate not found");
                return;
              }

              onSubmit({
                ...form,
                gate_id: selectedGate.id,
              });
            }}
            className="bg-sky-500 hover:bg-sky-400 px-5 py-2 rounded text-white text-base font-medium"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
