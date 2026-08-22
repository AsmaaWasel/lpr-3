// modules/sharedComponents/residents/ResidentCRUD.tsx
"use client";

import { useEffect, useState } from "react";

import ResidentTable from "./ResidentTable";
import ResidentForm from "./ResidentForm";
import CredentialsForm from "./CredentialsForm";
import DonutChart from "./DonutChart";

import { useToast } from "@/shared/hooks/use-toast";
import { Resident } from "@/modules/types/resident";

import {
  createResident,
  deleteResident,
  getResidents,
  updateResident,
  addCredentials,
} from "@/services/resident";

type ResidentFormData = {
  full_name: string;
  phone_numbers: string[];
  phone_number: string;
  type: string;
  owner_id?: number;
  notes: string;
  national_id?: number;
};

type CredentialsFormData = {
  resident_id: number;
  email: string;
  password: string;
};

export default function ResidentCRUD() {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [open, setOpen] = useState(false);
  const [openCredentials, setOpenCredentials] = useState(false);
  const [editing, setEditing] = useState<Resident | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [credentialsLoading, setCredentialsLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 10;

  const toast = useToast();

  const selectedResident = residents.find((r) => r.id === selectedId) || null;

  // =========================
  // LOAD RESIDENTS
  // =========================
  const loadResidents = async () => {
    try {
      setLoading(true);

      const data = await getResidents(0, 100);

      setResidents(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed loading residents:", error);

      toast.error("Failed to load residents");

      setResidents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchResidents = async () => {
      await loadResidents();
    };

    fetchResidents();
  }, []);

  // =========================
  // SEARCH FILTER
  // =========================

  const filteredResidents = residents.filter((resident) => {
    if (!resident) return false;

    const searchLower = search.toLowerCase();

    return (
      resident.full_name?.toLowerCase().includes(searchLower) ||
      resident.phone_number?.includes(search) ||
      resident.national_id?.toString().includes(search) ||
      resident.type?.toLowerCase().includes(searchLower) ||
      resident.status?.toLowerCase().includes(searchLower) ||
      resident.notes?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredResidents.length / pageSize) || 1;

  const paginatedResidents = filteredResidents.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================

  const total = residents.length;

  const allowedResidents = residents.filter(
    (resident) => resident.status?.toLowerCase() === "allowed",
  ).length;

  const blockedResidents = residents.filter(
    (resident) => resident.status?.toLowerCase() === "notallowed",
  ).length;

  // =========================
  // CREATE / UPDATE
  // =========================

  const handleSubmit = async (data: ResidentFormData) => {
    try {
      if (editing) {
        await updateResident(editing.id, data);

        toast.success("Resident updated successfully");
      } else {
        await createResident(data);

        toast.success("Resident created successfully");
      }

      await loadResidents();

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
    if (!selectedResident) return;

    try {
      await deleteResident(selectedResident.id);

      toast.success("Resident deleted successfully");

      await loadResidents();

      setSelectedId(null);
    } catch (error) {
      console.error("Delete error:", error);

      toast.error("Failed to delete resident");
    }
  };

  // =========================
  // CREDENTIALS
  // =========================

  const handleCredentialsSubmit = async (data: CredentialsFormData) => {
    try {
      setCredentialsLoading(true);

      await addCredentials(data.resident_id, {
        email: data.email,
        password: data.password,
      });

      toast.success("Credentials added successfully");

      setOpenCredentials(false);
    } catch (error) {
      console.error("Credentials error:", error);

      toast.error("Failed to add credentials");
    } finally {
      setCredentialsLoading(false);
    }
  };

  // =========================
  // ✅ HANDLE STATUS CHANGE
  // =========================
  const handleStatusChange = (
    residentId: number,
    newStatus: Resident["status"],
  ) => {
    setResidents((prevResidents) =>
      prevResidents.map((resident) =>
        resident.id === residentId
          ? {
              ...resident,
              status: newStatus,
            }
          : resident,
      ),
    );
  };

  if (loading) {
    return <div className="text-white p-6">Loading residents...</div>;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-white text-2xl font-bold">Residents</h1>
        <p className="text-slate-400 text-2xl mt-1">
          Manage building residents
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="lg:col-span-2">
          <DonutChart
            allowed={allowedResidents}
            notAllowed={blockedResidents}
            total={total}
          />
        </div>

        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <p className="text-slate-400 text-2xl">Total Residents</p>
            <h2 className="text-2xl text-white font-bold mt-1">{total}</h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <p className="text-slate-400 text-2xl">Allowed</p>
            <h2 className="text-2xl text-green-400 font-bold mt-1">
              {allowedResidents}
            </h2>
          </div>

          <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center">
            <p className="text-slate-400 text-2xl">Not Allowed</p>
            <h2 className="text-2xl text-red-400 font-bold mt-1">
              {blockedResidents}
            </h2>
          </div>
        </div>
      </div>

      {/* SEARCH + BUTTONS */}
      <div className="flex flex-col md:flex-row gap-4">
        <input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          placeholder="Search residents..."
          className="
          flex-1
          h-11
          px-4
          rounded-xl
          bg-[#020617]
          border
          border-white/10
          text-white
          text-lg
          "
        />

        <button
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
          className="
          bg-sky-500
          text-white
          px-5
          rounded-xl
          "
        >
          Add Resident
        </button>

        <button
          disabled={!selectedResident}
          onClick={() => {
            if (selectedResident) {
              setOpenCredentials(true);
            }
          }}
          className="
          bg-purple-500
          text-white
          px-5
          rounded-xl
          disabled:opacity-40
          hover:bg-purple-600
          transition-colors
          "
        >
          Add Credentials
        </button>

        <button
          disabled={!selectedResident}
          onClick={() => {
            if (selectedResident) {
              setEditing(selectedResident);
              setOpen(true);
            }
          }}
          className="
          bg-white/10
          text-white
          px-5
          rounded-xl
          disabled:opacity-40
          text-lg
          "
        >
          Edit
        </button>

        <button
          disabled={!selectedResident}
          onClick={handleDelete}
          className="
          bg-red-500/20
          text-red-400
          px-5
          rounded-xl
          disabled:opacity-40
          text-lg
          "
        >
          Delete
        </button>
      </div>

      {/* TABLE */}
      {residents.length === 0 ? (
        <div className="text-center text-slate-400 py-10 border border-white/10 rounded-xl">
          No residents found
        </div>
      ) : (
        <ResidentTable
          data={paginatedResidents}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId((prev) => (prev === id ? null : id))}
          onStatusChange={handleStatusChange}
        />
      )}

      {/* PAGINATION */}
      {residents.length > 0 && (
        <div className="flex justify-between">
          <span className="text-slate-400">
            Page {currentPage} / {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-lg"
            >
              Prev
            </button>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 bg-white/10 text-white rounded-lg text-lg"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* FORM */}
      {open && (
        <ResidentForm
          editing={editing}
          onClose={() => {
            setOpen(false);
            setEditing(null);
          }}
          onSubmit={handleSubmit}
        />
      )}

      {/* CREDENTIALS FORM */}
      {openCredentials && selectedResident && (
        <CredentialsForm
          residentId={selectedResident.id}
          residentName={selectedResident.full_name}
          onClose={() => setOpenCredentials(false)}
          onSubmit={handleCredentialsSubmit}
          loading={credentialsLoading}
        />
      )}
    </div>
  );
}
