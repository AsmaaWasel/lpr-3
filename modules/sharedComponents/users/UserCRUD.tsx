"use client";

import { useEffect, useState } from "react";

import { useToast } from "@/shared/hooks/use-toast";
import { User } from "@/modules/types/user";
import { createUser, deleteUser, getUsers, updateUser } from "@/services/user";
import UserTable from "./UserTable";
import UserForm from "./UserForm";

type UserFormData = {
  name: string;
  email: string;
  role: string;
  phone: string;
};

export default function UserCRUD() {
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // UI STATES
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const toast = useToast();

  const selectedUser = users.find((u) => u.id === selectedId) || null;

  // =========================
  // LOAD
  // =========================
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch {
        toast.error("Failed to load users");
      }
    };

    load();
  }, []);

  // =========================
  // FILTER
  // =========================
  const filteredUsers = users.filter((user) => {
    return (
      user.name?.toLowerCase().includes(search.toLowerCase()) ||
      user.email?.toLowerCase().includes(search.toLowerCase()) ||
      user.role?.toLowerCase().includes(search.toLowerCase()) ||
      user.phone?.includes(search)
    );
  });

  const totalPages = Math.ceil(filteredUsers.length / pageSize);

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // =========================
  // STATS
  // =========================
  const total = users.length;

  const adminUsers = users.filter(
    (user) => user.role?.toLowerCase() === "admin",
  ).length;

  const securityUsers = users.filter(
    (user) => user.role?.toLowerCase() === "security",
  ).length;

  const managerUsers = users.filter(
    (user) => user.role?.toLowerCase() === "manager",
  ).length;

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (data: UserFormData) => {
    try {
      if (editing) {
        await updateUser(editing.id, data);
        toast.success("User updated successfully");
      } else {
        await createUser(data);
        toast.success("User created successfully");
      }

      const refreshed = await getUsers();
      setUsers(refreshed);

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
    if (!selectedUser) return;

    try {
      await deleteUser(selectedUser.id);

      toast.success("User deleted successfully");

      const refreshed = await getUsers();
      setUsers(refreshed);

      setSelectedId(null);
    } catch {
      toast.error("Failed to delete user");
    }
  };

  return (
    <div className="space-y-5">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Users</h1>

          <p className="text-slate-400 text-2xl mt-1">Manage system users</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Users */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Total Users</p>
          <h2 className="text-2xl font-bold text-white mt-2">{total}</h2>
        </div>

        {/* Admins */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Admins</p>
          <h2 className="text-2xl font-bold text-purple-400 mt-2">
            {adminUsers}
          </h2>
        </div>

        {/* Security */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Security</p>
          <h2 className="text-2xl font-bold text-yellow-400 mt-2">
            {securityUsers}
          </h2>
        </div>

        {/* Managers */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-4">
          <p className="text-slate-400 text-2xl">Managers</p>
          <h2 className="text-2xl font-bold text-green-400 mt-2">
            {managerUsers}
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
            placeholder="Search by name, email, role or phone..."
            className="w-full h-11 px-4 rounded-xl bg-[#020617] border border-white/10 text-white text-lg"
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
            Add User
          </button>

          <button
            disabled={!selectedUser}
            onClick={() => {
              if (!selectedUser) return;

              setEditing(selectedUser);
              setOpen(true);
            }}
            className="bg-white/10 text-lg hover:bg-white/20 disabled:opacity-40 text-white px-4 py-2 rounded-xl text-lg"
          >
            Edit
          </button>

          <button
            disabled={!selectedUser}
            onClick={handleDelete}
            className="bg-red-500/20 text-lg hover:bg-red-500/30 disabled:opacity-40 text-red-400 px-4 py-2 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>

      {/* TABLE */}
      <UserTable
        data={paginatedUsers}
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
        <UserForm
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
