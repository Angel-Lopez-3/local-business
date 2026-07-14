import { useEffect, useState } from "react";
import { getSectorsRequest } from "../../api/sectorApi";

export default function Sectors() {
  const [sectors, setSectors] = useState([]);

  useEffect(() => {
    loadSectors();
  }, []);

  const loadSectors = async () => {
    try {
      const response =
        await getSectorsRequest();

      setSectors(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Sectores
      </h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">
                ID
              </th>

              <th className="p-4 text-left">
                Nombre
              </th>
            </tr>
          </thead>

          <tbody>
            {sectors.map((sector) => (
              <tr
                key={sector.id}
                className="border-t"
              >
                <td className="p-4">
                  {sector.id}
                </td>

                <td className="p-4">
                  {sector.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}