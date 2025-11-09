const Footer = () => {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-8 text-center text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <p>&copy; {new Date().getFullYear()} E-Market. Tous droits réservés.</p>
        <div className="flex justify-center gap-4 sm:justify-end">
          <a
            href="mailto:contact@e-market.test"
            className="transition hover:text-emerald-600"
          >
            Contact
          </a>
          <a href="#" className="transition hover:text-emerald-600">
            Mentions légales
          </a>
          <a href="#" className="transition hover:text-emerald-600">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

