import { useEffect, useState } from "react";
import { getBusinessesRequest } from "../../api/businessApi";
import { Link } from "react-router-dom";

export default function Businesses() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const response =
        await getBusinessesRequest();

      setBusinesses(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Cargando negocios...</p>;
  }

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Negocios
        </h1>

        <Link
        to="/businesses/create"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Nuevo Negocio
      </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {businesses.map((business) => (
          <div
            key={business.id}
            className="bg-white rounded-xl shadow p-5"
          >
            <h2 className="text-xl font-bold">
              {business.name}
            </h2>

            <p className="text-gray-500 mt-2">
              {business.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}