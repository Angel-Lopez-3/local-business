import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getSectorsRequest } from "../../api/sectorApi";
import { PageHeader } from "../../components/form";
import LoadingSpinner from "../../components/LoadingSpinner";
import EmptyState from "../../components/EmptyState";
import { IconMapPin } from "../../components/icons";

export default function Sectors() {
  const navigate = useNavigate();
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    try {
      const response = await getSectorsRequest();
      setSectors(response.data.data);
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
        title="Sectores"
        description="Negocios organizados por zona geografica."
      />

      {sectors.length === 0 ? (
        <EmptyState icon={<IconMapPin className="h-6 w-6" />} title="No hay sectores disponibles" />
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map((sector) => (
            <button
              key={sector.id}
              onClick={() => navigate(`/businesses?sector=${sector.id}`)}
              className="card-surface p-5 text-left hover:shadow-md hover:-translate-y-0.5 transition flex items-center gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <IconMapPin className="h-5 w-5" />
              </div>
              <div>
                <p className="font-display font-semibold text-ink-900">{sector.name}</p>
                <p className="text-sm text-ink-500">{sector.city}</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
