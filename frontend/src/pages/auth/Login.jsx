import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import { Input, Button, Field } from "../../components/form";
import { IconSparkles, IconMail } from "../../components/icons";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToast();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target }) => {
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const user = await login(form);
      toast.success(`Bienvenido de nuevo${user?.first_name ? ", " + user.first_name : ""}.`);
      navigate(location.state?.from?.pathname || "/dashboard", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || "Correo o contrasena incorrectos.");
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
          <h1 className="font-display text-2xl font-bold text-ink-900">Bienvenido de nuevo</h1>
          <p className="text-ink-500 mt-1.5 text-sm">Inicia sesion para gestionar tu cuenta.</p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-7">
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

            <Field label="Contrasena" required>
              <Input
                name="password"
                type="password"
                required
                placeholder="********"
                value={form.password}
                onChange={handleChange}
              />
            </Field>

            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm font-medium text-brand-600 hover:text-brand-700">
                Olvidaste tu contrasena?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg" loading={loading}>
              Iniciar sesion
            </Button>
          </form>

          <p className="text-center mt-7 text-sm text-ink-500">
            No tienes cuenta?{" "}
            <Link to="/register" className="text-brand-600 font-semibold hover:text-brand-700">
              Registrate gratis
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
