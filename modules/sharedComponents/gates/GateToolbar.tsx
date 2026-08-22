"use client";

import { Search, Plus, Pencil, Trash2 } from "lucide-react";

type GateToolbarProps = {
  search: string;
  setSearch: (value: string) => void;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
  hasSelected: boolean;
};

export default function GateToolbar({
  search,
  setSearch,
  onAdd,
  onEdit,
  onDelete,
  hasSelected,
}: GateToolbarProps) {
  return (
    <div
      className="
        flex
        flex-col
        gap-3
        border-b
        border-slate-100
        p-4
        dark:border-slate-800
        md:flex-row
      "
    >
      {/* Search */}
      <div
        className="
          relative
          flex-1
        "
      >
        <Search
          size={19}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-slate-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, IP or description..."
          className="
            h-11
            w-full
            rounded-xl
            border-0
            bg-slate-100
            pl-11
            pr-4
            text-sm
            font-medium
            text-slate-800
            outline-none
            placeholder:text-slate-400
            focus:ring-2
            focus:ring-cyan-400/30
            dark:bg-slate-800
            dark:text-white
            dark:placeholder:text-slate-500
          "
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={onAdd}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-cyan-500
            px-4
            text-sm
            font-bold
            text-white
            shadow-sm
            transition
            hover:bg-cyan-600
          "
        >
          <Plus size={18} />
          Add Gate
        </button>

        <button
          disabled={!hasSelected}
          onClick={onEdit}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            text-sm
            font-bold
            text-slate-600
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-40
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300
          "
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          disabled={!hasSelected}
          onClick={onDelete}
          className="
            flex
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-rose-50
            px-4
            text-sm
            font-bold
            text-rose-500
            transition
            hover:bg-rose-100
            disabled:cursor-not-allowed
            disabled:opacity-40
            dark:bg-rose-500/10
          "
        >
          <Trash2 size={16} />
          Delete
        </button>
      </div>
    </div>
  );
}
