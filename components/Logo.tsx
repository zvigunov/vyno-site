interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "light" | "dark";
}

const sizes = {
  sm: { text: "text-2xl", dot: "text-[8px]",  sub: "text-[7px]",  tracking: "tracking-[3px]" },
  md: { text: "text-4xl", dot: "text-[10px]", sub: "text-[9px]",  tracking: "tracking-[3px]" },
  lg: { text: "text-6xl", dot: "text-sm",     sub: "text-[10px]", tracking: "tracking-[4px]" },
  xl: { text: "text-8xl", dot: "text-lg",     sub: "text-xs",     tracking: "tracking-[5px]" },
};

export function Logo({ size = "md", variant = "dark" }: LogoProps) {
  const s = sizes[size];
  const ynoColor    = variant === "light" ? "#0D0D0D"                 : "#FAF6EE";
  const subtitleClr = variant === "light" ? "rgba(13,13,13,0.3)"      : "rgba(250,246,238,0.25)";

  return (
    <div className="flex flex-col items-center select-none">
      <div className={`font-title font-bold ${s.tracking} ${s.text} leading-none`}>
        <span style={{ color: "#C9A84C" }}>V</span>
        <span className={`${s.dot} align-middle`} style={{ color: "#C9A84C", margin: "0 1px" }}>
          •
        </span>
        <span style={{ color: ynoColor }}>YNO</span>
      </div>
      <div
        className={`uppercase mt-1 ${s.sub}`}
        style={{ color: subtitleClr, letterSpacing: "4px", fontFamily: "var(--font-inter, sans-serif)" }}
      >
        Turism Vitivinicol
      </div>
    </div>
  );
}
