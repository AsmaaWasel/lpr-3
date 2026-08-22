// /components/departments/DepartmentCRUD.tsx

"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/departments";
import DepartmentTable from "./DepartmentTable";
import DepartmentForm from "./DepartmentForm";
import { Department, DepartmentFormData } from "@/modules/types/department";

export default function DepartmentCRUD() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Department | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // UI STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const toast = useToast();

  const selectedDepartment =
    departments.find((d) => d.id === selectedId) || null;

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDepartments();
        setDepartments(data);
      } catch {
        toast.error("Failed to load departments");
      }
    };

    load();
  }, []);

  // =========================
  // FILTERS
  // =========================
  const filteredDepartments = departments.filter((dept) => {
    const searchLower = search.toLowerCase();
    return (
      dept.name?.toLowerCase().includes(searchLower) ||
      dept.description?.toLowerCase().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredDepartments.length / pageSize);
  const paginatedDepartments = filteredDepartments.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================
  const totalDepartments = departments.length;
  const activeDepartments = departments.filter((d) => d.is_active).length;
  const inactiveDepartments = departments.filter((d) => !d.is_active).length;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (data: DepartmentFormData) => {
    try {
      if (editing) {
        await updateDepartment(editing.id, data);
        toast.success("Department updated successfully");
      } else {
        await createDepartment(data);
        toast.success("Department created successfully");
      }

      const refreshed = await getDepartments();
      setDepartments(refreshed);

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
    if (!selectedDepartment) return;

    try {
      await deleteDepartment(selectedDepartment.id);
      toast.success("Department deleted successfully");

      const refreshed = await getDepartments();
      setDepartments(refreshed);
      setSelectedId(null);
    } catch {
      toast.error("Failed to delete department");
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">Departments</h1>
        <p className="text-slate-400 text-2xl mt-1">
          Manage system departments
        </p>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Total Departments</p>
          <h2 className="text-2xl font-bold text-white mt-2">
            {totalDepartments}
          </h2>
        </div>
      </div>

      {/* ACTIONS + SEARCH */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name or description..."
            className="text-lg w-full h-11 px-4 rounded-xl bg-[#0f172a] border border-white/10 text-white outline-none focus:border-sky-500"
          />
        </div>

        <div className="flex gap-3 shrink-0">
          <button
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
            className="bg-sky-500 hover:bg-sky-400 text-white px-4 py-2 rounded-xl text-lg"
          >
            Add Department
          </button>

          <button
            disabled={!selectedDepartment}
            onClick={() => {
              if (!selectedDepartment) return;
              setEditing(selectedDepartment);
              setOpen(true);
            }}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-lg"
          >
            Edit
          </button>

          <button
            disabled={!selectedDepartment}
            onClick={handleDelete}
            className="bg-red-500/20 hover:bg-red-500/30 disabled:opacity-40 text-red-400 px-4 py-2 rounded-xl text-lg"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABLE */}
      <DepartmentTable
        data={paginatedDepartments}
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

      {/* FORM */}
      {open && (
        <DepartmentForm
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
