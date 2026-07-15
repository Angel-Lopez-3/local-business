import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastContext = createContext(null);

let idCounter = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback(
    (message, variant = "info") => {
      const id = ++idCounter;
      setToasts((current) => [...current, { id, message, variant }]);
      timers.current[id] = setTimeout(() => dismiss(id), 4500);
      return id;
    },
    [dismiss]
  );

  const toast = {
    success: (message) => push(message, "success"),
    error: (message) => push(message, "error"),
    info: (message) => push(message, "info"),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}

      <div className="fixed bottom-5 right-5 z-[100] flex flex-col gap-2 w-[calc(100%-2.5rem)] max-w-sm">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="alert"
            className={
              "rise-in card-surface flex items-start gap-3 px-4 py-3 shadow-lg border-l-4 " +
              (t.variant === "success"
                ? "border-l-brand-500"
                : t.variant === "error"
                ? "border-l-rose-500"
                : "border-l-ink-400")
            }
          >
            <div className="mt-0.5">
              {t.variant === "success" && (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-brand-500">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16Zm3.857-9.62a.75.75 0 00-1.214-.882l-3.483 4.79-1.68-1.68a.75.75 0 00-1.06 1.061l2.32 2.32a.75.75 0 001.137-.089l4-5.52Z" clipRule="evenodd" />
                </svg>
              )}
              {t.variant === "error" && (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-rose-500">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16ZM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22Z" clipRule="evenodd" />
                </svg>
              )}
              {t.variant === "info" && (
                <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 text-ink-500">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0Zm-7-4a1 1 0 11-2 0 1 1 0 012 0ZM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9Z" clipRule="evenodd" />
                </svg>
              )}
            </div>

            <p className="text-sm text-ink-800 flex-1">{t.message}</p>

            <button
              onClick={() => dismiss(t.id)}
              className="text-ink-400 hover:text-ink-700"
              aria-label="Cerrar"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22Z" />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
