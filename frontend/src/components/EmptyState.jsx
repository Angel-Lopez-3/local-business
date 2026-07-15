export default function EmptyState({ icon, title, description, action }) {
  return (
    <div className="card-surface flex flex-col items-center justify-center text-center px-6 py-14">
      {icon && (
        <div className="h-12 w-12 rounded-full bg-brand-50 text-brand-500 flex items-center justify-center mb-4">
          {icon}
        </div>
      )}

      <h3 className="font-display font-semibold text-ink-800">{title}</h3>

      {description && (
        <p className="text-sm text-ink-500 mt-1.5 max-w-sm">{description}</p>
      )}

      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
