const Footer = () => {
  return (
    <footer className="border-t border-black bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-12 text-left text-xs uppercase tracking-wider text-slate-700">
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
          <p>ALL RIGHTS RESERVED</p>
          <p>EST. /2025</p>
          <p>MADE IN - MOROCCO</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-6 text-sm font-medium">
          <a
            href="mailto:contact@e-market.test"
            className="transition hover:text-black"
          >
            CONTACT
          </a>
          <a href="#" className="transition hover:text-black">
            MENTIONS LÉGALES
          </a>
          <a href="#" className="transition hover:text-black">
            POLITIQUE DE CONFIDENTIALITÉ
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

