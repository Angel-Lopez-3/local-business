import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getBusinessesRequest } from "../../api/businessApi";
import { getCategoriesRequest } from "../../api/categoryApi";
import { getSectorsRequest } from "../../api/sectorApi";
import { resolveUploadUrl } from "../../utils/media";
import { PageHeader, Select, Input } from "../../components/form";
import Badge from "../../components/Badge";
import EmptyState from "../../components/EmptyState";
import LoadingSpinner from "../../components/LoadingSpinner";
import { IconStore, IconSearch, IconMapPin, IconGrid } from "../../components/icons";

export default function Businesses() {
  const [searchParams] = useSearchParams();
  const [businesses, setBusinesses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(searchParams.get("category") || "");
  const [sectorFilter, setSectorFilter] = useState(searchParams.get("sector") || "");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);

    try {
      const [businessesRes, categoriesRes, sectorsRes] = await Promise.all([
        getBusinessesRequest(),
        getCategoriesRequest(),
        getSectorsRequest(),
      ]);

      setBusinesses(businessesRes.data.data);
      setCategories(categoriesRes.data.data);
      setSectors(sectorsRes.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = useMemo(() => {
    return businesses.filter((business) => {
      const matchesSearch =
        !search ||
        business.name.toLowerCase().includes(search.toLowerCase()) ||
        business.description?.toLowerCase().includes(search.toLowerCase());

      const matchesCategory = !categoryFilter || business.category?.id === categoryFilter;
      const matchesSector = !sectorFilter || business.sector?.id === sectorFilter;

      return matchesSearch && matchesCategory && matchesSector;
    });
  }, [businesses, search, categoryFilter, sectorFilter]);

  return (
    <div>
      <PageHeader
        eyebrow="Directorio"
        title="Negocios locales"
        description="Explora negocios verificados en tu comunidad."
      />

      <div className="card-surface p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <IconSearch className="h-4 w-4 text-ink-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <Input
            placeholder="Buscar negocios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="sm:w-52">
          <option value="">Todas las categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

        <Select value={sectorFilter} onChange={(e) => setSectorFilter(e.target.value)} className="sm:w-52">
          <option value="">Todos los sectores</option>
          {sectors.map((sector) => (
            <option key={sector.id} value={sector.id}>
              {sector.name}
            </option>
          ))}
        </Select>
      </div>

      {loading ? (
        <LoadingSpinner label="Cargando negocios..." />
      ) : filtered.length === 0 ? (
        <EmptyState
          icon={<IconStore className="h-6 w-6" />}
          title="No se encontraron negocios"
          description="Intenta ajustar la busqueda o los filtros."
        />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((business) => (
            <Link
              key={business.id}
              to={`/businesses/${business.slug}`}
              className="card-surface overflow-hidden hover:shadow-lg hover:-translate-y-1 transition group"
            >
              <div className="h-36 bg-ink-100 overflow-hidden relative">
                {business.cover_image || business.logo ? (
                  <img
                    src={resolveUploadUrl(business.cover_image || business.logo)}
                    alt={business.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <IconStore className="h-8 w-8 text-ink-300" />
                  </div>
                )}
              </div>

              <div className="p-4">
                <h3 className="font-display font-semibold text-ink-900 line-clamp-1">
                  {business.name}
                </h3>

                <p className="text-sm text-ink-500 mt-1 line-clamp-2 min-h-[2.5rem]">
                  {business.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {business.category?.name && (
                    <Badge variant="brand" icon={<IconGrid className="h-3 w-3" />}>
                      {business.category.name}
                    </Badge>
                  )}
                  {business.sector?.name && (
                    <Badge variant="ink" icon={<IconMapPin className="h-3 w-3" />}>
                      {business.sector.name}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
