import type { HTMLAttributes } from "react";

export type LoaderProps = HTMLAttributes<HTMLDivElement> & {
  label?: string;
  size?: "sm" | "md" | "lg";
};

const sizeMap: Record<NonNullable<LoaderProps["size"]>, string> = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-12 w-12 border-4",
};

const Loader = ({ className, label, size = "md", ...props }: LoaderProps) => (
  <div
    className={[
      "flex flex-col items-center justify-center gap-3 text-slate-600",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
    {...props}
  >
    <span
      className={[
        "inline-block animate-spin rounded-full border-black border-t-transparent",
        sizeMap[size],
      ].join(" ")}
    />
    {label && <span className="text-sm font-medium">{label}</span>}
  </div>
);

export default Loader;

