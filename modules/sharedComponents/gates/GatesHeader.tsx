"use client";

import { AlertCircle, Moon, Sun, Globe2, LogOut } from "lucide-react";

import { useTheme } from "next-themes";

export default function GatesHeader() {
  const { resolvedTheme, setTheme } = useTheme();

  const isDark = resolvedTheme === "dark";

  return (
    <header
      className="
        flex
        min-h-[74px]
        items-center
        justify-between
        rounded-[24px]
        bg-white
        px-5
        py-4
        shadow-sm
        dark:bg-slate-900
        md:px-7
      "
    >
      {/* Page title */}
      <div>
        <h1
          className="
            text-xl
            font-bold
            text-slate-900
            dark:text-white
            md:text-[21px]
          "
        >
          Gates
        </h1>

        <p
          className="
            mt-0.5
            text-sm
            font-medium
            text-slate-400
          "
        >
          Manage system gates
        </p>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Fault */}
        <div
          className="
            hidden
            items-center
            gap-2
            rounded-full
            bg-rose-50
            px-4
            py-2
            text-sm
            font-semibold
            text-rose-500
            dark:bg-rose-500/10
            md:flex
          "
        >
          <span className="h-2 w-2 rounded-full bg-rose-500" />

          <span>1 fault</span>
        </div>

        {/* Time */}
        <div
          className="
            hidden
            items-center
            gap-2
            rounded-full
            bg-slate-100
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-600
            dark:bg-slate-800
            dark:text-slate-300
            md:flex
          "
        >
          <span className="h-2 w-2 rounded-full bg-cyan-400" />

          <span>14:52</span>
        </div>

        {/* Theme */}
        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle theme"
          suppressHydrationWarning
          className="
            flex
            h-10
            items-center
            gap-2
            rounded-full
            bg-slate-100
            px-3
            transition
            hover:bg-slate-200
            dark:bg-slate-800
            dark:hover:bg-slate-700
          "
        >
          {/* Sun */}
          <div
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              transition
              ${
                !isDark
                  ? "bg-white text-amber-400 shadow-sm"
                  : "bg-slate-700 text-slate-300"
              }
            `}
          >
            <Sun size={16} />
          </div>

          {/* Moon */}
          <div
            className={`
              flex
              h-7
              w-7
              items-center
              justify-center
              rounded-full
              transition
              ${isDark ? "bg-white text-slate-700 shadow-sm" : "text-slate-400"}
            `}
          >
            <Moon size={15} />
          </div>
        </button>

        {/* Language */}
        <button
          type="button"
          className="
            hidden
            h-10
            items-center
            gap-2
            rounded-full
            bg-slate-100
            px-4
            text-sm
            font-semibold
            text-slate-600
            hover:bg-slate-200
            dark:bg-slate-800
            dark:text-slate-300
            md:flex
          "
        >
          <Globe2 size={16} />

          <span>EN / ع</span>
        </button>

        {/* Avatar */}
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-slate-900
            text-sm
            font-bold
            text-white
            dark:bg-cyan-500
          "
        >
          AK
        </div>

        {/* Logout */}
        <button
          type="button"
          className="
            hidden
            items-center
            gap-1
            text-sm
            font-semibold
            text-rose-500
            hover:text-rose-600
            md:flex
          "
        >
          <span>Logout</span>

          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
}
