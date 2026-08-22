"use client";

import { useState } from "react";
import {
  Share2,
  QrCode,
  Loader2,
  Copy,
  Check,
  RotateCcw,
  CalendarDays,
} from "lucide-react";

import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { generateQR } from "@/services/qr";

type QRResponse = {
  qr_image: string;

  building_number?: string;
  resident_id?: number;
  max_uses?: number;

  start_at?: string;
  expiry_date?: string;

  visitor_national_id?: string;
  visitor_phone_number?: string;
  visitor_full_name?: string;
};

export default function QRPage() {
  // =====================================================
  // STATES
  // =====================================================

  const [loading, setLoading] = useState(false);

  const [qrData, setQrData] = useState<QRResponse | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [copied, setCopied] = useState(false);

  // =====================================================
  // FORM STATES
  // =====================================================

  const [buildingNumber, setBuildingNumber] = useState("");

  const [residentId, setResidentId] = useState("");

  const [maxUses, setMaxUses] = useState(1);

  const [visitorFullName, setVisitorFullName] = useState("");

  const [visitorNationalId, setVisitorNationalId] = useState("");

  const [visitorPhoneNumber, setVisitorPhoneNumber] = useState("");

  const [startDate, setStartDate] = useState<Date | undefined>();

  const [expiryDate, setExpiryDate] = useState<Date | undefined>();

  // =====================================================
  // TODAY
  // =====================================================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // =====================================================
  // MAX USES
  // =====================================================

  const handleMaxUsesChange = (value: number) => {
    if (Number.isNaN(value)) return;

    setMaxUses(Math.max(1, value));
  };

  // =====================================================
  // GENERATE QR
  // =====================================================

  const handleGenerate = async () => {
    try {
      setError(null);

      // =========================
      // VALIDATION
      // =========================

      if (!buildingNumber.trim()) {
        setError("Please enter building number.");
        return;
      }

      if (!residentId.trim()) {
        setError("Please enter resident ID.");
        return;
      }

      if (!visitorFullName.trim()) {
        setError("Please enter visitor full name.");
        return;
      }

      if (!visitorNationalId.trim()) {
        setError("Please enter visitor national ID.");
        return;
      }

      if (!visitorPhoneNumber.trim()) {
        setError("Please enter visitor phone number.");
        return;
      }

      if (!startDate) {
        setError("Please select start date.");
        return;
      }

      if (!expiryDate) {
        setError("Please select expiry date.");
        return;
      }

      if (expiryDate < startDate) {
        setError("Expiry date cannot be before start date.");
        return;
      }

      setLoading(true);

      // =====================================================
      // START DATE
      // =====================================================

      const startAt = new Date(startDate);

      startAt.setHours(0, 0, 0, 0);

      // =====================================================
      // EXPIRY DATE
      // =====================================================

      const expiry = new Date(expiryDate);

      expiry.setHours(23, 59, 59, 999);

      // =====================================================
      // PAYLOAD
      // =====================================================

      const payload = {
        building_number: buildingNumber.trim(),

        resident_id: Number(residentId),

        max_uses: maxUses,

        start_at: startAt.toISOString(),

        expiry_date: expiry.toISOString(),

        visitor_national_id: visitorNationalId.trim(),

        visitor_phone_number: visitorPhoneNumber.trim(),

        visitor_full_name: visitorFullName.trim(),
      };

      console.log("QR Payload:", payload);

      // =====================================================
      // API
      // =====================================================

      const data = await generateQR(payload);

      setQrData(data);
    } catch (err) {
      console.error("Generate QR Error:", err);

      setError("Please try again later. Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // RESET
  // =====================================================

  const handleReset = () => {
    setQrData(null);

    setError(null);

    setCopied(false);

    setBuildingNumber("");

    setResidentId("");

    setMaxUses(1);

    setVisitorFullName("");

    setVisitorNationalId("");

    setVisitorPhoneNumber("");

    setStartDate(undefined);

    setExpiryDate(undefined);
  };

  // =====================================================
  // QR IMAGE URL
  // =====================================================

  const getQrImageUrl = () => {
    if (!qrData) return "";

    return `http://127.0.0.1:8000/${qrData.qr_image}`;
  };

  // =====================================================
  // SHARE WHATSAPP
  // =====================================================

  const handleShare = () => {
    if (!qrData) return;

    const imageUrl = getQrImageUrl();

    const message = `SMARTGATE QR Access Code

Building Number: ${qrData.building_number ?? buildingNumber}

Resident ID: ${qrData.resident_id ?? residentId}

Visitor Name: ${qrData.visitor_full_name ?? visitorFullName}

Visitor National ID: ${qrData.visitor_national_id ?? visitorNationalId}

Visitor Phone: ${qrData.visitor_phone_number ?? visitorPhoneNumber}

Start Date: ${startDate ? format(startDate, "dd/MM/yyyy") : "-"}

Expiry Date: ${expiryDate ? format(expiryDate, "dd/MM/yyyy") : "-"}

Max Uses: ${qrData.max_uses ?? maxUses}

${imageUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // =====================================================
  // COPY LINK
  // =====================================================

  const handleCopy = async () => {
    if (!qrData) return;

    const imageUrl = getQrImageUrl();

    try {
      await navigator.clipboard.writeText(imageUrl);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // =====================================================
  // CALENDAR STYLES
  // =====================================================

  const calendarClassNames = {
    months: "text-white",

    month: "space-y-4",

    caption: "flex justify-center pt-1 relative items-center text-white",

    caption_label: "text-white text-base font-semibold",

    nav: "space-x-1 flex items-center",

    button_previous:
      "h-7 w-7 bg-transparent p-0 text-white hover:bg-white/10 rounded-md",

    button_next:
      "h-7 w-7 bg-transparent p-0 text-white hover:bg-white/10 rounded-md",

    month_grid: "w-full border-collapse",

    weekdays: "flex",

    weekday: "text-slate-400 rounded-md w-9 font-normal text-[0.8rem]",

    week: "flex w-full mt-2",

    day: `
      h-9
      w-9
      p-0
      font-normal
      text-white
      hover:bg-sky-500/20
      hover:text-white
      rounded-md
    `,

    day_button: `
      h-9
      w-9
      p-0
      font-normal
      text-white
      hover:bg-sky-500
      hover:text-white
      rounded-md
    `,

    selected:
      "bg-sky-500 text-white hover:bg-sky-500 hover:text-white focus:bg-sky-500 focus:text-white",

    today: "bg-white/10 text-white font-bold",

    outside: "text-slate-600 opacity-50",

    disabled: "text-slate-600 opacity-30 cursor-not-allowed",
  };

  // =====================================================
  // INPUT CLASS
  // =====================================================

  const inputClassName = `
    w-full
    bg-[#020617]
    border
    border-white/10
    rounded-xl
    px-4
    py-3
    text-white
    placeholder:text-slate-600
    outline-none
    focus:border-sky-500
    transition
  `;

  return (
    <div className="space-y-6 pb-28">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div>
        <h1 className="text-2xl font-bold text-white">QR Access Management</h1>

        <p className="text-slate-400 mt-1 text-xl">Generate visitor QR codes</p>
      </div>

      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div
          className="
            bg-red-500/10
            border
            border-red-500/30
            text-red-400
            rounded-xl
            px-4
            py-3
            text-lg
          "
        >
          {error}
        </div>
      )}

      {/* =====================================================
          FORM
      ===================================================== */}

      <div
        className="
          bg-[#0b1120]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        {/* FORM HEADER */}

        <div className="mb-6">
          <h2 className="text-white text-2xl font-semibold">
            Visitor Information
          </h2>

          <p className="text-slate-400 mt-1 text-xl">
            Enter all information to generate the QR code.
          </p>
        </div>

        {/* =====================================================
            FIELDS GRID
        ===================================================== */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-4
          "
        >
          {/* =====================================================
              BUILDING NUMBER
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Building Number
            </label>

            <input
              type="text"
              value={buildingNumber}
              onChange={(e) => setBuildingNumber(e.target.value)}
              placeholder="Building Number"
              className={inputClassName}
            />
          </div>

          {/* =====================================================
              RESIDENT ID
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Resident ID
            </label>

            <input
              type="number"
              value={residentId}
              onChange={(e) => setResidentId(e.target.value)}
              placeholder="Resident ID"
              className={inputClassName}
            />
          </div>

          {/* =====================================================
              MAX USES
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Max Uses
            </label>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleMaxUsesChange(maxUses - 1)}
                disabled={maxUses <= 1}
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-slate-800
                  text-white
                  text-xl
                  hover:bg-slate-700
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  transition
                "
              >
                -
              </button>

              <input
                type="number"
                min={1}
                value={maxUses}
                onChange={(e) => handleMaxUsesChange(Number(e.target.value))}
                className="
                  flex-1
                  min-w-0
                  bg-[#020617]
                  border
                  border-white/10
                  rounded-xl
                  px-4
                  py-3
                  text-center
                  text-white
                  outline-none
                  focus:border-sky-500
                "
              />

              <button
                type="button"
                onClick={() => handleMaxUsesChange(maxUses + 1)}
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-sky-500
                  text-white
                  text-xl
                  hover:bg-sky-400
                  transition
                "
              >
                +
              </button>
            </div>
          </div>

          {/* =====================================================
              VISITOR FULL NAME
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Visitor Full Name
            </label>

            <input
              type="text"
              value={visitorFullName}
              onChange={(e) => setVisitorFullName(e.target.value)}
              placeholder="Visitor Full Name"
              className={inputClassName}
            />
          </div>

          {/* =====================================================
              NATIONAL ID
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Visitor National ID
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={visitorNationalId}
              onChange={(e) => setVisitorNationalId(e.target.value)}
              placeholder="National ID"
              className={inputClassName}
            />
          </div>

          {/* =====================================================
              PHONE
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Visitor Phone Number
            </label>

            <input
              type="tel"
              value={visitorPhoneNumber}
              onChange={(e) => setVisitorPhoneNumber(e.target.value)}
              placeholder="Phone Number"
              className={inputClassName}
            />
          </div>

          {/* =====================================================
              START DATE
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Start Date
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    bg-[#020617]
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    hover:border-sky-500
                    transition
                  "
                >
                  <span className={startDate ? "text-white" : "text-slate-500"}>
                    {startDate
                      ? format(startDate, "dd/MM/yyyy")
                      : "Select start date"}
                  </span>

                  <CalendarDays size={20} className="text-sky-400" />
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-auto
                  p-0
                  bg-[#0f172a]
                  border-white/10
                "
              >
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={(date) => {
                    setStartDate(date);

                    if (date && expiryDate && expiryDate < date) {
                      setExpiryDate(undefined);
                    }
                  }}
                  disabled={(date) => date < today}
                  initialFocus
                  classNames={calendarClassNames}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* =====================================================
              EXPIRY DATE
          ===================================================== */}

          <div>
            <label className="block text-white text-lg font-medium mb-2">
              Expiry Date
            </label>

            <Popover>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    bg-[#020617]
                    border
                    border-white/10
                    rounded-xl
                    px-4
                    py-3
                    text-white
                    hover:border-sky-500
                    transition
                  "
                >
                  <span
                    className={expiryDate ? "text-white" : "text-slate-500"}
                  >
                    {expiryDate
                      ? format(expiryDate, "dd/MM/yyyy")
                      : "Select expiry date"}
                  </span>

                  <CalendarDays size={20} className="text-sky-400" />
                </button>
              </PopoverTrigger>

              <PopoverContent
                align="start"
                className="
                  w-auto
                  p-0
                  bg-[#0f172a]
                  border-white/10
                "
              >
                <Calendar
                  mode="single"
                  selected={expiryDate}
                  onSelect={setExpiryDate}
                  disabled={(date) => {
                    if (date < today) {
                      return true;
                    }

                    if (startDate && date < startDate) {
                      return true;
                    }

                    return false;
                  }}
                  initialFocus
                  classNames={calendarClassNames}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* =====================================================
            GENERATE BUTTON
        ===================================================== */}

        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              bg-sky-500
              hover:bg-sky-400
              active:bg-sky-600
              disabled:opacity-60
              disabled:cursor-not-allowed
              text-white
              px-7
              py-3
              rounded-xl
              shadow-xl
              shadow-sky-500/20
              transition
            "
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <QrCode size={18} />
                Generate QR
              </>
            )}
          </button>
        </div>
      </div>

      {/* =====================================================
          QR RESULT
      ===================================================== */}

      <div
        className="
          bg-[#0b1120]
          border
          border-white/10
          rounded-2xl
          p-6
        "
      >
        {!qrData ? (
          <div
            className="
              h-[400px]
              flex
              flex-col
              items-center
              justify-center
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={80}
                  className="
                    text-sky-500
                    mb-4
                    animate-spin
                  "
                />

                <h2 className="text-white text-2xl font-semibold">
                  Generating QR...
                </h2>

                <p className="text-slate-400 mt-2">Please wait a moment</p>
              </>
            ) : (
              <>
                <QrCode size={80} className="text-slate-600 mb-4" />

                <h2 className="text-white text-2xl font-semibold">
                  No QR Generated
                </h2>

                <p className="text-slate-400 mt-2 text-xl">
                  Fill the information above and generate a QR code
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center">
            {/* =====================================================
                QR IMAGE
            ===================================================== */}

            <div
              className="
                bg-white
                p-5
                rounded-2xl
                shadow-2xl
              "
            >
              <img
                src={getQrImageUrl()}
                alt="QR"
                className="
                  w-[320px]
                  h-[320px]
                  object-contain
                "
              />
            </div>

            {/* =====================================================
                QR INFO
            ===================================================== */}

            <div
              className="
                mt-6
                grid
                grid-cols-1
                sm:grid-cols-2
                lg:grid-cols-4
                gap-4
                w-full
                max-w-5xl
              "
            >
              {/* BUILDING */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">
                  Building Number
                </p>

                <h2 className="text-white text-2xl font-bold mt-2 text-center">
                  {qrData.building_number ?? buildingNumber}
                </h2>
              </div>

              {/* RESIDENT */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">
                  Resident ID
                </p>

                <h2 className="text-white text-2xl font-bold mt-2 text-center">
                  {qrData.resident_id ?? residentId}
                </h2>
              </div>

              {/* MAX USES */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">Max Uses</p>

                <h2 className="text-white text-3xl font-bold mt-2 text-center">
                  {qrData.max_uses ?? maxUses}
                </h2>
              </div>

              {/* VISITOR NAME */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">Visitor</p>

                <h2 className="text-white text-xl font-bold mt-2 text-center truncate">
                  {qrData.visitor_full_name ?? visitorFullName}
                </h2>
              </div>

              {/* NATIONAL ID */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">
                  National ID
                </p>

                <h2 className="text-white text-lg font-bold mt-2 text-center">
                  {qrData.visitor_national_id ?? visitorNationalId}
                </h2>
              </div>

              {/* PHONE */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">Phone</p>

                <h2 className="text-white text-lg font-bold mt-2 text-center">
                  {qrData.visitor_phone_number ?? visitorPhoneNumber}
                </h2>
              </div>

              {/* START DATE */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">Start Date</p>

                <h2 className="text-white text-xl font-bold mt-2 text-center">
                  {startDate ? format(startDate, "dd/MM/yyyy") : "-"}
                </h2>
              </div>

              {/* EXPIRY DATE */}

              <div className="bg-[#020617] border border-white/10 rounded-2xl px-5 py-4">
                <p className="text-slate-400 text-lg text-center">
                  Expiry Date
                </p>

                <h2 className="text-white text-xl font-bold mt-2 text-center">
                  {expiryDate ? format(expiryDate, "dd/MM/yyyy") : "-"}
                </h2>
              </div>
            </div>

            {/* =====================================================
                ACTIONS
            ===================================================== */}

            <div
              className="
                mt-6
                flex
                flex-wrap
                items-center
                justify-center
                gap-3
              "
            >
              {/* WHATSAPP */}

              <button
                onClick={handleShare}
                className="
                  flex
                  items-center
                  gap-2
                  bg-green-500
                  hover:bg-green-400
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  transition
                "
              >
                <Share2 size={18} />
                Share on WhatsApp
              </button>

              {/* COPY */}

              <button
                onClick={handleCopy}
                className="
                  flex
                  items-center
                  gap-2
                  bg-slate-800
                  hover:bg-slate-700
                  text-white
                  px-5
                  py-3
                  rounded-xl
                  transition
                "
              >
                {copied ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} />
                )}

                {copied ? "Copied!" : "Copy Link"}
              </button>

              {/* NEW QR */}

              <button
                onClick={handleReset}
                className="
                  flex
                  items-center
                  gap-2
                  bg-transparent
                  border
                  border-white/10
                  hover:bg-white/5
                  text-slate-300
                  px-5
                  py-3
                  rounded-xl
                  transition
                "
              >
                <RotateCcw size={18} />
                New QR
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
