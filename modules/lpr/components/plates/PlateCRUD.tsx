"use client";

import { useEffect, useState } from "react";
import {
  getPlates,
  createPlate,
  updatePlate,
  deletePlate,
} from "@/services/plate";

import PlateTable from "./PlateTable";
import PlateForm from "./PlateForm";
import { Plate } from "../../../types/plate";
import { useToast } from "@/shared/hooks/use-toast";

type PlateFormData = {
  plate_number_full: string;
};

export default function PlateCRUD() {
  const [plates, setPlates] = useState<Plate[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Plate | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // UI STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const toast = useToast();

  const selectedPlate = plates.find((p) => p.id === selectedId) || null;

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getPlates();
        setPlates(data);
      } catch {
        toast.error("Failed to load plates");
      }
    };

    load();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredPlates = plates.filter((plate) => {
    return plate.plate_number_full
      ?.toLowerCase()
      .includes(search.toLowerCase());
  });

  const totalPages = Math.ceil(filteredPlates.length / pageSize);

  const paginatedPlates = filteredPlates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================
  const total = plates.length;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (data: PlateFormData) => {
    try {
      if (editing) {
        await updatePlate(editing.id, data);
        toast.success("Plate updated successfully");
      } else {
        await createPlate(data);
        toast.success("Plate created successfully");
      }

      const refreshed = await getPlates();
      setPlates(refreshed);

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
    if (!selectedPlate) return;

    try {
      await deletePlate(selectedPlate.id);

      toast.success("Plate deleted successfully");

      const refreshed = await getPlates();
      setPlates(refreshed);

      setSelectedId(null);
    } catch {
      toast.error("Failed to delete plate");
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Plate Numbers</h1>
          <p className="text-slate-400 text-2xl mt-1">
            Manage allowed vehicles
          </p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Total Plates</p>
          <h2 className="text-2xl font-bold text-white mt-2">{total}</h2>
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
            placeholder="Search by plate number..."
            className=" w-full h-11 px-4 rounded-xl bg-[#020617] border border-white/10 text-white text-lg"
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl text-lg"
          >
            Add Plate
          </button>

          <button
            disabled={!selectedPlate}
            onClick={() => {
              if (!selectedPlate) return;

              setEditing(selectedPlate);
              setOpen(true);
            }}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-lg"
          >
            Edit
          </button>

          <button
            disabled={!selectedPlate}
            onClick={handleDelete}
            className="bg-red-500/20 text-lg hover:bg-red-500/30 disabled:opacity-40 text-red-400 px-4 py-2 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABLE */}
      <PlateTable
        data={paginatedPlates}
        selectedId={selectedId}
        onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
      />

      {/* PAGINATION */}
      <div className="flex items-center justify-between">
        <div className="text-2xl text-slate-400">
          Page {currentPage} of {totalPages || 1}
        </div>

        <div className="flex gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-40 text-lg"
          >
            Prev
          </button>

          <button
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-40 text-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* FORM */}
      {open && (
        <PlateForm
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
