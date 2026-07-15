import { useEffect, useState } from "react";

import {
  getCategoriesRequest,
  createCategoryRequest,
  updateCategoryRequest,
  activateCategoryRequest,
  deactivateCategoryRequest,
} from "../../api/categoryApi";

import { useToast } from "../../context/ToastContext";
import { extractFieldErrors } from "../../utils/media";

import { PageHeader, Input, Field, Button } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import Badge from "../../components/Badge";

import { IconGrid, IconEdit, IconPlus } from "../../components/icons";

const emptyForm = { name: "", icon: "" };

export default function AdminCategories() {
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [actingId, setActingId] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const response = await getCategoriesRequest();
      setCategories(response.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar las categorias.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      if (editingId) {
        await updateCategoryRequest(editingId, form);
        toast.success("Categoria actualizada.");
      } else {
        await createCategoryRequest(form);
        toast.success("Categoria creada.");
      }
      setForm(emptyForm);
      setEditingId(null);
      loadCategories();
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setForm({ name: category.name, icon: category.icon || "" });
  };

  const toggleActive = async (category) => {
    setActingId(category.id);
    try {
      const action = category.is_active ? deactivateCategoryRequest : activateCategoryRequest;
      await action(category.id);
      toast.success(`Categoria ${category.is_active ? "desactivada" : "activada"}.`);
      loadCategories();
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
        title="Categorias"
        description="Gestiona las categorias disponibles para clasificar negocios."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <form onSubmit={handleSubmit} className="card-surface p-5 space-y-4 h-fit">
          <h2 className="font-display font-semibold text-ink-900 flex items-center gap-2">
            <IconPlus className="h-4 w-4 text-brand-600" />
            {editingId ? "Editar categoria" : "Nueva categoria"}
          </h2>

          <Field label="Nombre" required>
            <Input
              required
              minLength={2}
              maxLength={100}
              value={form.name}
              onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
              placeholder="Restaurantes"
            />
          </Field>

          <Field label="Icono" required hint="Un emoji corto, ej: 🍽️">
            <Input
              required
              maxLength={100}
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              placeholder="🍽️"
            />
          </Field>

          <div className="flex gap-2">
            <Button type="submit" size="sm" loading={saving}>
              {editingId ? "Guardar" : "Crear"}
            </Button>
            {editingId && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
              >
                Cancelar
              </Button>
            )}
          </div>
        </form>

        <div className="lg:col-span-2 card-surface overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-ink-50 text-ink-500 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Categoria</th>
                <th className="text-left px-4 py-3">Estado</th>
                <th className="text-right px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-100">
              {categories.map((category) => (
                <tr key={category.id} className="hover:bg-ink-50/60">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{category.icon}</span>
                      <span className="font-medium text-ink-900">{category.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={category.is_active ? "brand" : "rose"}>
                      {category.is_active ? "Activa" : "Inactiva"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1.5">
                      <button
                        onClick={() => startEdit(category)}
                        className="p-2 rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700"
                      >
                        <IconEdit className="h-4 w-4" />
                      </button>
                      <button
                        disabled={actingId === category.id}
                        onClick={() => toggleActive(category)}
                        className={
                          "px-2.5 py-1.5 rounded-lg text-xs font-medium " +
                          (category.is_active
                            ? "text-rose-600 hover:bg-rose-50"
                            : "text-brand-600 hover:bg-brand-50")
                        }
                      >
                        {category.is_active ? "Desactivar" : "Activar"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
