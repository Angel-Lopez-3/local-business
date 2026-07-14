import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await register(form);

      navigate("/login");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Error al registrarse"
      );
    }
  };

  return (
    <div>
      <h1>Registro</h1>

      <form onSubmit={handleSubmit}>
        <input
          name="firstName"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <input
          name="lastName"
          placeholder="Apellido"
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Correo"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Contraseña"
          onChange={handleChange}
        />

        <button type="submit">
          Crear cuenta
        </button>
      </form>

      <Link to="/login">
        Ya tengo una cuenta
      </Link>
    </div>
  );
}