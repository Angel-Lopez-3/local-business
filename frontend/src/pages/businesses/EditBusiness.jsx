import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getBusinessBySlugRequest, updateBusinessRequest } from "../../api/businessApi";
import { getCategoriesRequest } from "../../api/categoryApi";
import { getSectorsRequest } from "../../api/sectorApi";
import { useToast } from "../../context/ToastContext";
import { toFormData, extractFieldErrors, normalizeWebsite, resolveUploadUrl } from "../../utils/media";

import { PageHeader, Input, TextArea, Select, Field, Button } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IconStore, IconImage } from "../../components/icons";

export default function EditBusiness() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);
  const [cover, setCover] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);

  useEffect(() => {
    loadData();
  }, [slug]);

  const loadData = async () => {
    setLoading(true);

    try {
      const [categoriesRes, sectorsRes, businessRes] = await Promise.all([
        getCategoriesRequest(),
        getSectorsRequest(),
        getBusinessBySlugRequest(slug),
      ]);

      setCategories(categoriesRes.data.data.filter((c) => c.is_active));
      setSectors(sectorsRes.data.data);

      const business = businessRes.data.data;
      setBusinessId(business.id);
      setLogoPreview(business.logo ? resolveUploadUrl(business.logo) : null);
      setCoverPreview(business.cover_image ? resolveUploadUrl(business.cover_image) : null);

      setForm({
        category_id: business.category_id || "",
        sector_id: business.sector_id || "",
        name: business.name || "",
        description: business.description || "",
        phone: business.phone || "",
        whatsapp: business.whatsapp || "",
        email: business.email || "",
        address: business.address || "",
        website: business.website || "",
        facebook: business.facebook || "",
        instagram: business.instagram || "",
        working_hours: business.working_hours || "",
      });
    } catch (error) {
      toast.error("No se pudo cargar el negocio.");
      navigate("/my-business");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleFile = (setFile, setPreview) => (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFile(file);
    setPreview(URL.createObjectURL(file));
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
      const response = await updateBusinessRequest(businessId, formData);
      toast.success("Negocio actualizado correctamente.");
      navigate(`/businesses/${response.data.data.slug}`);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto">
      <PageHeader eyebrow="Editar" title="Editar negocio" description="Actualiza la informacion de tu negocio." />

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
            <span className="block text-xs text-ink-400 mt-1">Deja vacio para mantener el actual.</span>
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
            <span className="block text-xs text-ink-400 mt-1">Deja vacio para mantener la actual.</span>
          </label>
        </div>

        <Field label="Nombre del negocio" required>
          <Input name="name" required minLength={3} maxLength={150} value={form.name} onChange={handleChange} />
        </Field>

        <Field label="Descripcion" required hint="Minimo 20 caracteres.">
          <TextArea name="description" required minLength={20} maxLength={5000} rows={4} value={form.description} onChange={handleChange} />
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
            <Input name="phone" maxLength={20} value={form.phone} onChange={handleChange} />
          </Field>
          <Field label="WhatsApp">
            <Input name="whatsapp" maxLength={20} value={form.whatsapp} onChange={handleChange} />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Correo electronico">
            <Input type="email" name="email" maxLength={150} value={form.email} onChange={handleChange} />
          </Field>
          <Field label="Direccion">
            <Input name="address" maxLength={255} value={form.address} onChange={handleChange} />
          </Field>
        </div>

        <Field label="Horario de atencion">
          <Input name="working_hours" maxLength={500} value={form.working_hours} onChange={handleChange} />
        </Field>

        <div className="grid sm:grid-cols-3 gap-5">
          <Field label="Sitio web">
            <Input name="website" maxLength={255} value={form.website} onChange={handleChange} />
          </Field>
          <Field label="Facebook">
            <Input name="facebook" maxLength={255} value={form.facebook} onChange={handleChange} />
          </Field>
          <Field label="Instagram">
            <Input name="instagram" maxLength={255} value={form.instagram} onChange={handleChange} />
          </Field>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button type="button" variant="secondary" size="lg" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit" size="lg" loading={saving}>Guardar cambios</Button>
        </div>
      </form>
    </div>
  );
}
