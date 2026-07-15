import { useEffect, useState } from "react";

import { getSectorsRequest, createSectorRequest } from "../../api/sectorApi";
import { useToast } from "../../context/ToastContext";
import { extractFieldErrors } from "../../utils/media";

import { PageHeader, Input, Field, Button } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";

import { IconMapPin, IconPlus } from "../../components/icons";

const emptyForm = { name: "", city: "" };

export default function AdminSectors() {
  const toast = useToast();

  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    setLoading(true);
    try {
      const response = await getSectorsRequest();
      setSectors(response.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar los sectores.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await createSectorRequest(form);
      toast.success("Sector creado.");
      setForm(emptyForm);
      loadSectors();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Administracion"
        title="Sectores"
        description="Gestiona las zonas geograficas disponibles para los negocios."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="card-surface p-5 space-y-4 h-fit">
          <h2 className="font-display font-semibold text-ink-900 flex items-center gap-2">
            <IconPlus className="h-4 w-4 text-brand-600" /> Nuevo sector
          </h2>

          <Field label="Nombre" required>
            <Input
              required
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Zona Colonial"
            />
          </Field>

          <Field label="Ciudad" required>
            <Input
              required
              minLength={2}
              maxLength={100}
              value={form.city}
              onChange={(e) => setForm((p) => ({ ...p, city: e.target.value }))}
              placeholder="Santo Domingo"
            />
          </Field>

          <Button type="submit" size="sm" loading={saving}>Crear sector</Button>
        </form>

        <div className="lg:col-span-2 card-surface overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Sector</th>
                <th className="text-left px-4 py-3">Ciudad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {sectors.map((sector) => (
                <tr key={sector.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <IconMapPin className="h-4 w-4 text-brand-500" />
                      <span className="font-medium text-ink-900">{sector.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink-500">{sector.city}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
