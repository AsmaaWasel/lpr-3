"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Resident } from "@/modules/types/resident";
import { toggleResidentStatus } from "@/services/resident";

import {
  Check,
  CheckCircle,
  XCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";

type Props = {
  data: Resident[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  onStatusChange?: (residentId: number, newStatus: Resident["status"]) => void;
};

export default function ResidentTable({
  data,
  selectedId,
  onSelect,
  onStatusChange,
}: Props) {
  const router = useRouter();

  const [loadingId, setLoadingId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // =========================================================
  // STATUS COLOR
  // =========================================================

  const getStatusColor = (status: string) => {
    switch (status) {
      case "allowed":
        return `
          bg-green-50
          text-green-600
          border-green-200

          dark:bg-green-500/10
          dark:text-green-400
          dark:border-green-500/20
        `;

      case "notAllowed":
        return `
          bg-red-50
          text-red-600
          border-red-200

          dark:bg-red-500/10
          dark:text-red-400
          dark:border-red-500/20
        `;

      case "restricted":
        return `
          bg-yellow-50
          text-yellow-600
          border-yellow-200

          dark:bg-yellow-500/10
          dark:text-yellow-400
          dark:border-yellow-500/20
        `;

      case "pending":
        return `
          bg-blue-50
          text-blue-600
          border-blue-200

          dark:bg-blue-500/10
          dark:text-blue-400
          dark:border-blue-500/20
        `;

      case "blocked":
        return `
          bg-red-50
          text-red-600
          border-red-200

          dark:bg-red-500/10
          dark:text-red-400
          dark:border-red-500/20
        `;

      default:
        return `
          bg-slate-100
          text-slate-600
          border-slate-200

          dark:bg-slate-700
          dark:text-slate-300
          dark:border-slate-600
        `;
    }
  };

  // =========================================================
  // TYPE COLOR
  // =========================================================

  const getTypeColor = (type: string) => {
    switch (type?.toLowerCase()) {
      case "owner":
        return `
          bg-purple-50
          text-purple-600

          dark:bg-purple-500/10
          dark:text-purple-400
        `;

      case "tenant":
        return `
          bg-cyan-50
          text-cyan-600

          dark:bg-cyan-500/10
          dark:text-cyan-400
        `;

      case "family":
        return `
          bg-pink-50
          text-pink-600

          dark:bg-pink-500/10
          dark:text-pink-400
        `;

      case "guest":
        return `
          bg-orange-50
          text-orange-600

          dark:bg-orange-500/10
          dark:text-orange-400
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

  // =========================================================
  // FORMAT PHONE NUMBERS
  // =========================================================

  const formatPhoneNumbers = (resident: Resident) => {
    if (
      Array.isArray(resident.phone_numbers) &&
      resident.phone_numbers.length > 0
    ) {
      const phones = resident.phone_numbers
        .map((phone) => {
          if (phone && typeof phone === "object" && "phone_number" in phone) {
            return String(phone.phone_number ?? "").trim();
          }

          if (typeof phone === "string" || typeof phone === "number") {
            return String(phone).trim();
          }

          return "";
        })
        .filter(Boolean);

      if (phones.length > 0) {
        return phones.join(" - ");
      }
    }

    if (resident.phone_number !== null && resident.phone_number !== undefined) {
      const phone = String(resident.phone_number).trim();

      if (phone) {
        return phone;
      }
    }

    return "No phone";
  };

  // =========================================================
  // FORMAT PLATE NUMBERS
  // =========================================================

  const formatPlateNumbers = (resident: Resident) => {
    if (
      Array.isArray(resident.plate_numbers) &&
      resident.plate_numbers.length > 0
    ) {
      const plates = resident.plate_numbers
        .map((plate) => {
          if (
            plate &&
            typeof plate === "object" &&
            "plate_number_full" in plate
          ) {
            let plateNumber = String(plate.plate_number_full ?? "").trim();

            const numbers = plateNumber.match(/^\d+/)?.[0] || "";

            const letters = plateNumber.replace(/^\d+/, "");

            if (letters) {
              const spacedLetters = letters.split("").join(" ");

              plateNumber = spacedLetters + " " + numbers;
            }

            return plateNumber;
          }

          if (typeof plate === "string" || typeof plate === "number") {
            let plateNumber = String(plate).trim();

            const numbers = plateNumber.match(/^\d+/)?.[0] || "";

            const letters = plateNumber.replace(/^\d+/, "");

            if (letters) {
              const spacedLetters = letters.split("").join(" ");

              plateNumber = spacedLetters + " " + numbers;
            }

            return plateNumber;
          }

          return "";
        })
        .filter(Boolean);

      if (plates.length > 0) {
        return plates;
      }
    }

    return [];
  };

  // =========================================================
  // TOGGLE STATUS
  // =========================================================

  const handleToggleStatus = async (resident: Resident) => {
    if (loadingId === resident.id) return;

    setLoadingId(resident.id);
    setError(null);

    try {
      const newStatus = resident.status === "allowed" ? false : true;

      const result = await toggleResidentStatus(resident.id, newStatus);

      if (onStatusChange) {
        onStatusChange(resident.id, result.status);
      }
    } catch (err) {
      console.error("Failed to toggle status:", err);

      setError(`Failed to update status for ${resident.full_name}`);

      setTimeout(() => {
        setError(null);
      }, 3000);
    } finally {
      setLoadingId(null);
    }
  };

  // =========================================================
  // NAVIGATE TO PLATES
  // =========================================================

  const handleNavigateToPlates = (e: React.MouseEvent, residentId: number) => {
    e.stopPropagation();

    router.push(`/dashboard/lpr/plates?residentId=${residentId}`);
  };

  // =========================================================
  // NAVIGATE TO RESIDENT DETAILS
  // =========================================================

  const handleNavigateToResident = (residentId: number) => {
    router.push(`/dashboard/residents/${residentId}`);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="w-full space-y-3">
      {/* =====================================================
          ERROR
      ====================================================== */}

      {error && (
        <div
          className="
            rounded-xl
            border
            border-red-200
            bg-red-50
            px-4
            py-3
            text-sm
            font-medium
            text-red-600

            dark:border-red-500/20
            dark:bg-red-500/10
            dark:text-red-400
          "
        >
          {error}
        </div>
      )}

      {/* =====================================================
          TABLE CONTAINER
      ====================================================== */}

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
          {/* =================================================
              HEADER
          ================================================== */}

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
              {/* SELECT */}

              <TableHead className="w-[65px] px-6 py-4">
                <span className="sr-only">Select</span>
              </TableHead>

              {/* FULL NAME */}

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
                  Full Name
                </span>
              </TableHead>

              {/* PHONE */}

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
                  Phone
                </span>
              </TableHead>

              {/* NATIONAL ID */}

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
                  National ID
                </span>
              </TableHead>

              {/* TYPE */}

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
                  Type
                </span>
              </TableHead>

              {/* PLATES */}

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
                  Plate Numbers
                </span>
              </TableHead>

              {/* STATUS */}

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
                  Status
                </span>
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* =================================================
              BODY
          ================================================== */}

          <TableBody>
            {data.map((resident) => {
              const selected = selectedId === resident.id;

              const isLoading = loadingId === resident.id;

              const isAllowed = resident.status === "allowed";

              const plates = formatPlateNumbers(resident);

              return (
                <TableRow
                  key={resident.id}
                  className={`
                    border-t
                    border-slate-100
                    transition-colors

                    hover:bg-slate-50

                    dark:border-slate-800
                    dark:hover:bg-slate-800/60

                    ${selected ? "bg-cyan-50/60 dark:bg-cyan-500/10" : ""}
                  `}
                >
                  {/* =========================================
                      SELECT
                  ========================================== */}

                  <TableCell className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => onSelect(resident.id)}
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

                              hover:border-cyan-400

                              dark:border-slate-600
                              dark:bg-slate-800
                            `
                        }
                      `}
                      aria-label={`Select ${resident.full_name}`}
                    >
                      {selected && <Check size={13} strokeWidth={3} />}
                    </button>
                  </TableCell>

                  {/* =========================================
                      FULL NAME
                  ========================================== */}

                  <TableCell className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => handleNavigateToResident(resident.id)}
                      className="
                        text-left
                        text-sm
                        font-bold
                        text-slate-800
                        transition-colors

                        hover:text-cyan-500

                        dark:text-white
                        dark:hover:text-cyan-400
                      "
                    >
                      {resident.full_name}
                    </button>
                  </TableCell>

                  {/* =========================================
                      PHONE
                  ========================================== */}

                  <TableCell
                    className="
                      px-6
                      py-5
                      text-sm
                      font-medium
                      text-slate-600

                      dark:text-slate-300
                    "
                  >
                    {formatPhoneNumbers(resident)}
                  </TableCell>

                  {/* =========================================
                      NATIONAL ID
                  ========================================== */}

                  <TableCell
                    className="
                      px-6
                      py-5
                    "
                  >
                    <span
                      className="
                        whitespace-nowrap
                        font-mono
                        text-sm
                        font-semibold
                        text-slate-600

                        dark:text-slate-300
                      "
                    >
                      {resident.national_id ?? "-"}
                    </span>
                  </TableCell>

                  {/* =========================================
                      TYPE
                  ========================================== */}

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

                        ${getTypeColor(resident.type)}
                      `}
                    >
                      {resident.type}
                    </span>
                  </TableCell>

                  {/* =========================================
                      PLATE NUMBERS
                  ========================================== */}

                  <TableCell className="px-6 py-5">
                    {plates.length > 0 ? (
                      <div className="flex flex-col gap-1.5">
                        {plates.map((plate, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={(e) =>
                              handleNavigateToPlates(e, resident.id)
                            }
                            className="
                                group
                                inline-flex
                                w-fit
                                items-center
                                gap-2
                                rounded-lg

                                border
                                border-emerald-200

                                bg-emerald-50

                                px-3
                                py-1.5

                                font-mono
                                text-xs
                                font-bold
                                tracking-wide
                                text-emerald-600

                                transition-all

                                hover:border-emerald-300
                                hover:bg-emerald-100
                                hover:text-emerald-700

                                dark:border-emerald-500/20
                                dark:bg-emerald-500/10
                                dark:text-emerald-400
                                dark:hover:bg-emerald-500/20
                              "
                            dir="ltr"
                          >
                            <span>🚗</span>

                            <span>{plate}</span>

                            <ExternalLink
                              className="
                                  h-3.5
                                  w-3.5
                                  opacity-0
                                  transition-opacity

                                  group-hover:opacity-100
                                "
                            />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <span
                        className="
                          text-sm
                          font-medium
                          text-slate-400
                        "
                      >
                        No plates
                      </span>
                    )}
                  </TableCell>

                  {/* =========================================
                      STATUS
                  ========================================== */}

                  <TableCell className="px-6 py-5">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(resident)}
                      disabled={isLoading}
                      className={`
                        inline-flex
                        min-w-[110px]
                        items-center
                        justify-center
                        gap-2

                        rounded-lg
                        border

                        px-3
                        py-1.5

                        text-[11px]
                        font-bold

                        transition-all

                        ${getStatusColor(resident.status)}

                        ${
                          isLoading
                            ? "cursor-not-allowed opacity-50"
                            : "hover:scale-[1.02]"
                        }
                      `}
                    >
                      {isLoading ? (
                        <>
                          <Loader2
                            className="
                              h-4
                              w-4
                              animate-spin
                            "
                          />

                          <span>Updating...</span>
                        </>
                      ) : (
                        <>
                          {isAllowed ? (
                            <CheckCircle className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}

                          <span>{resident.status}</span>
                        </>
                      )}
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}

            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {data.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="
                    h-40
                    text-center
                    text-sm
                    font-medium
                    text-slate-400
                  "
                >
                  No residents found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
