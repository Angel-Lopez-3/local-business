import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getAllBusinessesAdminRequest,
  verifyBusinessRequest,
  unverifyBusinessRequest,
  activateBusinessRequest,
  deactivateBusinessRequest,
  deleteBusinessRequest,
} from "../../api/businessApi";

import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { extractFieldErrors, resolveUploadUrl } from "../../utils/media";

import { PageHeader, Input } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";

import { IconShield, IconCheck, IconX, IconTrash, IconSearch, IconStore } from "../../components/icons";

export default function AdminBusinesses() {
  const toast = useToast();
  const confirm = useConfirm();

  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    setLoading(true);
    try {
      const response = await getAllBusinessesAdminRequest();
      setBusinesses(response.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar los negocios.");
    } finally {
      setLoading(false);
    }
  };

  const runAction = async (id, action, successMessage) => {
    setActingId(id);
    try {
      await action(id);
      toast.success(successMessage);
      loadBusinesses();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setActingId(null);
    }
  };

  const handleDelete = async (business) => {
    const ok = await confirm({
      title: "Eliminar negocio",
      message: `Se eliminara "${business.name}" y toda su informacion asociada.`,
      confirmText: "Eliminar",
      danger: true,
    });
    if (!ok) return;
    runAction(business.id, () => deleteBusinessRequest(business.id), "Negocio eliminado.");
  };

  const filtered = businesses.filter(
    (b) =>
      !search ||
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.slug?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Administracion"
        title="Negocios"
        description="Verifica, activa o elimina negocios registrados en la plataforma."
      />

      <div className="card-surface p-4 mb-5">
        <div className="relative">
          <IconSearch className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Buscar por nombre..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon={<IconShield className="h-6 w-6" />} title="No hay negocios" />
      ) : (
        <div className="card-surface overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Negocio</th>
                <th className="text-left px-4 py-3">Categoria</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-left px-4 py-3">Verificado</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {filtered.map((business) => (
                <tr key={business.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-ink-100 overflow-hidden flex items-center justify-center shrink-0">
                        {business.logo ? (
                          <img src={resolveUploadUrl(business.logo)} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <IconStore className="h-4 w-4 text-ink-300" />
                        )}
                      </div>
                      <Link to={`/businesses/${business.slug}`} className="font-medium text-ink-900 hover:text-brand-600">
                        {business.name}
                      </Link>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{business.category?.name || "-"}</td>
                  <td className="px-4 py-3">
                    <Badge variant={business.is_active ? "brand" : "rose"}>
                      {business.is_active ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={business.is_verified ? "brand" : "amber"}>
                      {business.is_verified ? "Verificado" : "Pendiente"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5 flex-wrap">
                      {business.is_verified ? (
                        <button
                          disabled={actingId === business.id}
                          onClick={() =>
                            runAction(business.id, unverifyBusinessRequest, "Verificacion revocada.")
                          }
                          className="p-2 rounded-lg text-ink-400 hover:bg-amber-50 hover:text-amber-600"
                          title="Quitar verificacion"
                        >
                          <IconX className="h-4 w-4" />
                        </button>
                      ) : (
                        <button
                          disabled={actingId === business.id}
                          onClick={() => runAction(business.id, verifyBusinessRequest, "Negocio verificado.")}
                          className="p-2 rounded-lg text-ink-400 hover:bg-brand-50 hover:text-brand-600"
                          title="Verificar"
                        >
                          <IconCheck className="h-4 w-4" />
                        </button>
                      )}

                      {business.is_active ? (
                        <button
                          disabled={actingId === business.id}
                          onClick={() =>
                            runAction(business.id, deactivateBusinessRequest, "Negocio desactivado.")
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-ink-500 hover:bg-ink-100"
                        >
                          Desactivar
                        </button>
                      ) : (
                        <button
                          disabled={actingId === business.id}
                          onClick={() =>
                            runAction(business.id, activateBusinessRequest, "Negocio activado.")
                          }
                          className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-brand-600 hover:bg-brand-50"
                        >
                          Activar
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(business)}
                        className="p-2 rounded-lg text-ink-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Eliminar"
                      >
                        <IconTrash className="h-4 w-4" />
                      </button>
                    </div>
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
