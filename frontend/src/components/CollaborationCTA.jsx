import { Link } from "react-router-dom";

// Background source: https://geodesi.ugm.ac.id/wp-content/uploads/sites/8/2026/04/Untitled-design-8.png
export default function CollaborationCTA({ id }) {
  return (
    <section id={id} className="relative isolate overflow-hidden bg-navy-dark text-white">
      <img src="/collaboration-geodesi.png" alt="" aria-hidden="true" loading="lazy" decoding="async"
        className="absolute inset-0 w-full h-full object-cover object-[72%_center] pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-navy-dark/85" />
      <div className="relative max-w-6xl mx-auto px-6 md:px-8 py-14 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="text-[26px] font-bold text-white max-w-[520px]">
            Open to collaboration with academic, government, and industry partners.
          </h2>
          <p className="text-blue-100 mt-2 text-[14.5px]">
            Reach out to discuss research partnerships, student projects, or applied geospatial work.
          </p>
        </div>
        <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14.5px] bg-amber text-navy-dark hover:bg-amber-dark transition-colors">
          Contact the group
        </Link>
      </div>
    </section>
  );
}
