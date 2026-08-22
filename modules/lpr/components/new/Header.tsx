"use client";

import { Moon, Sun, Globe2, LogOut } from "lucide-react";

import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useAuth } from "@/shared/context/AuthContext";

const normalize = (p: string) => p.split("?")[0].replace(/\/$/, "");

const PAGE_INFO: Record<
  string,
  {
    title: string;
    description: string;
  }
> = {
  "/dashboard": {
    title: "Dashboard",
    description: "Overview of your system",
  },

  "/dashboard/lpr": {
    title: "LPR",
    description: "Manage license plate recognition",
  },

  "/dashboard/lpr/real-time": {
    title: "Real-Time LPR",
    description: "Monitor license plates in real time",
  },

  "/dashboard/lpr/plates": {
    title: "Plates",
    description: "Manage registered license plates",
  },

  "/dashboard/qr": {
    title: "QR",
    description: "Manage QR access and scanning",
  },

  "/dashboard/qr/qr": {
    title: "QR Codes",
    description: "Manage system QR codes",
  },

  "/dashboard/users": {
    title: "Users",
    description: "Manage system users",
  },

  "/dashboard/residents": {
    title: "Residents",
    description: "Manage residents and access",
  },

  "/dashboard/reports": {
    title: "Reports",
    description: "View and manage system reports",
  },

  "/dashboard/reports/lpr": {
    title: "LPR Reports",
    description: "View license plate recognition reports",
  },

  "/dashboard/departments": {
    title: "Departments",
    description: "Manage system departments",
  },
};

export default function Header() {
  const { resolvedTheme, setTheme } = useTheme();
  const { user } = useAuth();
  const pathname = usePathname();

  const current = normalize(pathname);

  const isDark = resolvedTheme === "dark";

  const getPageInfo = () => {
    if (PAGE_INFO[current]) {
      return PAGE_INFO[current];
    }

    if (current.startsWith("/dashboard/lpr")) {
      return {
        title: "LPR",
        description: "Manage license plate recognition",
      };
    }

    if (current.startsWith("/dashboard/qr")) {
      return {
        title: "QR",
        description: "Manage QR access and scanning",
      };
    }

    if (current.startsWith("/dashboard/reports")) {
      return {
        title: "Reports",
        description: "View and manage system reports",
      };
    }

    if (current.startsWith("/dashboard/residents")) {
      return {
        title: "Residents",
        description: "Manage residents and access",
      };
    }

    return {
      title: "Dashboard",
      description: "Overview of your system",
    };
  };

  const page = getPageInfo();

  const username = user?.username || "User";

  const initials = username
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  const handleLogout = () => {
    // لو عندك logout في AuthContext
    // استبدل السطر ده بالدالة الموجودة عندك
    console.log("Logout");
  };

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
      suppressHydrationWarning
    >
      {/* ================= PAGE TITLE ================= */}

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
          {page.title}
        </h1>

        <p
          className="
            mt-0.5
            text-sm
            font-medium
            text-slate-400
          "
        >
          {page.description}
        </p>
      </div>

      {/* ================= RIGHT ACTIONS ================= */}

      <div
        className="
          flex
          items-center
          gap-2

          md:gap-3
        "
      >
        {/* ================= FAULT ================= */}

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
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-rose-500
            "
          />

          <span>1 fault</span>
        </div>

        {/* ================= TIME ================= */}

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
          <span
            className="
              h-2
              w-2
              rounded-full
              bg-cyan-400
            "
          />

          <span>
            {new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* ================= THEME ================= */}

        <button
          type="button"
          onClick={() => setTheme(isDark ? "light" : "dark")}
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
          aria-label="Toggle theme"
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

        {/* ================= LANGUAGE ================= */}

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
          EN / ع
        </button>

        {/* ================= AVATAR ================= */}

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
          {initials || "US"}
        </div>

        {/* ================= LOGOUT ================= */}

        <button
          type="button"
          onClick={handleLogout}
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
