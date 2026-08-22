"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useAuth } from "@/shared/context/AuthContext";

import {
  LayoutDashboard,
  ScanLine,
  QrCode,
  Users,
  Home,
  BarChart3,
  Folder,
  DoorOpen,
} from "lucide-react";

const normalize = (p: string) => p.split("?")[0].replace(/\/$/, "");

export default function Sidebar() {
  const { user } = useAuth();

  const pathname = usePathname();
  const current = normalize(pathname);

  const role = user?.role;

  // =========================================================
  // NAVIGATION BASED ON ROLE
  // =========================================================

  const navigation =
    role === "superAdmin"
      ? [
          {
            id: "dashboard",
            label: "Dashboard",
            href: "/dashboard",
            icon: LayoutDashboard,
          },
          {
            id: "lpr",
            label: "LPR",
            href: "/dashboard/lpr/real-time",
            icon: ScanLine,
          },
          {
            id: "qr",
            label: "QR",
            href: "/dashboard/qr/qr",
            icon: QrCode,
          },
          {
            id: "users",
            label: "Users",
            href: "/dashboard/users",
            icon: Users,
          },
          {
            id: "residents",
            label: "Residents",
            href: "/dashboard/residents",
            icon: Home,
          },
          {
            id: "reports",
            label: "Reports",
            href: "/dashboard/reports/lpr",
            icon: BarChart3,
          },
          {
            id: "departments",
            label: "Depts",
            href: "/dashboard/departments",
            icon: Folder,
          },
        ]
      : role === "admin"
        ? [
            {
              id: "dashboard",
              label: "Dashboard",
              href: "/dashboard",
              icon: LayoutDashboard,
            },
            {
              id: "lpr",
              label: "LPR",
              href: "/dashboard/lpr",
              icon: ScanLine,
            },
            {
              id: "qr",
              label: "QR",
              href: "/dashboard/qr",
              icon: QrCode,
            },
            {
              id: "residents",
              label: "Residents",
              href: "/dashboard/residents",
              icon: Home,
            },
            {
              id: "users",
              label: "Users",
              href: "/dashboard/users",
              icon: Users,
            },
            {
              id: "reports",
              label: "Reports",
              href: "/dashboard/reports",
              icon: BarChart3,
            },
            {
              id: "departments",
              label: "Depts",
              href: "/dashboard/departments",
              icon: Folder,
            },
          ]
        : [
            {
              id: "qr",
              label: "QR",
              href: "/dashboard/qr/qr",
              icon: QrCode,
            },
          ];

  // =========================================================
  // ACTIVE STATE
  // =========================================================

  const isModuleActive = (id: string, href: string) => {
    switch (id) {
      case "lpr":
        return current.startsWith("/dashboard/lpr");

      case "qr":
        return current.startsWith("/dashboard/qr");

      case "reports":
        return current.startsWith("/dashboard/reports");

      case "residents":
        return current.startsWith("/dashboard/residents");

      case "users":
        return current.startsWith("/dashboard/users");

      case "departments":
        return current.startsWith("/dashboard/departments");

      case "dashboard":
        return current === "/dashboard";

      default:
        return current === href;
    }
  };

  return (
    <aside
      className="
        fixed
        left-5
        top-5
        bottom-5
        z-50

        hidden
        w-[130px]

        flex-col
        items-center

        rounded-[28px]
        font-sans

        bg-white
        py-5

        shadow-[0_12px_35px_rgba(20,52,91,0.08)]

        dark:bg-[#102641]
        dark:shadow-none

            md:flex
      "
    >
      {/* =====================================================
          LOGO
      ====================================================== */}

      <div className="flex flex-col items-center">
        {/* Logo Container */}

        <div
          className="
            flex
            h-12
            w-12
            items-center
            justify-center

            overflow-hidden
            rounded-2xl

            bg-gradient-to-br
            from-cyan-400
            to-sky-500

            shadow-sm
          "
        >
          <Image
            src="/logo.svg"
            alt="Company logo"
            width={42}
            height={42}
            className="
              h-9
              w-9
              object-contain
            "
          />
        </div>

        {/* Brand */}

        <span
          className="
            mt-2
            text-[13px]
            font-bold
            tracking-[0.14em]
            text-cyan-500
          "
        >
          VOOM
        </span>
      </div>

      {/* =====================================================
          NAVIGATION
      ====================================================== */}

      <nav
        className="
          mt-7
          flex
          w-full
          flex-1
          flex-col
          items-center
          gap-2
          overflow-y-auto
          px-2

          scrollbar-none
        "
      >
        {navigation.map((item) => {
          const Icon = item.icon;

          const active = isModuleActive(item.id, item.href);

          return (
            <Link
              key={item.id}
              href={item.href}
              title={item.label}
              className={`
                group
                flex
                w-[94px]
                shrink-0
                flex-col
                items-center
                justify-center
                gap-1.5
                rounded-2xl
                py-3

                transition-all
                duration-200

                ${
                  active
                    ? `
                      bg-[#d9f2fc]
                      text-cyan-500

                      dark:bg-cyan-500/15
                      dark:text-cyan-400
                    `
                    : `
                      text-slate-500

                      hover:bg-slate-100
                      hover:text-slate-800

                      dark:text-slate-400
                      dark:hover:bg-slate-800
                      dark:hover:text-white
                    `
                }
              `}
            >
              <Icon
                size={22}
                strokeWidth={active ? 2.2 : 1.8}
                className="
                  transition-transform
                  duration-200
                  group-hover:scale-105
                "
              />

              <span
                className="
                  max-w-[82px]
                  truncate
                  text-center
                  text-[12px]
                  font-semibold
                "
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* =====================================================
          ONLINE STATUS
      ====================================================== */}

      <div
        className="
          mt-3
          flex
          w-[94px]
          shrink-0
          flex-col
          items-center
          justify-center

          rounded-2xl

          bg-slate-50
          py-4

          dark:bg-slate-800
        "
      >
        {/* Online Icon */}

        <div
          className="
            mb-2
            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-full

            border
            border-cyan-100

            dark:border-cyan-500/20
          "
        >
          <span
            className="
              h-2.5
              w-2.5
              rounded-full
              bg-cyan-400
              shadow-[0_0_8px_rgba(34,211,238,0.6)]
            "
          />
        </div>

        {/* Number */}

        <span
          className="
            text-lg
            font-bold
            text-slate-800

            dark:text-white
          "
        >
          3/4
        </span>

        {/* Status */}

        <span
          className="
            text-[11px]
            font-medium
            text-slate-400
          "
        >
          online
        </span>
      </div>
    </aside>
  );
}
