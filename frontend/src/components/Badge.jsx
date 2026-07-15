const variants = {
  brand: "bg-brand-50 text-brand-700 ring-1 ring-inset ring-brand-200",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200",
  rose: "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200",
  ink: "bg-ink-100 text-ink-600 ring-1 ring-inset ring-ink-200",
};

export default function Badge({ children, variant = "ink", icon }) {
  return (
    <span
      className={
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium " +
        (variants[variant] || variants.ink)
      }
    >
      {icon}
      {children}
    </span>
  );
}
