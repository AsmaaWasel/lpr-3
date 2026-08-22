"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  Users,
  Camera,
  ShieldCheck,
  ArrowUpRight,
  Radio,
  TrendingUp,
  Clock,
  AlertTriangle,
} from "lucide-react";

import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
} from "recharts";

export default function DashboardHome() {
  const [entrances, setEntrances] = useState(1284);
  const [peakHourTraffic, setPeakHourTraffic] = useState(142);

  const hourlyTrafficData = [
    { time: "06:00 AM", Cars: 45, Residents: 30 },
    { time: "08:00 AM", Cars: 180, Residents: 140 },
    { time: "10:00 AM", Cars: 95, Residents: 70 },
    { time: "12:00 PM", Cars: 120, Residents: 85 },
    { time: "02:00 PM", Cars: 210, Residents: 165 },
    { time: "04:00 PM", Cars: 150, Residents: 110 },
    { time: "06:00 PM", Cars: 85, Residents: 60 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setEntrances((prev) => prev + Math.floor(Math.random() * 2));
      if (Math.random() > 0.7) {
        setPeakHourTraffic((prev) => prev + 1);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-transparent font-sans text-[#172b48] p-1 md:p-2 overflow-hidden dark:text-[#eef6ff]">
      <div className="relative z-10 mx-auto max-w-7xl space-y-5">
        {/* الهيدر الرئيسي */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 rounded-[22px] bg-white px-6 py-5 shadow-[0_8px_24px_rgba(20,52,91,0.06)] dark:bg-[#102641]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight">
              SmartGate{" "}
              <span className="text-sky-400">Statistical Dashboard</span>
            </h1>
            <p className="text-[#7890b2] dark:text-[#91a9ca] text-2xl mt-1">
              Real-time behavior tracking, safety indices, and facility load
              management.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-md">
            <Clock className="h-5 w-5 text-sky-400 animate-spin-slow" />
            <div className="text-right">
              <div className="text-2xl font-mono font-bold">LIVE TELEMETRY</div>
              <div className="text-[10px] text-[#7890b2] dark:text-[#91a9ca] uppercase tracking-wider">
                SYSTEM SYNCHRONIZED
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-[22px] border border-transparent bg-white p-5 shadow-[0_8px_24px_rgba(20,52,91,0.06)] dark:border-white/5 dark:bg-[#102641]">
            <div className="flex justify-between items-start text-[#7890b2] dark:text-[#91a9ca] mb-3">
              <Users className="h-5 w-5 text-sky-400" />
              <span className="text-xs font-medium text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3" /> +12%
              </span>
            </div>
            <div className="text-2xl font-bold tracking-tight font-mono">
              {entrances}
            </div>
            <p className="text-xs text-[#7890b2] dark:text-[#91a9ca] font-medium mt-1 uppercase tracking-wider">
              Total Daily Accesses
            </p>
          </div>

          <div className="rounded-[22px] border border-transparent bg-white p-5 shadow-[0_8px_24px_rgba(20,52,91,0.06)] dark:border-white/5 dark:bg-[#102641]">
            <div className="flex justify-between items-start text-[#7890b2] dark:text-[#91a9ca] mb-3">
              <Activity className="h-5 w-5 text-orange-400" />
              <span className="text-[10px] text-[#7890b2] dark:text-[#91a9ca] bg-white/5 px-2 py-0.5 rounded-full">
                Cars / Hr
              </span>
            </div>
            <div className="text-2xl font-bold tracking-tight font-mono">
              {peakHourTraffic}
            </div>
            <p className="text-xs text-[#7890b2] dark:text-[#91a9ca] font-medium mt-1 uppercase tracking-wider">
              Peak Traffic Load
            </p>
          </div>

          <div className="rounded-[22px] border border-transparent bg-white p-5 shadow-[0_8px_24px_rgba(20,52,91,0.06)] dark:border-white/5 dark:bg-[#102641]">
            <div className="flex justify-between items-start text-[#7890b2] dark:text-[#91a9ca] mb-3">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                OPTIMAL
              </span>
            </div>
            <div className="text-2xl font-bold tracking-tight font-mono">
              99.4%
            </div>
            <p className="text-xs text-[#7890b2] dark:text-[#91a9ca] font-medium mt-1 uppercase tracking-wider">
              AI Recognition Accuracy
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 rounded-[22px] border border-transparent bg-white p-6 shadow-[0_8px_24px_rgba(20,52,91,0.06)] dark:border-white/5 dark:bg-[#102641]">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-bold text-2xl">
                  Traffic Distribution Velocity
                </h3>
                <p className="text-xs text-[#7890b2] dark:text-[#91a9ca] mt-0.5">
                  Analysis of patterns between general vehicle entries and
                  residents.
                </p>
              </div>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-sky-400" /> Cars
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />{" "}
                  Residents
                </div>
              </div>
            </div>

            <div className="h-[260px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={hourlyTrafficData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorCars" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorResidents"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#ffffff/5"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={11}
                    tickLine={false}
                  />
                  <YAxis stroke="#64748b" fontSize={11} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0b1329",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "12px",
                      color: "#fff",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Cars"
                    stroke="#38bdf8"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorCars)"
                  />
                  <Area
                    type="monotone"
                    dataKey="Residents"
                    stroke="#6366f1"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorResidents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.04] to-transparent p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <Camera className="text-sky-400 h-7 w-7" />
                <span className="px-2 py-0.5 rounded-md bg-sky-500/10 border border-sky-500/20 text-[9px] text-sky-400 font-bold tracking-widest uppercase">
                  HEURISTIC FEED
                </span>
              </div>
              <h3 className="text-2xl font-bold">Live AI Gateway Stream</h3>
              <p className="text-[#7890b2] dark:text-[#91a9ca] text-xs mt-2 leading-relaxed">
                Our vision node processes license plates and human verification
                layers in less than <b>180ms</b>. Everything is archived
                securely inside the system.
              </p>
            </div>

            <button className="w-full mt-6 flex items-center justify-center gap-2 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold py-3.5 text-xs uppercase tracking-wider transition-all shadow-lg shadow-sky-600/10">
              Launch Live Vision View <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <footer className="flex flex-col sm:flex-row items-center justify-between gap-4 rounded-xl border border-white/5 bg-white/[0.01] px-6 py-4 text-xs text-slate-500">
          <p>
            © 2026 SmartGate Systems Platform • Enterprise Grade Infrastructure
            Security
          </p>
          <div className="flex items-center gap-2 text-sky-400/80">
            <Radio className="h-4 w-4 animate-pulse" />
            <span>All nodes reporting nominal operation states</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
