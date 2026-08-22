"use client";

import { useState } from "react";
import { Share2, QrCode, Loader2, Copy, Check, RotateCcw } from "lucide-react";

import { generateQR } from "@/services/qr";

export default function QRPage() {
  const [loading, setLoading] = useState(false);
  const [qrData, setQrData] = useState<QRResponse | null>(null);
  const [maxUses, setMaxUses] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // =========================
  // GENERATE QR
  // =========================
  const handleGenerate = async () => {
    try {
      setLoading(true);
      setError(null);

      // عدلي حسب شكل الـ API عندك
      const data = await generateQR({
        max_uses: maxUses,
      });

      setQrData(data);
    } catch (err) {
      console.log(err);
      setError("Please try again later. Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQrData(null);
    setError(null);
    setCopied(false);
  };

  // =========================
  // SHARE TO WHATSAPP ONLY
  // =========================
  const handleShare = () => {
    if (!qrData) return;

    const imageUrl = `http://127.0.0.1:8000/${qrData.qr_image}`;

    const message = `SMARTGATE QR Access Code\n\n${imageUrl}`;

    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  // =========================
  // COPY LINK
  // =========================
  const handleCopy = async () => {
    if (!qrData) return;

    const imageUrl = `http://127.0.0.1:8000/${qrData.qr_image}`;

    try {
      await navigator.clipboard.writeText(imageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMaxUsesChange = (value: number) => {
    if (Number.isNaN(value)) return;
    setMaxUses(Math.max(1, value));
  };

  return (
    <div className="space-y-6 pb-28">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            QR Access Management
          </h1>

          <p className="text-slate-400 mt-1 text-2xl">
            Generate visitor QR codes
          </p>
        </div>
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 rounded-xl px-4 py-3 text-2xl">
          {error}
        </div>
      )}

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-2xl">
          <p className="text-slate-400 text-2xl">Module</p>

          <h2 className="text-white text-2xl font-semibold mt-2">
            QR Security
          </h2>
        </div>

        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-2xl">
          <p className="text-slate-400 text-2xl">Feature</p>

          <h2 className="text-white text-2xl font-semibold mt-2">
            QR Generation
          </h2>
        </div>

        {/* MAX USES INPUT */}
        <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 text-2xl">
          <p className="text-slate-400 text-2xl mb-3">Max Uses</p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleMaxUsesChange(maxUses - 1)}
              disabled={maxUses <= 1}
              className="w-10 h-10 rounded-lg bg-slate-800 text-white hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              -
            </button>

            <input
              type="number"
              min={1}
              value={maxUses}
              onChange={(e) => handleMaxUsesChange(Number(e.target.value))}
              className="flex-1 bg-[#020617] border border-white/10 rounded-xl px-4 py-2 text-center text-white outline-none focus:border-sky-500 transition"
            />

            <button
              onClick={() => handleMaxUsesChange(maxUses + 1)}
              className="w-10 h-10 rounded-lg bg-sky-500 text-white hover:bg-sky-400 transition"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* QR CARD */}
      <div className="bg-[#0b1120] border border-white/10 rounded-2xl p-6">
        {!qrData ? (
          <div className="h-[500px] flex flex-col items-center justify-center">
            {loading ? (
              <>
                <Loader2 size={80} className="text-sky-500 mb-4 animate-spin" />
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
                <p className="text-slate-400 mt-2">Generate a new QR code</p>
              </>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            {/* QR IMAGE */}
            <div className="bg-white p-5 rounded-2xl shadow-2xl">
              <img
                src={`http://127.0.0.1:8000/${qrData.qr_image}`}
                alt="QR"
                className="w-[320px] h-[320px] object-contain"
              />
            </div>

            {/* GENERATED MAX USES */}
            <div className="mt-6 bg-[#020617] border border-white/10 rounded-2xl px-6 py-4">
              <p className="text-slate-400 text-2xl text-center">Max Uses</p>

              <h2 className="text-white text-4xl font-bold mt-2 text-center">
                {qrData.max_uses}
              </h2>
            </div>

            {/* ACTIONS */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-white px-5 py-3 rounded-xl transition"
              >
                <Share2 size={18} />
                Share on WhatsApp
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-3 rounded-xl transition"
              >
                {copied ? (
                  <Check size={18} className="text-green-400" />
                ) : (
                  <Copy size={18} />
                )}
                {copied ? "Copied!" : "Copy Link"}
              </button>

              <button
                onClick={handleReset}
                className="flex items-center gap-2 bg-transparent border border-white/10 hover:bg-white/5 text-slate-300 px-5 py-3 rounded-xl transition"
              >
                <RotateCcw size={18} />
                New QR
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FLOATING GENERATE BUTTON — ثابت في الشاشة أثناء السكرول */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="
  fixed bottom-6 left-[295px] z-50
  flex items-center justify-center gap-2
  bg-sky-500 hover:bg-sky-400 active:bg-sky-600
  disabled:opacity-60 disabled:cursor-not-allowed
  text-white px-6 py-4 rounded-2xl
  shadow-2xl shadow-sky-500/30
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
  );
}
