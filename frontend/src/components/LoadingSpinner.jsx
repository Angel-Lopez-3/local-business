export default function LoadingSpinner({ label = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16 text-ink-400">
      <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-ink-200 border-t-brand-500" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
