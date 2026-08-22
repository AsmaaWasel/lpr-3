"use client";

import { Check } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { User } from "@/modules/types/user";

type Props = {
  data: User[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function UserTable({ data, selectedId, onSelect }: Props) {
  const getRoleColor = (role: string) => {
    switch (role?.toLowerCase()) {
      case "admin":
        return `
          bg-purple-50
          text-purple-500

          dark:bg-purple-500/10
          dark:text-purple-400
        `;

      case "operator":
        return `
          bg-blue-50
          text-blue-500

          dark:bg-blue-500/10
          dark:text-blue-400
        `;

      case "viewer":
        return `
          bg-green-50
          text-green-500

          dark:bg-green-500/10
          dark:text-green-400
        `;

      default:
        return `
          bg-slate-100
          text-slate-600

          dark:bg-slate-700
          dark:text-slate-300
        `;
    }
  };

  return (
    <div
      className="
        w-full
        overflow-hidden
        rounded-[24px]
        border
        border-slate-200
        bg-white
        shadow-sm

        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      <Table>
        {/* ================= HEADER ================= */}
        <TableHeader>
          <TableRow
            className="
              border-0
              bg-slate-50
              hover:bg-slate-50

              dark:bg-slate-800/60
              dark:hover:bg-slate-800/60
            "
          >
            {/* Selection */}
            <TableHead className="w-[65px] px-6 py-4">
              <span className="sr-only">Select</span>
            </TableHead>

            {/* Name */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Name
              </span>
            </TableHead>

            {/* Email */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Email
              </span>
            </TableHead>

            {/* Role */}
            <TableHead className="px-6 py-4">
              <span
                className="
                  text-[11px]
                  font-bold
                  uppercase
                  tracking-[0.15em]
                  text-slate-400
                "
              >
                Role
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ================= BODY ================= */}
        <TableBody>
          {data.map((user) => {
            const selected = selectedId === user.id;

            return (
              <TableRow
                key={user.id}
                onClick={() => onSelect(user.id)}
                className={`
                  cursor-pointer
                  border-t
                  border-slate-100
                  transition-colors

                  hover:bg-slate-50

                  dark:border-slate-800
                  dark:hover:bg-slate-800/60

                  ${selected ? "bg-cyan-50/60 dark:bg-cyan-500/10" : ""}
                `}
              >
                {/* ================= CHECKBOX ================= */}
                <TableCell className="px-6 py-5">
                  <div
                    className={`
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-md
                      border
                      transition-all

                      ${
                        selected
                          ? `
                            border-cyan-500
                            bg-cyan-500
                            text-white
                          `
                          : `
                            border-slate-300
                            bg-white

                            dark:border-slate-600
                            dark:bg-slate-800
                          `
                      }
                    `}
                  >
                    {selected && <Check size={13} strokeWidth={3} />}
                  </div>
                </TableCell>

                {/* ================= NAME ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className="
                      text-sm
                      font-bold
                      text-slate-800

                      dark:text-white
                    "
                  >
                    {user.username}
                  </span>
                </TableCell>

                {/* ================= EMAIL ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className="
                      text-sm
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {user.email}
                  </span>
                </TableCell>

                {/* ================= ROLE ================= */}
                <TableCell className="px-6 py-5">
                  <span
                    className={`
                      inline-flex
                      items-center
                      rounded-lg
                      px-3
                      py-1.5
                      text-[11px]
                      font-bold
                      uppercase

                      ${getRoleColor(user.role)}
                    `}
                  >
                    {user.role}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}

          {/* ================= EMPTY STATE ================= */}
          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4}
                className="
                  h-40
                  text-center
                  text-sm
                  font-medium
                  text-slate-400
                "
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
