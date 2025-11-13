import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useAuth } from "../context/AuthContext";

type LoginFormState = {
  email: string;
  password: string;
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<LoginFormState>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login(form);
      navigate("/");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Impossible de vous connecter. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-lg flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          authentification
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Connexion</h1>
        <p className="text-sm text-slate-600">
          Formulaire statique. Il sera relié à l’API plus tard.
        </p>
      </header>

      <form
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">
            Adresse e-mail
          </span>
          <input
            type="email"
            name="email"
            value={form.email}
            placeholder="exemple@domaine.com"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-black focus:ring-2 focus:ring-slate-200"
            autoComplete="email"
            required
            onChange={handleChange}
          />
        </label>

        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Mot de passe</span>
          <input
            type="password"
            name="password"
            value={form.password}
            placeholder="••••••••"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-black focus:ring-2 focus:ring-slate-200"
            autoComplete="current-password"
            required
            onChange={handleChange}
          />
        </label>

        {error && <ErrorMessage description={error} />}

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={!form.email || !form.password}
        >
          Se connecter
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Pas encore de compte ?{" "}
        <Link to="/register" className="font-semibold text-black underline hover:text-slate-600">
          Inscrivez-vous
        </Link>
      </p>
    </main>
  );
};

export default Login;

