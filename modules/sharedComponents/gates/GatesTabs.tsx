"use client";

import Link from "next/link";

const tabs = [
  {
    label: "Real Time Gates",
    href: "/gates/realtime",
  },
  {
    label: "Gates",
    href: "/gates",
  },
  {
    label: "Cameras",
    href: "/cameras",
  },
  {
    label: "Plates",
    href: "/plates",
  },
];

export default function GatesTabs() {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1">
      {tabs.map((tab, index) => {
        const active = index === 1;

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`
              shrink-0
              rounded-full
              px-5
              py-2.5
              text-sm
              font-semibold
              transition-all
              
              ${
                active
                  ? "bg-slate-900 text-white shadow-sm dark:bg-cyan-500"
                  : "bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
              }
            `}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
