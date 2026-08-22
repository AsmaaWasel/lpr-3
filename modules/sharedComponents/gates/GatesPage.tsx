"use client";

import { useMemo, useState } from "react";

import GatesHeader from "./GatesHeader";
import GatesTabs from "./GatesTabs";
import GateStats from "./GateStats";
import GateToolbar from "./GateToolbar";

import GatesPagination from "./GatesPagination";
import GateModal from "./GateModal";
import { Gate } from "@/modules/types/gate";
import GatesTable from "@/modules/resident-portal/components/GatesTable";

const initialGates: Gate[] = [
  {
    id: 1,
    name: "Gate-1 · Main North",
    type: "ENTRY",
    ip: "http://10.20.1.11",
    description: "Primary residents entry",
  },
  {
    id: 2,
    name: "Gate-2 · Main Exit",
    type: "EXIT",
    ip: "http://10.20.1.12",
    description: "Primary exit lane",
  },
  {
    id: 3,
    name: "Gate-3 · Service",
    type: "ENTRY",
    ip: "http://10.20.1.21",
    description: "Deliveries & contractors",
  },
  {
    id: 4,
    name: "Gate-4 · Club House",
    type: "ENTRY",
    ip: "http://10.20.1.31",
    description: "Amenities · QR only",
  },
];

export default function GatesPage() {
  const [gates, setGates] = useState<Gate[]>(initialGates);

  const [search, setSearch] = useState("");

  const [selectedGate, setSelectedGate] = useState<number | null>(null);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingGate, setEditingGate] = useState<Gate | null>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const filteredGates = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) {
      return gates;
    }

    return gates.filter((gate) => {
      return (
        gate.name.toLowerCase().includes(query) ||
        gate.ip.toLowerCase().includes(query) ||
        gate.description.toLowerCase().includes(query)
      );
    });
  }, [gates, search]);

  const totalPages = Math.max(1, Math.ceil(filteredGates.length / 10));

  const handleAdd = () => {
    setEditingGate(null);
    setModalOpen(true);
  };

  const handleEdit = () => {
    if (!selectedGate) return;

    const gate = gates.find((item) => item.id === selectedGate);

    if (!gate) return;

    setEditingGate(gate);
    setModalOpen(true);
  };

  const handleDelete = () => {
    if (!selectedGate) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this gate?",
    );

    if (!confirmed) return;

    setGates((prev) => prev.filter((gate) => gate.id !== selectedGate));

    setSelectedGate(null);
  };

  const handleSave = (data: Omit<Gate, "id">) => {
    if (editingGate) {
      setGates((prev) =>
        prev.map((gate) =>
          gate.id === editingGate.id
            ? {
                ...gate,
                ...data,
              }
            : gate,
        ),
      );

      setSelectedGate(null);

      return;
    }

    const newGate: Gate = {
      id: gates.length > 0 ? Math.max(...gates.map((g) => g.id)) + 1 : 1,

      ...data,
    };

    setGates((prev) => [...prev, newGate]);
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#eef3f9]
        text-slate-900
        transition-colors
        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* Main */}
      <main
        className="
          min-h-screen
          px-4
          py-4
          lg:ml-[128px]
          lg:px-5
        "
      >
        <div className="mx-auto max-w-[1500px]">
          {/* Header */}
          <GatesHeader />

          {/* Content */}
          <div className="mt-4 space-y-4">
            {/* Tabs */}
            <GatesTabs />

            {/* Statistics */}
            <GateStats />

            {/* Table Card */}
            <section
              className="
                overflow-hidden
                rounded-[24px]
                bg-white
                shadow-sm
                dark:bg-slate-900
              "
            >
              {/* Toolbar */}
              <GateToolbar
                search={search}
                setSearch={(value) => {
                  setSearch(value);
                  setCurrentPage(1);
                }}
                onAdd={handleAdd}
                onEdit={handleEdit}
                onDelete={handleDelete}
                hasSelected={selectedGate !== null}
              />

              {/* Table */}
              <GatesTable
                gates={filteredGates}
                selectedGate={selectedGate}
                onSelect={(id) => {
                  setSelectedGate(selectedGate === id ? null : id);
                }}
              />

              {/* Pagination */}
              <GatesPagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredGates.length}
                onPrevious={() =>
                  setCurrentPage((prev) => Math.max(1, prev - 1))
                }
                onNext={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
              />
            </section>
          </div>
        </div>
      </main>

      {/* Modal */}
      <GateModal
        open={modalOpen}
        gate={editingGate}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
