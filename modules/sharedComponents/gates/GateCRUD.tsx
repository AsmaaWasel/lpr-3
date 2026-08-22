"use client";

import { useEffect, useState } from "react";

import GateTable from "./GateTable";
import GateForm from "./GateForm";

import { useToast } from "@/shared/hooks/use-toast";
import { Gate } from "@/modules/types/gate";
import { createGate, deleteGate, getGates, updateGate } from "@/services/gate";

type GateFormData = {
  name: string;
  type: string;
  descriptipn: string;
  ip: string;
};

export default function GateCRUD() {
  const [gates, setGates] = useState<Gate[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Gate | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // UI STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const toast = useToast();

  const selectedGate = gates.find((g) => g.id === selectedId) || null;

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getGates();
        setGates(data);
      } catch {
        toast.error("Failed to load gates");
      }
    };

    load();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredGates = gates.filter((gate) => {
    return (
      gate.name?.toLowerCase().includes(search.toLowerCase()) ||
      gate.type?.toLowerCase().includes(search.toLowerCase()) ||
      gate.ip?.includes(search) ||
      gate.description?.toLowerCase().includes(search.toLowerCase())
    );
  });

  const totalPages = Math.ceil(filteredGates.length / pageSize);

  const paginatedGates = filteredGates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================
  const total = gates.length;

  const entryGates = gates.filter(
    (gate) => gate.type?.toLowerCase() === "entry",
  ).length;

  const exitGates = gates.filter(
    (gate) => gate.type?.toLowerCase() === "exit",
  ).length;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (data: GateFormData) => {
    try {
      if (editing) {
        await updateGate(editing.id, data);
        toast.success("Gate updated successfully");
      } else {
        await createGate(data);
        toast.success("Gate created successfully");
      }

      const refreshed = await getGates();
      setGates(refreshed);

      setOpen(false);
      setEditing(null);
      setSelectedId(null);
    } catch {
      toast.error("Something went wrong");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!selectedGate) return;

    try {
      await deleteGate(selectedGate.id);

      toast.success("Gate deleted successfully");

      const refreshed = await getGates();
      setGates(refreshed);

      setSelectedId(null);
    } catch {
      toast.error("Failed to delete gate");
    }
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">
            Gates
          </h1>
          <p className="text-sm font-medium text-slate-400 mt-0.5">
            Manage system gates
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Total Gates
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-800 dark:text-white">
            {total}
          </h2>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Entry Gates
          </p>
          <h2 className="mt-1 text-2xl font-bold text-blue-500 dark:text-blue-400">
            {entryGates}
          </h2>
        </div>

        <div className="rounded-[24px] border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">
            Exit Gates
          </p>
          <h2 className="mt-1 text-2xl font-bold text-slate-600 dark:text-slate-300">
            {exitGates}
          </h2>
        </div>
      </div>

      {/* SEARCH + ACTIONS */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search */}
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name, IP or description..."
            className="w-full h-11 rounded-[24px] border border-slate-200 bg-white px-5 text-sm font-medium text-slate-800 placeholder:text-slate-400 shadow-sm transition-colors focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="inline-flex h-11 items-center rounded-[24px] bg-cyan-500 px-6 text-sm font-bold text-white transition-colors hover:bg-cyan-600 dark:bg-cyan-500 dark:hover:bg-cyan-600"
          >
            Add Gate
          </button>

          <button
            disabled={!selectedGate}
            onClick={() => {
              if (!selectedGate) return;
              setEditing(selectedGate);
              setOpen(true);
            }}
            className="inline-flex h-11 items-center rounded-[24px] border border-slate-200 bg-white px-6 text-sm font-bold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Edit
          </button>

          <button
            disabled={!selectedGate}
            onClick={handleDelete}
            className="inline-flex h-11 items-center rounded-[24px] border border-red-200 bg-white px-6 text-sm font-bold text-red-500 transition-colors hover:bg-red-50 disabled:opacity-40 dark:border-red-800/30 dark:bg-slate-900 dark:text-red-400 dark:hover:bg-red-950/30"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABLE */}
      <GateTable
        data={paginatedGates}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
      />

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-slate-400">
          Page {currentPage} of {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="inline-flex h-9 items-center rounded-[20px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="inline-flex h-9 items-center rounded-[20px] border border-slate-200 bg-white px-5 text-sm font-bold text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Next
          </button>
        </div>
      </div>

      {/* FORM */}
      {open && (
        <GateForm
          editing={editing}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
