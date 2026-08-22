type GatesPaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
};

export default function GatesPagination({
  currentPage,
  totalPages,
  totalItems,
  onPrevious,
  onNext,
}: GatesPaginationProps) {
  return (
    <div
      className="
        flex
        flex-col
        items-center
        justify-between
        gap-3
        border-t
        border-slate-100
        px-6
        py-4
        dark:border-slate-800
        sm:flex-row
      "
    >
      <p className="text-sm font-medium text-slate-400">
        Page{" "}
        <span className="font-bold text-slate-500 dark:text-slate-300">
          {currentPage}
        </span>{" "}
        of{" "}
        <span className="font-bold text-slate-500 dark:text-slate-300">
          {totalPages}
        </span>{" "}
        · {totalItems} gates
      </p>

      <div className="flex gap-2">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-400
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          Prev
        </button>

        <button
          onClick={onNext}
          disabled={currentPage === totalPages}
          className="
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-semibold
            text-slate-600
            transition
            hover:bg-slate-100
            disabled:cursor-not-allowed
            disabled:opacity-50
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300
          "
        >
          Next
        </button>
      </div>
    </div>
  );
}
