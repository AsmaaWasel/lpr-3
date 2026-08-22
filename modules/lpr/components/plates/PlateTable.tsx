"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRouter } from "next/navigation";
import { Plate } from "../../../types/plate";

type Props = {
  data: Plate[];
  selectedId: number | null;
  onSelect: (id: number) => void;
};

export default function PlateTable({ data, selectedId, onSelect }: Props) {
  const router = useRouter(); // تهيئة useRouter

  const formatPlateNumber = (plate: string) => {
    if (!plate) return "";

    // إزالة أي مسافات موجودة
    const clean = plate.replace(/\s/g, "");

    // استخراج الأرقام
    const numbers = clean.match(/\d+/g)?.join("") || "";

    // استخراج الحروف وفصلها بمسافات
    const letters = clean.match(/[^\d]+/g)?.join("") || "";
    const spacedLetters = letters.split("").join(" ");

    // إذا كان التنسيق "123ابث" (أرقام ثم حروف)
    if (numbers && letters && clean.startsWith(numbers)) {
      return `${numbers} ${spacedLetters}`;
    }

    // إذا كان التنسيق "ابث123" (حروف ثم أرقام)
    if (letters && numbers && clean.startsWith(letters)) {
      return `${spacedLetters} ${numbers}`;
    }

    // إذا كان كله حروف
    if (!numbers && letters) {
      return spacedLetters;
    }

    // إذا كان كله أرقام
    if (numbers && !letters) {
      return numbers;
    }

    return clean;
  };

  // دالة للتعامل مع زر Open Details
  const handleOpenDetails = (plateId: number) => {
    // يمكنك إضافة معرف المقيم إذا كان متوفراً
    // أو الانتقال إلى صفحة المقيمين مباشرة
    router.push("/dashboard/residents");
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0f172a]">
      <Table>
        {/* HEADER */}
        <TableHeader>
          <TableRow className="border-white/10 hover:bg-transparent">
            <TableHead className="w-[50px]" />
            <TableHead className="text-slate-300">Plate Number</TableHead>
            <TableHead className="text-slate-300">Resident Name</TableHead>
            <TableHead className="text-slate-300 text-right">
              Actions
            </TableHead>{" "}
            {/* عمود جديد للأزرار */}
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data.map((plate) => {
            const selected = selectedId === plate.id;

            return (
              <TableRow
                key={plate.id}
                onClick={() => onSelect(plate.id)}
                className={`
                  cursor-pointer border-white/5 transition-all
                  hover:bg-white/5
                  ${selected ? "bg-sky-500/10" : ""}
                `}
              >
                {/* CHECKBOX */}
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={() => onSelect(plate.id)}
                    className="h-4 w-4"
                  />
                </TableCell>

                {/* PLATE NUMBER */}
                <TableCell className="font-medium text-white">
                  {formatPlateNumber(plate.plate_number_full)}
                </TableCell>

                {/* RESIDENT NAME */}
                <TableCell className="text-slate-300">
                  {plate.resident?.full_name || "N/A"}
                </TableCell>

                {/* ACTIONS - زر Open Details */}
                <TableCell className="text-right">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // منع انتشار الحدث لصف الجدول
                      handleOpenDetails(plate.id);
                    }}
                    className="px-3 py-1.5 bg-sky-500 hover:bg-sky-400 text-white text-sm rounded-lg transition-colors duration-200"
                  >
                    Open Details
                  </button>
                </TableCell>
              </TableRow>
            );
          })}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={4} // تحديث عدد الأعمدة إلى 4
                className="py-10 text-center text-slate-500"
              >
                No plates found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
