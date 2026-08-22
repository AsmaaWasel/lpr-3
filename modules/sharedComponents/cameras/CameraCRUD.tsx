// CameraCRUD.tsx
"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/shared/hooks/use-toast";

import {
  getCameras,
  createCamera,
  updateCamera,
  deleteCamera,
} from "@/services/cameras";

import CameraTable from "./CameraTable";
import CameraForm from "./CameraForm";
import { Camera, CameraFormData } from "@/modules/types/camera";

export default function CameraCRUD() {
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Camera | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // UI STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const toast = useToast();

  const selectedCamera = cameras.find((c) => c.id === selectedId) || null;

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCameras();
        setCameras(data);
      } catch {
        toast.error("Failed to load cameras");
      }
    };

    load();
  }, []);

  // =========================
  // FILTERS
  // =========================
  const filteredCameras = cameras.filter((cam) => {
    return (
      cam.location?.toLowerCase().includes(search.toLowerCase()) ||
      cam.ip_address?.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredCameras.length / pageSize);

  const paginatedCameras = filteredCameras.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================
  const totalDevices = cameras.length;

  const totalCameras = cameras.filter((item) => item.type === "camera").length;

  const totalQRCameras = cameras.filter(
    (item) => item.type === "qr_Camera",
  ).length;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (data: CameraFormData) => {
    try {
      if (editing) {
        await updateCamera(editing.id, data);
        toast.success("Camera updated successfully");
      } else {
        await createCamera(data);
        toast.success("Camera created successfully");
      }

      const refreshed = await getCameras();
      setCameras(refreshed);

      setOpen(false);
      setEditing(null);
      setSelectedId(null);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Something went wrong");
    }
  };

  // =========================
  // DELETE
  // =========================
  const handleDelete = async () => {
    if (!selectedCamera) return;

    try {
      await deleteCamera(selectedCamera.id);
      toast.success("Camera deleted successfully");

      const refreshed = await getCameras();
      setCameras(refreshed);

      setSelectedId(null);
    } catch {
      toast.error("Failed to delete camera");
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">Cameras</h1>
        <p className="text-slate-400 text-2xl mt-1">Manage system Cameras</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Total Cameras</p>
          <h2 className="text-2xl font-bold text-white mt-2">{totalCameras}</h2>
        </div>
      </div>

      {/* ACTIONS + SEARCH */}
      <div className="flex items-center justify-between gap-4">
        {/* SEARCH */}
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by location or IP..."
            className="
            text-lg
        w-full
        h-11
        px-4
        rounded-xl
        bg-[#0f172a]
        border
        border-white/10
        text-white
        outline-none
        focus:border-sky-500
      "
          />
        </div>

        {/* BUTTONS */}
        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl text-lg"
          >
            Add Camera
          </button>

          <button
            disabled={!selectedCamera}
            onClick={() => {
              if (!selectedCamera) return;
              setEditing(selectedCamera);
              setOpen(true);
            }}
            className="
        bg-white/10
        hover:bg-white/20
        disabled:opacity-40
        text-white
        px-4
        py-2
        rounded-xl
        text-lg
      "
          >
            Edit
          </button>

          <button
            disabled={!selectedCamera}
            onClick={handleDelete}
            className="
        bg-red-500/20
        hover:bg-red-500/30
        disabled:opacity-40
        text-red-400
        px-4
        py-2
        rounded-xl
        text-lg
      "
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABLE */}
      <CameraTable
        data={paginatedCameras}
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
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="px-4 py-2 rounded-lg bg-white/10 text-white disabled:opacity-40 text-lg"
          >
            Next
          </button>
        </div>
      </div>

      {/* FORM - CameraForm من غير Camera_type */}
      {open && (
        <CameraForm
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
