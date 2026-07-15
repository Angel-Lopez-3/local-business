import { useEffect, useState } from "react";

import {
  getUsersRequest,
  searchUsersRequest,
  activateUserRequest,
  deactivateUserRequest,
  updateUserByAdminRequest,
} from "../../api/userApi";
import { getRolesRequest } from "../../api/roleApi";

import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { extractFieldErrors } from "../../utils/media";
import { roleLabel } from "../../utils/roles";

import { PageHeader, Input, Select } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";

import { IconUsers, IconSearch } from "../../components/icons";

export default function AdminUsers() {
  const toast = useToast();
  const confirm = useConfirm();

  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    loadUsers();
    loadRoles();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsersRequest();
      setUsers(response.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  };

  const loadRoles = async () => {
    try {
      const response = await getRolesRequest();
      setRoles(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value) {
      loadUsers();
      return;
    }

    try {
      const response = await searchUsersRequest(value);
      setUsers(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleActive = async (user) => {
    const ok = await confirm({
      title: user.is_active ? "Desactivar usuario" : "Activar usuario",
      message: `Estas seguro que deseas ${user.is_active ? "desactivar" : "activar"} a ${user.first_name} ${user.last_name}?`,
      confirmText: user.is_active ? "Desactivar" : "Activar",
      danger: user.is_active,
    });
    if (!ok) return;

    setActingId(user.id);
    try {
      const action = user.is_active ? deactivateUserRequest : activateUserRequest;
      await action(user.id);
      toast.success(`Usuario ${user.is_active ? "desactivado" : "activado"}.`);
      loadUsers();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setActingId(null);
    }
  };

  const changeRole = async (user, roleId) => {
    setActingId(user.id);
    try {
      await updateUserByAdminRequest(user.id, { role_id: Number(roleId) });
      toast.success("Rol actualizado.");
      loadUsers();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setActingId(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Administracion"
        title="Usuarios"
        description="Gestiona cuentas, roles y accesos de la plataforma."
      />

      <div className="card-surface p-4 mb-5">
        <div className="relative">
          <IconSearch className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Buscar por nombre o correo..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {users.length === 0 ? (
        <EmptyState icon={<IconUsers className="h-6 w-6" />} title="No se encontraron usuarios" />
      ) : (
        <div className="card-surface overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Usuario</th>
                <th className="text-left px-4 py-3">Rol</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={user.profile_photo} name={`${user.first_name} ${user.last_name}`} size="h-9 w-9" />
                      <div>
                        <p className="font-medium text-ink-900">{user.first_name} {user.last_name}</p>
                        <p className="text-xs text-ink-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Select
                      value={roles.find((r) => r.name === user.role?.name)?.id || ""}
                      onChange={(e) => changeRole(user, e.target.value)}
                      disabled={actingId === user.id}
                      className="!py-1.5 !text-xs w-36"
                    >
                      {roles.map((role) => (
                        <option key={role.id} value={role.id}>{roleLabel(role.name)}</option>
                      ))}
                    </Select>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={user.is_active ? "brand" : "rose"}>
                      {user.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      disabled={actingId === user.id}
                      onClick={() => toggleActive(user)}
                      className={
                        "px-3 py-1.5 rounded-lg text-xs font-medium " +
                        (user.is_active
                          ? "text-rose-600 hover:bg-rose-50"
                          : "text-brand-600 hover:bg-brand-50")
                      }
                    >
                      {user.is_active ? "Desactivar" : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
