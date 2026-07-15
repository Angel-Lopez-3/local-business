import { createContext, useCallback, useContext, useState } from "react";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [state, setState] = useState(null);

  const confirm = useCallback((options) => {
    return new Promise((resolve) => {
      setState({
        title: options?.title || "Confirmar accion",
        message: options?.message || "Estas seguro?",
        confirmText: options?.confirmText || "Confirmar",
        cancelText: options?.cancelText || "Cancelar",
        danger: options?.danger ?? false,
        resolve,
      });
    });
  }, []);

  const handle = (value) => {
    state?.resolve(value);
    setState(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      {state && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink-950/50 backdrop-blur-sm px-4 fade-in">
          <div className="rise-in card-surface w-full max-w-sm p-6">
            <h3 className="text-lg font-semibold text-ink-900">{state.title}</h3>
            <p className="mt-2 text-sm text-ink-600">{state.message}</p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => handle(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-ink-600 hover:bg-ink-100 transition"
              >
                {state.cancelText}
              </button>

              <button
                onClick={() => handle(true)}
                className={
                  "px-4 py-2 rounded-lg text-sm font-medium text-white transition " +
                  (state.danger
                    ? "bg-rose-600 hover:bg-rose-700"
                    : "bg-brand-600 hover:bg-brand-700")
                }
              >
                {state.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);
