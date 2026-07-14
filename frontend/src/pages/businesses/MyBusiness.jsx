import { useEffect, useState } from "react";
import {
  getMyBusinessRequest,
  deleteBusinessRequest,
} from "../../api/businessApi";

import { useAuth } from "../../context/AuthContext";

export default function MyBusiness() {
  const { checkAuth } = useAuth();

  const [business, setBusiness] = useState(null);

  useEffect(() => {
    loadBusiness();
  }, []);

  const loadBusiness = async () => {
    try {
      const response =
        await getMyBusinessRequest();

      setBusiness(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "¿Eliminar este negocio?"
    );

    if (!confirmDelete) return;

    try {
      await deleteBusinessRequest(
        business.id
      );

      await checkAuth();

      setBusiness(null);

      alert(
        "Negocio eliminado correctamente"
      );
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Error eliminando negocio"
      );
    }
  };

  if (!business) {
    return (
      <p>
        No tienes negocio registrado.
      </p>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-4">
        {business.name}
      </h1>

      <p>{business.description}</p>

      <div className="mt-4">
        <strong>Teléfono:</strong>{" "}
        {business.phone}
      </div>

      <div>
        <strong>Email:</strong>{" "}
        {business.email}
      </div>

      <div>
        <strong>Dirección:</strong>{" "}
        {business.address}
      </div>

      <button
        onClick={handleDelete}
        className="mt-6 bg-red-600 text-white px-4 py-2 rounded"
      >
        Eliminar negocio
      </button>
    </div>
  );
}