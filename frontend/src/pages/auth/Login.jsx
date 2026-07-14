import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setForm({
      ...form,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(form);
      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Error al iniciar sesión"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Local Business
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Inicia sesión para continuar
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-600 font-semibold"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
}