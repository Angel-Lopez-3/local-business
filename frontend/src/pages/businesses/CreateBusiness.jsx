import { useEffect, useState } from "react";
import { createBusinessRequest } from "../../api/businessApi";
import { getCategoriesRequest } from "../../api/categoryApi";
import { getSectorsRequest } from "../../api/sectorApi";
import { useNavigate } from "react-router-dom";

export default function CreateBusiness() {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [sectors, setSectors] = useState([]);

  const [form, setForm] = useState({
    category_id: "",
    sector_id: "",
    name: "",
    description: "",
    phone: "",
    email: "",
    address: "",
  });

  const [logo, setLogo] = useState(null);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const categoriesResponse =
      await getCategoriesRequest();

    const sectorsResponse =
      await getSectorsRequest();

    setCategories(categoriesResponse.data.data);
    setSectors(sectorsResponse.data.data);
  };

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      Object.entries(form).forEach(
        ([key, value]) => {
          formData.append(key, value);
        }
      );

      if (logo) {
        formData.append("logo", logo);
      }

      if (cover) {
        formData.append(
          "cover_image",
          cover
        );
      }

      await createBusinessRequest(
        formData
      );

      alert("Negocio creado");

      navigate("/businesses");
    } catch (error) {
      console.error(error);
      alert("Error al crear negocio");
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
      <h1 className="text-3xl font-bold mb-8">
        Crear Negocio
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Descripción"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          name="address"
          placeholder="Dirección"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <select
          name="category_id"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">
            Categoría
          </option>

          {categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))}
        </select>

        <select
          name="sector_id"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">
            Sector
          </option>

          {sectors.map((sector) => (
            <option
              key={sector.id}
              value={sector.id}
            >
              {sector.name}
            </option>
          ))}
        </select>

        <div>
          <label>Logo</label>

          <input
            type="file"
            onChange={(e) =>
              setLogo(e.target.files[0])
            }
          />
        </div>

        <div>
          <label>Portada</label>

          <input
            type="file"
            onChange={(e) =>
              setCover(e.target.files[0])
            }
          />
        </div>

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Crear Negocio
        </button>
      </form>
    </div>
  );
}