import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordRequest } from "../../api/authApi";
import { Input, Button, Field } from "../../components/form";
import { IconSparkles, IconCheck } from "../../components/icons";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await forgotPasswordRequest({ email });
      setSent(true);
    } catch (error) {
      setSent(true);
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
          {sent ? (
            <div className="text-center py-4">
              <div className="h-12 w-12 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center mx-auto mb-4">
                <IconCheck className="h-6 w-6" />
              </div>
              <h1 className="font-display text-xl font-bold text-ink-900">Revisa tu correo</h1>
              <p className="text-ink-500 mt-2 text-sm">
                Si el correo existe en nuestro sistema, te enviamos un enlace para restablecer tu
                contrasena.
              </p>
              <Link
                to="/login"
                className="inline-block mt-6 text-brand-600 font-semibold hover:text-brand-700 text-sm"
              >
                Volver a iniciar sesion
              </Link>
            </div>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-ink-900">
                Recupera tu contrasena
              </h1>
              <p className="text-ink-500 mt-1.5 text-sm">
                Ingresa tu correo y te enviaremos instrucciones.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 mt-7">
                <Field label="Correo electronico" required>
                  <Input
                    type="email"
                    required
                    placeholder="tucorreo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Field>

                <Button type="submit" className="w-full" size="lg" loading={loading}>
                  Enviar enlace
                </Button>
              </form>

              <p className="text-center mt-7 text-sm text-ink-500">
                <Link to="/login" className="text-brand-600 font-semibold hover:text-brand-700">
                  Volver a iniciar sesion
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
