import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCategoriesRequest } from "../../api/categoryApi";
import { PageHeader } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { IconGrid } from "../../components/icons";

export default function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await getCategoriesRequest();
      setCategories(response.data.data.filter((c) => c.is_active));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <PageHeader
        eyebrow="Explorar"
        title="Categorias"
        description="Encuentra negocios organizados por tipo de servicio."
      />

      {categories.length === 0 ? (
        <EmptyState icon={<IconGrid className="h-6 w-6" />} title="No hay categorias disponibles" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => navigate(`/businesses?category=${category.id}`)}
              className="card-surface p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition"
            >
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center mb-4 text-xl">
                {category.icon || <IconGrid className="h-5 w-5" />}
              </div>
              <p className="font-display font-semibold text-ink-900">{category.name}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
