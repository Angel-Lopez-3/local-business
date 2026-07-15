import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { resetPasswordRequest } from "../../api/authApi";
import { useToast } from "../../context/ToastContext";
import { Input, Button, Field } from "../../components/form";
import { IconSparkles } from "../../components/icons";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();

  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({ newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("El enlace de recuperacion no es valido.");
      return;
    }

    setLoading(true);

    try {
      await resetPasswordRequest({ token, ...form });
      toast.success("Contrasena restablecida. Ya puedes iniciar sesion.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "No se pudo restablecer la contrasena.");
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
          <h1 className="font-display text-2xl font-bold text-ink-900">Nueva contrasena</h1>
          <p className="text-ink-500 mt-1.5 text-sm">
            {token
              ? "Elige una nueva contrasena para tu cuenta."
              : "Este enlace no incluye un token valido. Solicita uno nuevo."}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 mt-7">
            <Field label="Nueva contrasena" required hint="Minimo 8 caracteres.">
              <Input
                name="newPassword"
                type="password"
                required
                minLength={8}
                value={form.newPassword}
                onChange={handleChange}
              />
            </Field>

            <Field label="Confirmar contrasena" required>
              <Input
                name="confirmPassword"
                type="password"
                required
                minLength={8}
                value={form.confirmPassword}
                onChange={handleChange}
              />
            </Field>

            <Button type="submit" className="w-full" size="lg" loading={loading} disabled={!token}>
              Restablecer contrasena
            </Button>
          </form>

          <p className="text-center mt-7 text-sm text-ink-500">
            <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">
              Volver a iniciar sesion
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
