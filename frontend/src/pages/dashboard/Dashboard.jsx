import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import { getBusinessesRequest, getMyBusinessRequest } from "../../api/businessApi";
import { getFavoritesRequest } from "../../api/favoriteApi";
import { getCategoriesRequest } from "../../api/categoryApi";
import { PageHeader, Button } from "../../components/form";
import Badge from "../../components/Badge";
import { resolveUploadUrl } from "../../utils/media";
import { roleLabel } from "../../utils/roles";

import {
  IconStore,
  IconHeart,
  IconGrid,
  IconPlus,
  IconSparkles,
} from "../../components/icons";

export default function Dashboard() {
  const { user, isAdmin, isBusiness } = useAuth();

  const [businessCount, setBusinessCount] = useState(null);
  const [categoryCount, setCategoryCount] = useState(null);
  const [favoriteCount, setFavoriteCount] = useState(null);
  const [myBusiness, setMyBusiness] = useState(null);
  const [recentBusinesses, setRecentBusinesses] = useState([]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const businesses = await getBusinessesRequest();
      setBusinessCount(businesses.data.data.length);
      setRecentBusinesses(businesses.data.data.slice(0, 4));
    } catch (error) {
      console.error(error);
    }

    try {
      const categories = await getCategoriesRequest();
      setCategoryCount(categories.data.data.length);
    } catch (error) {
      console.error(error);
    }

    try {
      const favorites = await getFavoritesRequest();
      setFavoriteCount(favorites.data.data.length);
    } catch (error) {
      console.error(error);
    }

    if (isBusiness) {
      try {
        const mine = await getMyBusinessRequest();
        setMyBusiness(mine.data.data);
      } catch (error) {
        setMyBusiness(null);
      }
    }
  };

  const stats = [
    {
      label: "Negocios activos",
      value: businessCount,
      icon: <IconStore className="h-5 w-5" />,
      to: "/businesses",
    },
    {
      label: "Categorias",
      value: categoryCount,
      icon: <IconGrid className="h-5 w-5" />,
      to: "/categories",
    },
    {
      label: "Tus favoritos",
      value: favoriteCount,
      icon: <IconHeart className="h-5 w-5" />,
      to: "/favorites",
    },
  ];

  return (
    <div>
      <PageHeader
        eyebrow={roleLabel(user?.role?.name)}
        title={`Hola, ${user?.first_name || "de nuevo"}`}
        description="Este es un resumen rapido de la actividad en el directorio."
      />

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.to}
            className="card-surface p-5 hover:shadow-md hover:-translate-y-0.5 transition"
          >
            <div className="h-10 w-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4">
              {stat.icon}
            </div>
            <p className="text-2xl font-display font-bold text-ink-900">
              {stat.value ?? "-"}
            </p>
            <p className="text-sm text-ink-500 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {isBusiness && (
        <div className="card-surface p-6 mb-8">
          <div className="flex items-center justify-between mb-1">
            <h2 className="font-display text-lg font-semibold text-ink-900">Tu negocio</h2>
            {myBusiness && (
              <Link to="/my-business" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Ver panel completo
              </Link>
            )}
          </div>

          {myBusiness ? (
            <div className="flex items-center gap-4 mt-3">
              <div className="h-14 w-14 rounded-xl bg-ink-100 overflow-hidden flex items-center justify-center shrink-0">
                {myBusiness.logo ? (
                  <img src={resolveUploadUrl(myBusiness.logo)} alt={myBusiness.name} className="h-full w-full object-cover" />
                ) : (
                  <IconStore className="h-6 w-6 text-ink-400" />
                )}
              </div>
              <div>
                <p className="font-semibold text-ink-900">{myBusiness.name}</p>
                <p className="text-sm text-ink-500 line-clamp-1">{myBusiness.description}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mt-3">
              <p className="text-sm text-ink-500">Aun no tienes un negocio registrado.</p>
              <Link to="/my-business">
                <Button size="sm"><IconPlus className="h-4 w-4" /> Registrar negocio</Button>
              </Link>
            </div>
          )}
        </div>
      )}

      {isAdmin && (
        <div className="card-surface p-6 mb-8 bg-gradient-to-br from-brand-600 to-brand-800 text-white border-none">
          <div className="flex items-center gap-2 mb-1">
            <IconSparkles className="h-5 w-5" />
            <h2 className="font-display text-lg font-semibold">Panel de administracion</h2>
          </div>
          <p className="text-brand-100 text-sm mb-4">
            Verifica negocios pendientes, gestiona usuarios y revisa reportes.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/admin/businesses">
              <Button variant="secondary" size="sm" className="bg-white/95">Ver negocios</Button>
            </Link>
            <Link to="/admin/reports">
              <Button variant="secondary" size="sm" className="bg-white/95">Ver reportes</Button>
            </Link>
          </div>
        </div>
      )}

      <div className="card-surface p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-display text-lg font-semibold text-ink-900">
            Negocios recientes
          </h2>
          <Link to="/businesses" className="text-sm font-medium text-brand-600 hover:text-brand-700">
            Ver todos
          </Link>
        </div>

        {recentBusinesses.length === 0 ? (
          <p className="text-sm text-ink-500">Aun no hay negocios publicados.</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentBusinesses.map((business) => (
              <Link
                key={business.id}
                to={`/businesses/${business.slug}`}
                className="rounded-xl border border-ink-100 p-3 hover:border-brand-300 hover:shadow-sm transition"
              >
                <div className="h-24 rounded-lg bg-ink-100 overflow-hidden mb-3 flex items-center justify-center">
                  {business.cover_image || business.logo ? (
                    <img
                      src={resolveUploadUrl(business.cover_image || business.logo)}
                      alt={business.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <IconStore className="h-6 w-6 text-ink-400" />
                  )}
                </div>
                <p className="font-medium text-ink-900 text-sm line-clamp-1">{business.name}</p>
                {business.category?.name && (
                  <Badge variant="brand">{business.category.name}</Badge>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
