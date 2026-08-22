type StatCardProps = {
  title: string;
  value: number;
  dark?: boolean;
};

function StatCard({ title, value, dark = false }: StatCardProps) {
  return (
    <div
      className={`
        min-h-[105px]
        flex-1
        rounded-[22px]
        p-5
        transition-all

        ${
          dark
            ? "bg-[#173653] text-white shadow-[0_8px_22px_rgba(20,52,91,0.14)]"
            : "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
        }
      `}
    >
      <p
        className={`
          text-xs
          font-bold
          uppercase
          tracking-[0.15em]
          ${dark ? "text-slate-400" : "text-slate-400 dark:text-slate-500"}
        `}
      >
        {title}
      </p>

      <p
        className={`
          mt-2
          text-[32px]
          font-bold
          leading-none
          ${dark ? "text-white" : ""}
        `}
      >
        {value}
      </p>
    </div>
  );
}

export default function GateStats() {
  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Gates" value={4} dark />

      <StatCard title="Entry Gates" value={3} />

      <StatCard title="Exit Gates" value={1} />

      <StatCard title="Offline" value={1} />
    </section>
  );
}
