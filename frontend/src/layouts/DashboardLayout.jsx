import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Avatar from "../components/Avatar";
import { roleLabel } from "../utils/roles";

import {
  IconHome,
  IconStore,
  IconGrid,
  IconMapPin,
  IconHeart,
  IconUser,
  IconUsers,
  IconLogOut,
  IconShield,
  IconFlag,
  IconMenu,
  IconX,
  IconSparkles,
} from "../components/icons";

const navItem =
  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition";

function NavItem({ to, icon, children, end }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        navItem +
        " " +
        (isActive
          ? "bg-brand-500/15 text-white"
          : "text-ink-300 hover:bg-white/5 hover:text-white")
      }
    >
      {icon}
      {children}
    </NavLink>
  );
}

export default function DashboardLayout() {
  const { logout, user, isAdmin, isBusiness } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.info("Sesion cerrada.");
    navigate("/login");
  };

  const fullName = `${user?.first_name || ""} ${user?.last_name || ""}`.trim();

  const sidebarContent = (
    <>
      <div className="px-2 mb-8 flex items-center gap-2.5">
        <div className="h-9 w-9 rounded-xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-900/30">
          <IconSparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="font-display font-bold text-white leading-tight">Localia</p>
          <p className="text-[11px] text-ink-400 leading-tight">Directorio de negocios</p>
        </div>
      </div>

      <nav className="space-y-1 flex-1 overflow-y-auto scrollbar-thin">
        <p className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5 mt-2">
          General
        </p>
        <NavItem to="/dashboard" icon={<IconHome className="h-5 w-5" />}>
          Panel principal
        </NavItem>
        <NavItem to="/businesses" icon={<IconStore className="h-5 w-5" />}>
          Negocios
        </NavItem>
        <NavItem to="/categories" icon={<IconGrid className="h-5 w-5" />}>
          Categorias
        </NavItem>
        <NavItem to="/sectors" icon={<IconMapPin className="h-5 w-5" />}>
          Sectores
        </NavItem>
        <NavItem to="/favorites" icon={<IconHeart className="h-5 w-5" />}>
          Favoritos
        </NavItem>

        {isBusiness && (
          <>
            <p className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5 mt-5">
              Mi negocio
            </p>
            <NavItem to="/my-business" icon={<IconStore className="h-5 w-5" />}>
              Panel del negocio
            </NavItem>
          </>
        )}

        {!isBusiness && !isAdmin && (
          <>
            <p className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5 mt-5">
              Mi negocio
            </p>
            <NavItem to="/businesses/create" icon={<IconStore className="h-5 w-5" />}>
              Registrar negocio
            </NavItem>
          </>
        )}

        {isAdmin && (
          <>
            <p className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5 mt-5">
              Administracion
            </p>
            <NavItem to="/admin/businesses" icon={<IconShield className="h-5 w-5" />}>
              Negocios
            </NavItem>
            <NavItem to="/admin/users" icon={<IconUsers className="h-5 w-5" />}>
              Usuarios
            </NavItem>
            <NavItem to="/admin/categories" icon={<IconGrid className="h-5 w-5" />}>
              Categorias
            </NavItem>
            <NavItem to="/admin/sectors" icon={<IconMapPin className="h-5 w-5" />}>
              Sectores
            </NavItem>
            <NavItem to="/admin/reports" icon={<IconFlag className="h-5 w-5" />}>
              Reportes
            </NavItem>
          </>
        )}

        <p className="px-3.5 text-[11px] font-semibold uppercase tracking-wider text-ink-500 mb-1.5 mt-5">
          Cuenta
        </p>
        <NavItem to="/profile" icon={<IconUser className="h-5 w-5" />}>
          Mi perfil
        </NavItem>
      </nav>

      <button
        onClick={handleLogout}
        className={navItem + " text-ink-300 hover:bg-rose-500/10 hover:text-rose-300 w-full mt-2"}
      >
        <IconLogOut className="h-5 w-5" />
        Cerrar sesion
      </button>
    </>
  );

  return (
    <div className="min-h-screen bg-ink-50 lg:flex">
      <aside className="hidden lg:flex lg:w-72 lg:flex-col bg-ink-950 px-4 py-6 sticky top-0 h-screen">
        {sidebarContent}
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink-950/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative z-10 w-72 h-full bg-ink-950 px-4 py-6 flex flex-col fade-in">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-5 right-4 text-ink-400 hover:text-white"
            >
              <IconX className="h-5 w-5" />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-ink-100 px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-ink-600 hover:text-ink-900"
          >
            <IconMenu className="h-6 w-6" />
          </button>

          <div className="hidden lg:block" />

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-ink-800 leading-tight">
                {fullName || user?.email}
              </p>
              <p className="text-xs text-ink-400 leading-tight">{roleLabel(user?.role?.name)}</p>
            </div>
            <Avatar src={user?.profile_photo} name={fullName || user?.email} />
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
