import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Input, Button, Field } from "../../components/form";
import { IconSparkles } from "../../components/icons";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await register(form);
      toast.success("Cuenta creada. Ahora puedes iniciar sesion.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error al registrarse.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-950 flex items-center justify-center px-4 py-10 relative overflow-hidden">
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-brand-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-brand-700/20 blur-3xl" />

      <div className="relative w-full max-w-md rise-in">
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="h-11 w-11 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-900/40">
            <IconSparkles className="h-6 w-6 text-white" />
          </div>
          <span className="font-display text-2xl font-bold text-white">Localia</span>
        </div>

        <div className="card-surface p-8">
          <h1 className="font-display text-2xl font-bold text-ink-900">Crea tu cuenta</h1>
          <p className="text-ink-500 mt-1.5 text-sm">
            Descubre negocios locales o registra el tuyo propio.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-7">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Nombre" required>
                <Input
                  name="firstName"
                  required
                  minLength={2}
                  placeholder="Ana"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </Field>

              <Field label="Apellido" required>
                <Input
                  name="lastName"
                  required
                  minLength={2}
                  placeholder="Perez"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </Field>
            </div>

            <Field label="Correo electronico" required>
              <Input
                name="email"
                type="email"
                required
                placeholder="tucorreo@ejemplo.com"
                value={form.email}
                onChange={handleChange}
              />
            </Field>

            <Field label="Contrasena" required hint="Minimo 8 caracteres.">
              <Input
                name="password"
                type="password"
                required
                minLength={8}
                placeholder="********"
                value={form.password}
                onChange={handleChange}
              />
            </Field>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Crear cuenta
            </Button>
          </form>

          <p className="text-center mt-7 text-sm text-ink-500">
            Ya tienes una cuenta?{" "}
            <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">
              Inicia sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
