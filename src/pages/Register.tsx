import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/ui/Button";
import ErrorMessage from "../components/ui/ErrorMessage";
import { useAuth } from "../context/AuthContext";
import logoImage from "../assets/image copy 2.png";
import registerImage from "../assets/image copy 3.png";

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
    <main className="flex h-screen w-full overflow-hidden">
      {/* Left Section - Register Form */}
      <div className="relative flex w-full flex-col items-center justify-center bg-white px-8 py-12 lg:w-1/2 lg:overflow-y-auto">
        {/* Logo cliquable en haut à gauche */}
        <Link
          to="/"
          className="absolute left-8 top-8 z-10 transition-opacity hover:opacity-80"
        >
          <img
            src={logoImage}
            alt="E-Market Logo"
            className="h-12 w-12 cursor-pointer"
          />
        </Link>
        <div className="w-full max-w-md space-y-8">
          {/* Register Title */}
          <h1 className="text-5xl font-bold text-black">Register</h1>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                placeholder="John Doe"
                className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-black placeholder-slate-400 outline-none focus:border-black"
                autoComplete="name"
                required
                onChange={handleChange}
              />
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                placeholder="email@example.com"
                className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-black placeholder-slate-400 outline-none focus:border-black"
                autoComplete="email"
                required
                onChange={handleChange}
              />
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-bold text-black">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                placeholder="••••••••"
                className="w-full border-b border-slate-300 bg-transparent px-0 py-2 text-black placeholder-slate-400 outline-none focus:border-black"
                autoComplete="new-password"
                required
                onChange={handleChange}
              />
            </div>

            {/* Error Message */}
            {error && <ErrorMessage description={error} />}

            {/* Sign Up Button */}
            <Button
              type="submit"
              fullWidth
              isLoading={isSubmitting}
              disabled={!form.email || !form.password || !form.fullName}
              className="mt-8 rounded-sm"
            >
              Sign Up
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-sm text-slate-500">
            already have account ?{" "}
            <Link
              to="/login"
              className="font-semibold text-black hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden w-1/2 bg-white lg:block lg:overflow-hidden">
        <img
          src={registerImage}
          alt="Register"
          className="h-full w-full object-cover object-center"
        />
      </div>
    </main>
  );
};

export default Register;

