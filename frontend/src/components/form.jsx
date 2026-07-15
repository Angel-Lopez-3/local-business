// Primitivas de formulario consistentes para toda la app.

export function Field({ label, hint, error, required, children }) {
  return (
    <label className="block">
      {label && (
        <span className="block text-sm font-medium text-ink-700 mb-1.5">
          {label}
          {required && <span className="text-rose-500"> *</span>}
        </span>
      )}

      {children}

      {hint && !error && <span className="block text-xs text-ink-400 mt-1">{hint}</span>}
      {error && <span className="block text-xs text-rose-600 mt-1">{error}</span>}
    </label>
  );
}

const baseInput =
  "w-full rounded-lg border border-ink-200 bg-white px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-100 disabled:bg-ink-50 disabled:text-ink-400";

export function Input(props) {
  return <input {...props} className={`${baseInput} ${props.className || ""}`} />;
}

export function TextArea(props) {
  return <textarea {...props} className={`${baseInput} resize-y ${props.className || ""}`} />;
}

export function Select({ children, ...props }) {
  return (
    <select {...props} className={`${baseInput} ${props.className || ""}`}>
      {children}
    </select>
  );
}

export function Button({ variant = "primary", size = "md", className = "", loading, children, ...props }) {
  const variants = {
    primary: "bg-brand-600 text-white hover:bg-brand-700 focus-visible:ring-brand-300 shadow-sm",
    secondary: "bg-white text-ink-700 border border-ink-200 hover:bg-ink-50 focus-visible:ring-ink-200",
    danger: "bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-300 shadow-sm",
    ghost: "text-ink-600 hover:bg-ink-100 focus-visible:ring-ink-200",
    subtle: "bg-brand-50 text-brand-700 hover:bg-brand-100 focus-visible:ring-brand-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <button
      {...props}
      disabled={props.disabled || loading}
      className={
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition outline-none focus-visible:ring-2 disabled:opacity-50 disabled:cursor-not-allowed " +
        (variants[variant] || variants.primary) +
        " " +
        (sizes[size] || sizes.md) +
        " " +
        className
      }
    >
      {loading && (
        <span className="h-3.5 w-3.5 rounded-full border-2 border-white/40 border-t-white animate-spin" />
      )}
      {children}
    </button>
  );
}

export function PageHeader({ eyebrow, title, description, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1.5">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink-900">{title}</h1>
        {description && <p className="text-ink-500 mt-1.5 max-w-2xl">{description}</p>}
      </div>

      {actions && <div className="flex items-center gap-3 shrink-0">{actions}</div>}
    </div>
  );
}
