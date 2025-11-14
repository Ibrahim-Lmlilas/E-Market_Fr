import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="text-sm text-red-600">Vous devez être connecté pour voir votre profil.</p>
          <Link to="/login" className="mt-4 inline-block">
            <button className="rounded-lg border border-black bg-transparent px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white">
              Se connecter
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[60vh] max-w-4xl px-4 py-12">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-black">Mon Profil</h1>
          <p className="mt-2 text-sm text-slate-600">Gérez vos informations personnelles</p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700">Nom complet</label>
              <p className="mt-1 text-lg text-black">{user.fullName}</p>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <label className="block text-sm font-semibold text-slate-700">Email</label>
              <p className="mt-1 text-lg text-black">{user.email}</p>
            </div>

            {user.role && (
              <div className="border-t border-slate-200 pt-6">
                <label className="block text-sm font-semibold text-slate-700">Rôle</label>
                <span className="mt-1 inline-block rounded-full border border-black bg-white px-3 py-1 text-sm font-semibold uppercase tracking-wide text-black">
                  {user.role}
                </span>
              </div>
            )}

            {user._id && (
              <div className="border-t border-slate-200 pt-6">
                <label className="block text-sm font-semibold text-slate-700">ID Utilisateur</label>
                <p className="mt-1 text-sm text-slate-600 font-mono">{user._id}</p>
              </div>
            )}

            <div className="border-t border-slate-200 pt-6">
              <Link to="/" className="inline-block">
                <button className="rounded-lg border border-black bg-transparent px-5 py-3 text-base font-semibold text-black transition hover:bg-black hover:text-white">
                  Retour à l'accueil
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;


