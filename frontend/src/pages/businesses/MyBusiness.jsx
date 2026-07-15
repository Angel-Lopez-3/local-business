import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getMyBusinessRequest, deleteBusinessRequest } from "../../api/businessApi";
import { getBusinessServicesRequest, createServiceRequest, updateServiceRequest, deleteServiceRequest } from "../../api/serviceApi";
import { getBusinessImagesRequest, createBusinessImageRequest, deleteBusinessImageRequest } from "../../api/businessImageApi";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";
import { resolveUploadUrl, formatCurrency, extractFieldErrors } from "../../utils/media";

import { PageHeader, Input, TextArea, Field, Button } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";

import {
  IconStore,
  IconEdit,
  IconTrash,
  IconPlus,
  IconWrench,
  IconImage,
  IconMapPin,
} from "../../components/icons";

const emptyService = { name: "", description: "", price: "" };

export default function MyBusiness() {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();
  const toast = useToast();
  const confirm = useConfirm();

  const [business, setBusiness] = useState(null);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [serviceForm, setServiceForm] = useState(emptyService);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [savingService, setSavingService] = useState(false);

  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    setLoading(true);

    try {
      const response = await getMyBusinessRequest();
      const data = response.data.data;
      setBusiness(data);
      loadRelated(data.id);
    } catch (error) {
      setBusiness(null);
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async (businessId) => {
    try {
      const servicesRes = await getBusinessServicesRequest(businessId);
      setServices(servicesRes.data.data);
    } catch (error) {
      console.error(error);
    }

    try {
      const imagesRes = await getBusinessImagesRequest(businessId);
      setImages(imagesRes.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Eliminar negocio",
      message: "Esta accion eliminara tu negocio y toda su informacion asociada de forma permanente.",
      confirmText: "Eliminar",
      danger: true,
    });
    if (!ok) return;

    try {
      await deleteBusinessRequest(business.id);
      await checkAuth();
      setBusiness(null);
      toast.success("Negocio eliminado correctamente.");
    } catch (error) {
      toast.error(extractFieldErrors(error));
    }
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    setSavingService(true);

    try {
      if (editingServiceId) {
        await updateServiceRequest(editingServiceId, {
          name: serviceForm.name,
          ...(serviceForm.description ? { description: serviceForm.description } : {}),
          ...(serviceForm.price ? { price: Number(serviceForm.price) } : {}),
        });
        toast.success("Servicio actualizado.");
      } else {
        await createServiceRequest({
          business_id: business.id,
          name: serviceForm.name,
          ...(serviceForm.description ? { description: serviceForm.description } : {}),
          ...(serviceForm.price ? { price: Number(serviceForm.price) } : {}),
        });
        toast.success("Servicio agregado.");
      }
      setServiceForm(emptyService);
      setEditingServiceId(null);
      loadRelated(business.id);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setSavingService(false);
    }
  };

  const startEditService = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name,
      description: service.description || "",
      price: service.price || "",
    });
  };

  const handleDeleteService = async (service) => {
    const ok = await confirm({
      title: "Eliminar servicio",
      message: `Se eliminara "${service.name}" de tu lista de servicios.`,
      confirmText: "Eliminar",
      danger: true,
    });
    if (!ok) return;

    try {
      await deleteServiceRequest(service.id);
      toast.success("Servicio eliminado.");
      loadRelated(business.id);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);

    try {
      const formData = new FormData();
      formData.append("business_id", business.id);
      formData.append("image", file);
      await createBusinessImageRequest(formData);
      toast.success("Imagen agregada a la galeria.");
      loadRelated(business.id);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    } finally {
      setUploadingImage(false);
      e.target.value = "";
    }
  };

  const handleDeleteImage = async (image) => {
    const ok = await confirm({
      title: "Eliminar imagen",
      message: "Esta imagen se eliminara de tu galeria.",
      confirmText: "Eliminar",
      danger: true,
    });
    if (!ok) return;

    try {
      await deleteBusinessImageRequest(image.id);
      toast.success("Imagen eliminada.");
      loadRelated(business.id);
    } catch (error) {
      toast.error(extractFieldErrors(error));
    }
  };

  if (loading) return <LoadingSpinner />;

  if (!business) {
    return (
      <EmptyState
        icon={<IconStore className="h-6 w-6" />}
        title="Aun no tienes un negocio"
        description="Registra tu negocio para que aparezca en el directorio publico una vez sea verificado."
        action={
          <Link to="/businesses/create">
            <Button><IconPlus className="h-4 w-4" /> Registrar negocio</Button>
          </Link>
        }
      />
    );
  }

  return (
    <div>
      <PageHeader
        eyebrow="Panel del negocio"
        title={business.name}
        description="Gestiona la informacion, servicios y galeria de tu negocio."
        actions={
          <>
            <Link to={`/businesses/${business.slug}`}>
              <Button variant="secondary" size="sm">Ver publico</Button>
            </Link>
            <Link to={`/businesses/${business.slug}/edit`}>
              <Button variant="secondary" size="sm"><IconEdit className="h-4 w-4" /> Editar</Button>
            </Link>
            <Button variant="danger" size="sm" onClick={handleDelete}>
              <IconTrash className="h-4 w-4" /> Eliminar
            </Button>
          </>
        }
      />

      <div className="rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 mb-6 flex items-start gap-2.5">
        <span className="text-amber-600 mt-0.5">i</span>
        <p className="text-sm text-amber-800">
          Tu negocio aparecera en el directorio publico y en busquedas una vez que un administrador
          lo verifique. Mientras tanto puedes seguir completando su informacion, servicios y galeria.
        </p>
      </div>

      <div className="card-surface p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="h-20 w-20 rounded-xl bg-ink-100 overflow-hidden flex items-center justify-center shrink-0">
            {business.logo ? (
              <img src={resolveUploadUrl(business.logo)} alt={business.name} className="h-full w-full object-cover" />
            ) : (
              <IconStore className="h-7 w-7 text-ink-300" />
            )}
          </div>
          <div>
            <p className="text-ink-600">{business.description}</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {business.category?.name && <Badge variant="brand">{business.category.name}</Badge>}
              {business.sector?.name && (
                <Badge variant="ink" icon={<IconMapPin className="h-3 w-3" />}>{business.sector.name}</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card-surface p-6">
          <h2 className="font-display text-lg font-semibold text-ink-900 flex items-center gap-2 mb-4">
            <IconWrench className="h-5 w-5 text-brand-600" /> Servicios
          </h2>

          <form onSubmit={handleServiceSubmit} className="space-y-3 mb-5 rounded-xl border border-ink-100 p-4">
            <Field label="Nombre del servicio" required>
              <Input
                required
                minLength={3}
                value={serviceForm.name}
                onChange={(e) => setServiceForm((p) => ({ ...p, name: e.target.value }))}
                placeholder="Corte de cabello"
              />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Precio (opcional)">
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  value={serviceForm.price}
                  onChange={(e) => setServiceForm((p) => ({ ...p, price: e.target.value }))}
                  placeholder="500"
                />
              </Field>
              <Field label="Descripcion (opcional)">
                <Input
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm((p) => ({ ...p, description: e.target.value }))}
                  placeholder="Breve detalle"
                />
              </Field>
            </div>
            <div className="flex gap-2">
              <Button type="submit" size="sm" loading={savingService}>
                {editingServiceId ? "Guardar cambios" : "Agregar servicio"}
              </Button>
              {editingServiceId && (
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setEditingServiceId(null);
                    setServiceForm(emptyService);
                  }}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </form>

          {services.length === 0 ? (
            <p className="text-sm text-ink-500">Aun no has agregado servicios.</p>
          ) : (
            <div className="space-y-2">
              {services.map((service) => (
                <div key={service.id} className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 p-3">
                  <div>
                    <p className="font-medium text-ink-900 text-sm">{service.name}</p>
                    <p className="text-xs text-ink-500">
                      {formatCurrency(service.price) || "Sin precio"}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button onClick={() => startEditService(service)} className="p-2 rounded-lg text-ink-400 hover:bg-ink-100 hover:text-ink-700">
                      <IconEdit className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDeleteService(service)} className="p-2 rounded-lg text-ink-400 hover:bg-rose-50 hover:text-rose-600">
                      <IconTrash className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-surface p-6">
          <h2 className="font-display text-lg font-semibold text-ink-900 flex items-center gap-2 mb-4">
            <IconImage className="h-5 w-5 text-brand-600" /> Galeria
          </h2>

          <label className="block mb-4">
            <div className="rounded-xl border-2 border-dashed border-ink-200 hover:border-brand-300 transition p-6 text-center cursor-pointer relative">
              <IconPlus className="h-5 w-5 text-ink-400 mx-auto mb-1" />
              <p className="text-sm text-ink-500">
                {uploadingImage ? "Subiendo..." : "Agregar foto a la galeria"}
              </p>
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                disabled={uploadingImage}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </label>

          {images.length === 0 ? (
            <p className="text-sm text-ink-500">Tu galeria esta vacia.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {images.map((image) => (
                <div key={image.id} className="relative aspect-square rounded-lg overflow-hidden bg-ink-100 group">
                  <img src={resolveUploadUrl(image.image_url)} alt="" className="h-full w-full object-cover" />
                  <button
                    onClick={() => handleDeleteImage(image)}
                    className="absolute inset-0 bg-ink-950/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center"
                  >
                    <IconTrash className="h-5 w-5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
