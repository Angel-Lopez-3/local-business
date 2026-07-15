import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  getBusinessBySlugRequest,
  getMyBusinessRequest,
  deleteBusinessRequest,
} from "../../api/businessApi";
import { getBusinessReviewsRequest, createReviewRequest, createReplyRequest } from "../../api/reviewApi";
import { getBusinessServicesRequest } from "../../api/serviceApi";
import { getBusinessImagesRequest } from "../../api/businessImageApi";
import { addFavoriteRequest, removeFavoriteRequest, getFavoritesRequest } from "../../api/favoriteApi";
import { createReportRequest } from "../../api/reportApi";

import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { useConfirm } from "../../context/ConfirmContext";

import { resolveUploadUrl, formatCurrency, formatDate, normalizeWebsite, extractFieldErrors } from "../../utils/media";
import { Button, TextArea, Field } from "../../components/form";
import Badge from "../../components/Badge";
import Avatar from "../../components/Avatar";
import StarRating from "../../components/StarRating";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";

import {
  IconStore,
  IconChevronLeft,
  IconEdit,
  IconTrash,
  IconHeart,
  IconPhone,
  IconMail,
  IconMapPin,
  IconGlobe,
  IconClock,
  IconWrench,
  IconImage,
  IconFlag,
  IconShield,
} from "../../components/icons";

export default function BusinessDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const toast = useToast();
  const confirm = useConfirm();

  const [business, setBusiness] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [reviews, setReviews] = useState([]);
  const [services, setServices] = useState([]);
  const [images, setImages] = useState([]);

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });
  const [reviewLoading, setReviewLoading] = useState(false);

  const [replyDrafts, setReplyDrafts] = useState({});
  const [replyLoadingId, setReplyLoadingId] = useState(null);

  useEffect(() => {
    loadBusiness();
  }, [slug]);

  const loadBusiness = async () => {
    setLoading(true);
    setError(null);
    setIsOwner(false);

    try {
      const response = await getBusinessBySlugRequest(slug);
      const data = response.data.data;
      setBusiness(data);

      loadRelated(data.id);

      if (user) {
        try {
          const mine = await getMyBusinessRequest();
          if (mine.data.data?.slug === data.slug) setIsOwner(true);
        } catch (err) {
          // el usuario no tiene negocio propio
        }

        try {
          const favorites = await getFavoritesRequest();
          setIsFavorite(favorites.data.data.some((f) => f.business_id === data.id));
        } catch (err) {
          // ignore
        }
      }
    } catch (err) {
      console.error(err);
      setError("No se encontro el negocio.");
    } finally {
      setLoading(false);
    }
  };

  const loadRelated = async (businessId) => {
    try {
      const reviewsRes = await getBusinessReviewsRequest(businessId);
      setReviews(reviewsRes.data.data);
    } catch (err) {
      console.error(err);
    }

    try {
      const servicesRes = await getBusinessServicesRequest(businessId);
      setServices(servicesRes.data.data.filter((s) => s.is_active !== false));
    } catch (err) {
      console.error(err);
    }

    try {
      const imagesRes = await getBusinessImagesRequest(businessId);
      setImages(imagesRes.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    const ok = await confirm({
      title: "Eliminar negocio",
      message: "Esta accion eliminara el negocio y toda su informacion asociada. No se puede deshacer.",
      confirmText: "Eliminar",
      danger: true,
    });
    if (!ok) return;

    try {
      await deleteBusinessRequest(business.id);
      toast.success("Negocio eliminado correctamente.");
      navigate("/businesses");
    } catch (err) {
      toast.error(extractFieldErrors(err));
    }
  };

  const toggleFavorite = async () => {
    if (!user) return;
    setFavoriteLoading(true);

    try {
      if (isFavorite) {
        await removeFavoriteRequest(business.id);
        setIsFavorite(false);
        toast.info("Eliminado de favoritos.");
      } else {
        await addFavoriteRequest(business.id);
        setIsFavorite(true);
        toast.success("Agregado a favoritos.");
      }
    } catch (err) {
      toast.error(extractFieldErrors(err));
    } finally {
      setFavoriteLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setReviewLoading(true);

    try {
      await createReviewRequest({
        business_id: business.id,
        rating: reviewForm.rating,
        ...(reviewForm.comment ? { comment: reviewForm.comment } : {}),
      });
      toast.success("Resena publicada.");
      setReviewForm({ rating: 5, comment: "" });
      loadRelated(business.id);
    } catch (err) {
      toast.error(extractFieldErrors(err));
    } finally {
      setReviewLoading(false);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    const message = replyDrafts[reviewId];
    if (!message || message.trim().length < 3) {
      toast.error("La respuesta debe tener al menos 3 caracteres.");
      return;
    }

    setReplyLoadingId(reviewId);

    try {
      await createReplyRequest(reviewId, { message });
      toast.success("Respuesta publicada.");
      setReplyDrafts((prev) => ({ ...prev, [reviewId]: "" }));
      loadRelated(business.id);
    } catch (err) {
      toast.error(extractFieldErrors(err));
    } finally {
      setReplyLoadingId(null);
    }
  };

  const handleReport = async () => {
    const reason = window.prompt("Describe el motivo del reporte (minimo 10 caracteres):");
    if (!reason) return;
    if (reason.trim().length < 10) {
      toast.error("El motivo debe tener al menos 10 caracteres.");
      return;
    }

    try {
      await createReportRequest({ business_id: business.id, reason });
      toast.success("Reporte enviado. Gracias por avisarnos.");
    } catch (err) {
      toast.error(extractFieldErrors(err));
    }
  };

  if (loading) {
    return <LoadingSpinner label="Cargando negocio..." />;
  }

  if (error || !business) {
    return (
      <EmptyState
        icon={<IconStore className="h-6 w-6" />}
        title="Negocio no encontrado"
        description={error}
        action={
          <Link to="/businesses">
            <Button variant="secondary">Volver a negocios</Button>
          </Link>
        }
      />
    );
  }

  const canManage = isOwner || isAdmin;
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : null;

  const canReview = user && !isOwner && !isAdmin;
  const alreadyReviewed = user && reviews.some((r) => r.user.id === user.id);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <Link to="/businesses" className="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800">
          <IconChevronLeft className="h-4 w-4" />
          Volver a negocios
        </Link>

        <div className="flex items-center gap-2">
          {user && !canManage && (
            <button
              onClick={handleReport}
              className="text-sm font-medium text-ink-400 hover:text-rose-500 inline-flex items-center gap-1.5"
            >
              <IconFlag className="h-4 w-4" />
              Reportar
            </button>
          )}

          {canManage && (
            <>
              <Link to={`/businesses/${business.slug}/edit`}>
                <Button variant="secondary" size="sm">
                  <IconEdit className="h-4 w-4" /> Editar
                </Button>
              </Link>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                <IconTrash className="h-4 w-4" /> Eliminar
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="h-52 sm:h-64 bg-ink-100 relative">
          {business.cover_image ? (
            <img src={resolveUploadUrl(business.cover_image)} alt={business.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <IconStore className="h-10 w-10 text-ink-300" />
            </div>
          )}

          {user && !canManage && (
            <button
              onClick={toggleFavorite}
              disabled={favoriteLoading}
              className="absolute top-4 right-4 h-10 w-10 rounded-full bg-white/90 backdrop-blur shadow flex items-center justify-center hover:scale-105 transition"
              aria-label="Favorito"
            >
              <IconHeart filled={isFavorite} className={`h-5 w-5 ${isFavorite ? "text-rose-500" : "text-ink-400"}`} />
            </button>
          )}
        </div>

        <div className="p-6 flex flex-col sm:flex-row gap-5 -mt-12 sm:-mt-14">
          <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-2xl bg-white shadow-md ring-4 ring-white overflow-hidden shrink-0 flex items-center justify-center">
            {business.logo ? (
              <img src={resolveUploadUrl(business.logo)} alt={business.name} className="h-full w-full object-cover" />
            ) : (
              <IconStore className="h-8 w-8 text-ink-300" />
            )}
          </div>

          <div className="pt-2 sm:pt-12 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-display text-2xl font-bold text-ink-900">{business.name}</h1>
              {isOwner && <Badge variant="brand" icon={<IconShield className="h-3 w-3" />}>Tu negocio</Badge>}
            </div>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              {business.category?.name && <Badge variant="brand">{business.category.name}</Badge>}
              {business.sector?.name && <Badge variant="ink" icon={<IconMapPin className="h-3 w-3" />}>{business.sector.name}</Badge>}
              {averageRating && (
                <Badge variant="amber">★ {averageRating} ({reviews.length})</Badge>
              )}
            </div>
          </div>
        </div>

        {business.description && (
          <div className="px-6 pb-6">
            <p className="text-ink-600 leading-relaxed">{business.description}</p>
          </div>
        )}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 space-y-6">
          {services.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink-900 flex items-center gap-2 mb-4">
                <IconWrench className="h-5 w-5 text-brand-600" /> Servicios
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {services.map((service) => (
                  <div key={service.id} className="rounded-xl border border-ink-100 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-medium text-ink-900">{service.name}</p>
                      {formatCurrency(service.price) && (
                        <span className="text-sm font-semibold text-brand-600 whitespace-nowrap">
                          {formatCurrency(service.price)}
                        </span>
                      )}
                    </div>
                    {service.description && (
                      <p className="text-sm text-ink-500 mt-1">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {images.length > 0 && (
            <div className="card-surface p-6">
              <h2 className="font-display text-lg font-semibold text-ink-900 flex items-center gap-2 mb-4">
                <IconImage className="h-5 w-5 text-brand-600" /> Galeria
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {images.map((image) => (
                  <div key={image.id} className="aspect-square rounded-xl overflow-hidden bg-ink-100">
                    <img src={resolveUploadUrl(image.image_url)} alt="" className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="card-surface p-6">
            <h2 className="font-display text-lg font-semibold text-ink-900 mb-4">
              Resenas {reviews.length > 0 && `(${reviews.length})`}
            </h2>

            {canReview && !alreadyReviewed && (
              <form onSubmit={handleReviewSubmit} className="rounded-xl border border-ink-100 p-4 mb-5 space-y-3">
                <Field label="Tu calificacion">
                  <StarRating value={reviewForm.rating} onChange={(v) => setReviewForm((p) => ({ ...p, rating: v }))} />
                </Field>
                <Field label="Comentario (opcional)">
                  <TextArea
                    rows={3}
                    minLength={10}
                    placeholder="Cuentanos tu experiencia (minimo 10 caracteres si escribes algo)..."
                    value={reviewForm.comment}
                    onChange={(e) => setReviewForm((p) => ({ ...p, comment: e.target.value }))}
                  />
                </Field>
                <Button type="submit" size="sm" loading={reviewLoading}>Publicar resena</Button>
              </form>
            )}

            {reviews.length === 0 ? (
              <p className="text-sm text-ink-500">Este negocio aun no tiene resenas.</p>
            ) : (
              <div className="space-y-5">
                {reviews.map((review) => (
                  <div key={review.id} className="border-t border-ink-100 pt-5 first:border-t-0 first:pt-0">
                    <div className="flex items-start gap-3">
                      <Avatar
                        src={review.user.profile_photo}
                        name={`${review.user.first_name} ${review.user.last_name}`}
                        size="h-9 w-9"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 flex-wrap">
                          <p className="font-medium text-ink-900 text-sm">
                            {review.user.first_name} {review.user.last_name}
                          </p>
                          <span className="text-xs text-ink-400">{formatDate(review.created_at)}</span>
                        </div>
                        <StarRating value={review.rating} readOnly size="h-3.5 w-3.5" />
                        {review.comment && <p className="text-sm text-ink-600 mt-1.5">{review.comment}</p>}

                        {review.replies?.map((reply) => (
                          <div key={reply.id} className="mt-3 ml-2 pl-3 border-l-2 border-brand-200 bg-brand-50/50 rounded-r-lg py-2 px-3">
                            <p className="text-xs font-semibold text-brand-700">Respuesta de {reply.business.name}</p>
                            <p className="text-sm text-ink-600 mt-0.5">{reply.message}</p>
                          </div>
                        ))}

                        {isOwner && (!review.replies || review.replies.length === 0) && (
                          <div className="mt-3 flex gap-2">
                            <input
                              placeholder="Responder a esta resena..."
                              value={replyDrafts[review.id] || ""}
                              onChange={(e) =>
                                setReplyDrafts((prev) => ({ ...prev, [review.id]: e.target.value }))
                              }
                              className="flex-1 rounded-lg border border-ink-200 px-3 py-1.5 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
                            />
                            <Button
                              size="sm"
                              variant="secondary"
                              loading={replyLoadingId === review.id}
                              onClick={() => handleReplySubmit(review.id)}
                            >
                              Responder
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-surface p-5 space-y-3.5">
            <h3 className="font-display font-semibold text-ink-900 mb-1">Contacto</h3>

            {business.phone && (
              <div className="flex items-center gap-2.5 text-sm text-ink-600">
                <IconPhone className="h-4 w-4 text-ink-400 shrink-0" /> {business.phone}
              </div>
            )}
            {business.whatsapp && (
              <a
                href={`https://wa.me/${business.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-brand-600 hover:text-brand-700"
              >
                <IconPhone className="h-4 w-4 shrink-0" /> WhatsApp: {business.whatsapp}
              </a>
            )}
            {business.email && (
              <div className="flex items-center gap-2.5 text-sm text-ink-600 break-all">
                <IconMail className="h-4 w-4 text-ink-400 shrink-0" /> {business.email}
              </div>
            )}
            {business.address && (
              <div className="flex items-center gap-2.5 text-sm text-ink-600">
                <IconMapPin className="h-4 w-4 text-ink-400 shrink-0" /> {business.address}
              </div>
            )}
            {business.website && (
              <a
                href={normalizeWebsite(business.website)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-sm text-brand-600 hover:text-brand-700 break-all"
              >
                <IconGlobe className="h-4 w-4 shrink-0" /> {business.website}
              </a>
            )}
            {business.working_hours && (
              <div className="flex items-center gap-2.5 text-sm text-ink-600">
                <IconClock className="h-4 w-4 text-ink-400 shrink-0" /> {business.working_hours}
              </div>
            )}

            {!business.phone && !business.whatsapp && !business.email && !business.address && !business.website && (
              <p className="text-sm text-ink-400">Este negocio no agrego informacion de contacto.</p>
            )}
          </div>

          {(business.facebook || business.instagram) && (
            <div className="card-surface p-5 space-y-2.5">
              <h3 className="font-display font-semibold text-ink-900 mb-1">Redes sociales</h3>
              {business.facebook && (
                <a href={normalizeWebsite(business.facebook)} target="_blank" rel="noreferrer" className="block text-sm text-brand-600 hover:text-brand-700 break-all">
                  Facebook
                </a>
              )}
              {business.instagram && (
                <a href={normalizeWebsite(business.instagram)} target="_blank" rel="noreferrer" className="block text-sm text-brand-600 hover:text-brand-700 break-all">
                  Instagram
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
