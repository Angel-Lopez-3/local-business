import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Nombre
          </h3>

          <p className="font-bold text-xl">
            {user?.first_name}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Apellido
          </h3>

          <p className="font-bold text-xl">
            {user?.last_name}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Correo
          </h3>

          <p className="font-bold">
            {user?.email}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-gray-500">
            Rol
          </h3>

          <p className="font-bold">
            {user?.role?.name}
          </p>
        </div>
      </div>
    </div>
  );
}