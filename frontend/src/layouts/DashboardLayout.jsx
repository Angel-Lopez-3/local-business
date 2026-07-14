import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { logout, user } = useAuth();

  return (
    <div className="min-h-screen flex bg-slate-100">
      <aside className="w-64 bg-slate-900 text-white p-5">
        <h1 className="text-2xl font-bold mb-8">
          Local Business
        </h1>

        <nav className="space-y-2">
          <Link
            to="/dashboard"
            className="block p-3 rounded hover:bg-slate-800"
          >
            Dashboard
          </Link>

          <Link
            to="/businesses"
            className="block p-3 rounded hover:bg-slate-800"
          >
            Negocios
          </Link>

          <Link
            to="/categories"
            className="block p-3 rounded hover:bg-slate-800"
          >
            Categorías
          </Link>

          <Link
            to="/sectors"
            className="block p-3 rounded hover:bg-slate-800"
          >
            Sectores
          </Link>

          <Link
            to="/my-business"
            className="block p-3 rounded hover:bg-slate-800"
          >
            Mi Negocio
          </Link>

        </nav>
      </aside>

      <main className="flex-1">
        <header className="bg-white shadow px-6 py-4 flex justify-between">
          <div>
            Bienvenido {user?.email}
          </div>

          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Salir
          </button>
        </header>

        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}