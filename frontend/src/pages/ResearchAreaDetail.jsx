import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";

export default function ResearchAreaDetail() {
  const { slug } = useParams();
  const [area, setArea] = useState(null);
  const [researchers, setResearchers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [intellectualProperty, setIntellectualProperty] = useState([]);
  const [communityServices, setCommunityServices] = useState([]);
  const [error, setError] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;
    setArea(null);
    setError(null);
    setNotFound(false);
    Promise.all([
      api.getResearchAreas(),
      api.getResearchers(),
      api.getProjects(),
      api.getPublications(),
      api.getEpistemologies(),
      api.getWorks("intellectual-property"),
      api.getWorks("community-services")
    ])
      .then(([areas, r, p, pub, e, ip, community]) => {
        if (!active) return;
        const match = areas.find((a) => a.slug === slug);
        if (!match) {
          setNotFound(true);
          return;
        }
        setArea(match);
        setResearchers(r.filter((x) => x.research_area_id === match.id));
        setProjects(p.filter((x) => x.research_area_id === match.id));
        setPublications(pub.filter((x) => x.research_area_id === match.id));
        setEpistemologies(e.filter((x) => x.research_area_id === match.id));
        setIntellectualProperty(ip.filter((x) => x.research_area_id === match.id));
        setCommunityServices(community.filter((x) => x.research_area_id === match.id));
      })
      .catch((e) => { if (active) setError(e.message); });
    return () => { active = false; };
  }, [slug]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load this Ontology. {error}
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        No Ontology found for "{slug}".{" "}
        <Link to="/research" className="text-navy font-semibold">Back to Field of Study</Link>
      </div>
    );
  }

  if (!area) return null;

  return (
    <>
      <section className="bg-navy text-white py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <Link to="/research" className="text-blue-100/70 text-sm font-semibold hover:text-white">
            ← All Fields of Study
          </Link>
          <h1 className="font-display font-bold text-[32px] md:text-[42px] leading-tight mt-3">
            {area.name}
          </h1>
          <p className="mt-4 text-[16px] text-blue-100/80">{area.description}</p>
          <div className="flex flex-wrap gap-2 mt-5">
            {(area.tags || []).map((t) => (
              <span key={t} className="text-xs font-medium text-white border border-white/40 rounded-full px-2.5 py-0.5">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 md:px-8 pt-12">
        <h2 className="text-xl font-bold mb-4">Epistemology</h2>
        {epistemologies.length ? <div className="grid md:grid-cols-2 gap-4">
          {epistemologies.map((item) => <div key={item.id} className="border border-gray-200 rounded-lg p-5 bg-white">
            <h3 className="font-semibold text-navy">{item.name}</h3>
            {item.description && <p className="text-sm text-gray-600 mt-2">{item.description}</p>}
          </div>)}
        </div> : <p className="text-gray-500">No Epistemology listed yet.</p>}
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
                  <Link to={`/people/${r.id}`} className="block group">
                    <div className="font-semibold text-[14.5px] group-hover:text-navy group-hover:underline">
                      {r.name}
                    </div>
                    <div className="text-gray-500 text-[13px]">{r.role}</div>
                  </Link>
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
                  <Link to={`/projects/${p.id}`} className="block group">
                    <div className="font-semibold text-[14.5px] group-hover:text-navy group-hover:underline">
                      {p.title}
                    </div>
                    <div className="text-gray-500 text-[13px]">{p.year} &middot; {p.status}</div>
                  </Link>
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
                  <Link to={`/publications/${p.id}`} className="block group">
                    <div className="font-semibold text-[14.5px] group-hover:text-navy group-hover:underline">
                      {p.title}
                    </div>
                    <div className="text-gray-500 text-[13px]">{p.venue} &middot; {p.year}</div>
                  </Link>
                </li>
              ))}
              {publications.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
            </ul>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-6 md:px-8 pb-16 grid md:grid-cols-2 gap-8">
        {[["Intellectual Property/Patent", intellectualProperty, "intellectual-property"], ["Community Services", communityServices, "community-services"]].map(([label, items, path]) =>
          <div key={path}>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">{label} ({items.length})</h2>
            <ul className="space-y-3">{items.map((item) => <li key={item.id}>
              <Link className="font-semibold text-navy hover:underline" to={`/${path}/${item.id}`}>{item.title}</Link>
              {item.year && <span className="text-gray-500 text-sm"> · {item.year}</span>}
            </li>)}
            {!items.length && <li className="text-gray-400 text-sm">None listed yet.</li>}</ul>
          </div>) }
      </section>
    </>
  );
}
