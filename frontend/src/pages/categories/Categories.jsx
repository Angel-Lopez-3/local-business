import { useEffect, useState } from "react";
import { getCategoriesRequest } from "../../api/categoryApi";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response =
        await getCategoriesRequest();

      setCategories(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Categorías
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="text-left p-4">
                ID
              </th>

              <th className="text-left p-4">
                Nombre
              </th>

              <th className="text-left p-4">
                Slug
              </th>
            </tr>
          </thead>

          <tbody>
            {categories.map((category) => (
              <tr
                key={category.id}
                className="border-t"
              >
                <td className="p-4">
                  {category.id}
                </td>

                <td className="p-4">
                  {category.name}
                </td>

                <td className="p-4">
                  {category.slug}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}