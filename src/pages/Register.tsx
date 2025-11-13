import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useAuth } from "../context/AuthContext";

type RegisterFormState = {
  fullName: string;
  email: string;
  password: string;
};

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState<RegisterFormState>({
    fullName: "",
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
      await register(form);
      navigate("/");
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Impossible de créer le compte. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col gap-8 px-4 py-12">
      <header className="space-y-2 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          authentification
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Créer un compte</h1>
        <p className="text-sm text-slate-600">
          Version statique du formulaire d’inscription. À connecter à l’API par
          la suite.
        </p>
      </header>

      <form
        className="space-y-6 rounded-xl border border-slate-200 bg-white p-8 shadow-sm"
        onSubmit={handleSubmit}
      >
        <label className="block space-y-2">
          <span className="text-sm font-medium text-slate-700">Nom complet</span>
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            placeholder="Nom et prénom"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-black focus:ring-2 focus:ring-slate-200"
            autoComplete="name"
            required
            onChange={handleChange}
          />
        </label>

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
            placeholder="Minimum 8 caractères"
            className="w-full rounded-md border border-slate-300 px-4 py-2 text-slate-900 outline-none focus:border-black focus:ring-2 focus:ring-slate-200"
            autoComplete="new-password"
            required
            onChange={handleChange}
          />
        </label>

        {error && <ErrorMessage description={error} />}

        <Button
          type="submit"
          fullWidth
          isLoading={isSubmitting}
          disabled={!form.email || !form.password || !form.fullName}
        >
          S’inscrire
        </Button>
      </form>

      <p className="text-center text-sm text-slate-600">
        Déjà inscrit ?{" "}
        <Link to="/login" className="font-semibold text-black underline hover:text-slate-600">
          Connectez-vous
        </Link>
      </p>
    </main>
  );
};

export default Register;

