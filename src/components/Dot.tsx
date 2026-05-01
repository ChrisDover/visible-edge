type Status = "green" | "amber" | "red" | "grey";

const colors: Record<Status, string> = {
  green: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]",
  amber: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]",
  red: "bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.6)]",
  grey: "bg-slate-500",
};

export function Dot({ status }: { status: Status }) {
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full pulse-dot ${colors[status]}`}
    />
  );
}
