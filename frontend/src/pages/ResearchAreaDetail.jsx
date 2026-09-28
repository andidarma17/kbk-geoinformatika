import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

export default function ResearchAreaDetail() {
  const { slug } = useParams();
  const [area, setArea] = useState(null);
  const [researchers, setResearchers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Promise.all([
      api.getResearchAreas(),
      api.getResearchers(),
      api.getProjects(),
      api.getPublications()
    ])
      .then(([areas, r, p, pub]) => {
        const match = areas.find((a) => a.slug === slug);
        if (!match) {
          setNotFound(true);
          return;
        }
        setArea(match);
        setResearchers(r.filter((x) => x.research_area_id === match.id));
        setProjects(p.filter((x) => x.research_area_id === match.id));
        setPublications(pub.filter((x) => x.research_area_id === match.id));
      })
      .catch((e) => setError(e.message));
  }, [slug]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load this research area. {error}
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        No research area found for "{slug}".{" "}
        <Link to="/research" className="text-navy font-semibold">Back to Research</Link>
      </div>
    );
  }

  if (!area) return null;

  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <Link to="/research" className="text-blue-100/70 text-sm font-semibold hover:text-white">
            ← All Research
          </Link>
          <h1 className="font-display font-bold text-[32px] md:text-[42px] leading-tight mt-3">
            {area.name}
          </h1>
          <p className="mt-4 text-[16px] text-blue-100/80">{area.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {area.tags.map((t) => (
              <span key={t} className="text-xs font-medium text-white border border-white/40 rounded-full px-2.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-3 gap-10">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Researchers ({researchers.length})
            </h2>
            <ul className="space-y-3">
              {researchers.map((r) => (
                <li key={r.id}>
                  <div className="font-semibold text-[14.5px]">{r.name}</div>
                  <div className="text-gray-500 text-[13px]">{r.role}</div>
                </li>
              ))}
              {researchers.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Projects ({projects.length})
            </h2>
            <ul className="space-y-3">
              {projects.map((p) => (
                <li key={p.id}>
                  <div className="font-semibold text-[14.5px]">{p.title}</div>
                  <div className="text-gray-500 text-[13px]">{p.year} &middot; {p.status}</div>
                </li>
              ))}
              {projects.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
              Publications ({publications.length})
            </h2>
            <ul className="space-y-3">
              {publications.map((p) => (
                <li key={p.id}>
                  <div className="font-semibold text-[14.5px]">{p.title}</div>
                  <div className="text-gray-500 text-[13px]">{p.venue} &middot; {p.year}</div>
                </li>
              ))}
              {publications.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}