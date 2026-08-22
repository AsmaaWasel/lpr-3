"use client";

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
        return "text-purple-400 bg-purple-500/10";
      case "operator":
        return "text-blue-400 bg-blue-500/10";
      case "viewer":
        return "text-green-400 bg-green-500/10";
      default:
        return "text-slate-400 bg-white/5";
    }
  };

  return (
    <div className="border border-white/10 rounded-2xl bg-[#0f172a] overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="border-white/10">
            <TableHead className="w-[60px]" />
            <TableHead className="text-slate-300">Name</TableHead>
            <TableHead className="text-slate-300">Email</TableHead>

            <TableHead className="text-slate-300">Role</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((user) => {
            const selected = selectedId === user.id;

            return (
              <TableRow
                key={user.id}
                onClick={() => onSelect(user.id)}
                className={`cursor-pointer border-white/5 hover:bg-white/5 ${
                  selected ? "bg-sky-500/10" : ""
                }`}
              >
                <TableCell>
                  <input type="checkbox" checked={selected} readOnly />
                </TableCell>
                <TableCell className="text-white font-medium">
                  {user.username}
                </TableCell>
                <TableCell className="text-slate-300">{user.email}</TableCell>

                <TableCell>
                  <span
                    className={`px-3 py-1 rounded-full text-2xl font-medium ${getRoleColor(
                      user.role,
                    )}`}
                  >
                    {user.role}
                  </span>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
