"use client";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="
        min-h-screen
        bg-[#e8eef7]

        dark:bg-[#071528]
      "
    >
      {/* =====================================================
          SIDEBAR
      ====================================================== */}

      <Sidebar />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        className="
          min-h-screen

          md:pl-[152px]
          md:pr-5
          md:py-4
          lg:pl-[176px]
          lg:pr-8
          lg:py-5
        "
      >
        {/* ===================================================
            TOPBAR
        ==================================================== */}

        <Topbar />

        {/* ===================================================
            PAGE CONTENT
        ==================================================== */}

        <main
          className="
            mt-4
            min-w-0
            pb-8
            px-1
            lg:px-0
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}
