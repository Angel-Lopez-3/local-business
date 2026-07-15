import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { createBusinessRequest } from "../../api/businessApi";
import { getCategoriesRequest } from "../../api/categoryApi";
import { getSectorsRequest } from "../../api/sectorApi";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { toFormData, extractFieldErrors, normalizeWebsite } from "../../utils/media";

import { PageHeader, Input, TextArea, Select, Field, Button } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IconStore, IconImage } from "../../components/icons";

const emptyForm = {
  category_id: "",
  sector_id: "",
  name: "",
  description: "",
  phone: "",
  whatsapp: "",
  email: "",
  address: "",
  website: "",
  facebook: "",
  instagram: "",
  working_hours: "",
};

export default function CreateBusiness() {
  const navigate = useNavigate();
  const toast = useToast();
  const { checkAuth } = useAuth();

  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    loadOptions();
  }, []);

  const loadOptions = async () => {
    try {
      const [categoriesRes, sectorsRes] = await Promise.all([
        getCategoriesRequest(),
        getSectorsRequest(),
      ]);
      setCategories(categoriesRes.data.data.filter((c) => c.is_active));
      setSectors(sectorsRes.data.data);
    } catch (error) {
      toast.error("No se pudieron cargar categorias y sectores.");
    } finally {
      setLoadingOptions(false);
    }
  };

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleFile = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    setFile(file || null);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const normalized = {
        ...form,
        website: form.website ? normalizeWebsite(form.website) : "",
        facebook: form.facebook ? normalizeWebsite(form.facebook) : "",
        instagram: form.instagram ? normalizeWebsite(form.instagram) : "",
      };
      const formData = toFormData(normalized, { logo, cover_image: cover });
      await createBusinessRequest(formData);
      await checkAuth();
      toast.success("Negocio creado correctamente.");
      navigate("/my-business");
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSaving(false);
    }
  };

  if (loadingOptions) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader
        eyebrow="Nuevo"
        title="Registrar negocio"
        description="Completa la informacion de tu negocio. Un administrador debera verificarlo antes de aparecer publicamente."
      />

      <form onSubmit={handleSubmit} className="card-surface p-6 space-y-6">
        <div className="grid sm:grid-cols-2 gap-5">
          <label className="block">
            <span className="block text-sm font-medium text-ink-700 mb-1.5">Logo</span>
            <div className="h-24 w-24 rounded-xl bg-ink-100 overflow-hidden flex items-center justify-center relative border-2 border-dashed border-ink-200 hover:border-brand-300 transition cursor-pointer">
              {logoPreview ? (
                <img src={logoPreview} alt="Logo" className="h-full w-full object-cover" />
              ) : (
                <IconStore className="h-7 w-7 text-ink-300" />
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFile(setLogo, setLogoPreview)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-ink-700 mb-1.5">Portada</span>
            <div className="h-24 w-full rounded-xl bg-ink-100 overflow-hidden flex items-center justify-center relative border-2 border-dashed border-ink-200 hover:border-brand-300 transition cursor-pointer">
              {coverPreview ? (
                <img src={coverPreview} alt="Portada" className="h-full w-full object-cover" />
              ) : (
                <IconImage className="h-7 w-7 text-ink-300" />
              )}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleFile(setCover, setCoverPreview)}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </label>
        </div>

        <Field label="Nombre del negocio" required>
          <Input name="name" required minLength={3} maxLength={150} value={form.name} onChange={handleChange} placeholder="Panaderia El Buen Pan" />
        </Field>

        <Field label="Descripcion" required hint="Minimo 20 caracteres.">
          <TextArea name="description" required minLength={20} maxLength={5000} rows={4} value={form.description} onChange={handleChange} placeholder="Cuenta que hace especial a tu negocio..." />
        </Field>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Categoria" required>
            <Select name="category_id" required value={form.category_id} onChange={handleChange}>
              <option value="">Selecciona una categoria</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </Select>
          </Field>

          <Field label="Sector" required>
            <Select name="sector_id" required value={form.sector_id} onChange={handleChange}>
              <option value="">Selecciona un sector</option>
              {sectors.map((sector) => (
                <option key={sector.id} value={sector.id}>{sector.name} - {sector.city}</option>
              ))}
            </Select>
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Telefono">
            <Input name="phone" maxLength={20} value={form.phone} onChange={handleChange} placeholder="809-000-0000" />
          </Field>
          <Field label="WhatsApp">
            <Input name="whatsapp" maxLength={20} value={form.whatsapp} onChange={handleChange} placeholder="809-000-0000" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Correo electronico">
            <Input type="email" name="email" maxLength={150} value={form.email} onChange={handleChange} placeholder="contacto@negocio.com" />
          </Field>
          <Field label="Direccion">
            <Input name="address" maxLength={255} value={form.address} onChange={handleChange} placeholder="Calle Principal #10" />
          </Field>
        </div>

        <Field label="Horario de atencion">
          <Input name="working_hours" maxLength={500} value={form.working_hours} onChange={handleChange} placeholder="Lun-Vie 9:00am - 6:00pm" />
        </Field>

        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Sitio web" hint="Incluye https://">
            <Input name="website" maxLength={255} value={form.website} onChange={handleChange} placeholder="https://tunegocio.com" />
          </Field>
          <Field label="Facebook" hint="URL completa">
            <Input name="facebook" maxLength={255} value={form.facebook} onChange={handleChange} placeholder="https://facebook.com/tunegocio" />
          </Field>
          <Field label="Instagram" hint="URL completa">
            <Input name="instagram" maxLength={255} value={form.instagram} onChange={handleChange} placeholder="https://instagram.com/tunegocio" />
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="submit" size="lg" loading={saving}>Crear negocio</Button>
        </div>
      </form>
    </div>
  );
}
