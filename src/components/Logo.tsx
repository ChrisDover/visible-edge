type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, { box: string; dot: string; ring: string }> = {
  sm: { box: "w-7 h-7", dot: "w-1.5 h-1.5", ring: "-inset-1" },
  md: { box: "w-9 h-9", dot: "w-2 h-2", ring: "-inset-1.5" },
  lg: { box: "w-11 h-11", dot: "w-2 h-2", ring: "-inset-1.5" },
};

export function Logo({ size = "md" }: { size?: Size }) {
  const s = sizeMap[size];
  return (
    <div className="relative inline-flex items-center justify-center">
      <div
        className={`${s.box} border border-accent-amber/70 rotate-45 flex items-center justify-center relative`}
      >
        <div className={`${s.dot} bg-accent-amber -rotate-45 pulse-dot`} />
        <div
          className={`absolute ${s.ring} border border-accent-amber/20 pointer-events-none`}
        />
      </div>
    </div>
  );
}
