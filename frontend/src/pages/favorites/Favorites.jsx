import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { getFavoritesRequest, removeFavoriteRequest } from "../../api/favoriteApi";
import { useToast } from "../../context/ToastContext";
import { resolveUploadUrl, extractFieldErrors } from "../../utils/media";

import { PageHeader } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import Badge from "../../components/Badge";
import { IconHeart, IconStore, IconMapPin } from "../../components/icons";

export default function Favorites() {
  const toast = useToast();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    setLoading(true);
    try {
      const response = await getFavoritesRequest();
      setFavorites(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (businessId) => {
    try {
      await removeFavoriteRequest(businessId);
      setFavorites((prev) => prev.filter((f) => f.business_id !== businessId));
      toast.info("Eliminado de favoritos.");
    } catch (error) {
      toast.error(extractFieldErrors(error));
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Tu lista"
        title="Favoritos"
        description="Negocios que has guardado para encontrar rapido."
      />

      {favorites.length === 0 ? (
        <EmptyState
          icon={<IconHeart className="h-6 w-6" />}
          title="Aun no tienes favoritos"
          description="Explora el directorio y guarda los negocios que mas te gusten."
          action={
            <Link to="/businesses" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Explorar negocios
            </Link>
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {favorites.map((favorite) => (
            <div key={favorite.business_id} className="card-surface overflow-hidden group">
              <Link to={`/businesses/${favorite.slug}`} className="block">
                <div className="h-32 bg-ink-100 overflow-hidden">
                  {favorite.cover_image || favorite.logo ? (
                    <img
                      src={resolveUploadUrl(favorite.cover_image || favorite.logo)}
                      alt={favorite.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <IconStore className="h-7 w-7 text-ink-300" />
                    </div>
                  )}
                </div>
              </Link>

              <div className="p-4">
                <div className="flex items-start justify-between gap-2">
                  <Link to={`/businesses/${favorite.slug}`}>
                    <h3 className="font-display font-semibold text-ink-900 hover:text-brand-600">
                      {favorite.name}
                    </h3>
                  </Link>
                  <button
                    onClick={() => handleRemove(favorite.business_id)}
                    className="text-rose-400 hover:text-rose-600 shrink-0"
                    aria-label="Quitar de favoritos"
                  >
                    <IconHeart filled className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {favorite.category?.name && <Badge variant="brand">{favorite.category.name}</Badge>}
                  {favorite.sector?.name && (
                    <Badge variant="ink" icon={<IconMapPin className="h-3 w-3" />}>{favorite.sector.name}</Badge>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
