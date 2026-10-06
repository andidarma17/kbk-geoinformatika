import ErrorNotice from "../components/ErrorNotice";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../api";
import { joinMeta } from "../utils/joinMeta";
import { usePageMeta } from "../utils/usePageMeta";

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
  usePageMeta({ title: area?.name ?? "Field of Study (Ontology)", description: area?.description || "Explore a KBK Geoinformatika Ontology, its Epistemologies, researchers, and outputs." });

  useEffect(() => {
    let active = true;
    setArea(null);
    setError(null);
    setNotFound(false);
    (async () => {
      try {
        const match = await api.getResearchAreaBySlug(slug);
        if (!active) return;
        if (!match) {
          setNotFound(true);
          return;
        }
        const researchAreaId = match.id;
        const [r, p, pub, e, ip, community] = await Promise.all([
          api.getResearchers({ researchAreaId }),
          api.getProjects({ researchAreaId }),
          api.getPublications({ researchAreaId }),
          api.getEpistemologies({ researchAreaId }),
          api.getWorks("intellectual-property", { researchAreaId }),
          api.getWorks("community-services", { researchAreaId }),
        ]);
        if (!active) return;
        setArea(match);
        setResearchers(r);
        setProjects(p);
        setPublications(pub);
        setEpistemologies(e);
        setIntellectualProperty(ip);
        setCommunityServices(community);
      } catch (e) {
        if (active) { console.error("Failed to load content:", e); setError(true); }
      }
    })();
    return () => { active = false; };
  }, [slug]);

  if (error) return <ErrorNotice />;

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
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
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
              {researchers.length === 0 && <li className="text-gray-500 text-sm">None listed yet.</li>}
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
                    <div className="text-gray-500 text-[13px]">{joinMeta(p.year, p.status)}</div>
                  </Link>
                </li>
              ))}
              {projects.length === 0 && <li className="text-gray-500 text-sm">None listed yet.</li>}
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
                    <div className="text-gray-500 text-[13px]">{joinMeta(p.venue, p.year)}</div>
                  </Link>
                </li>
              ))}
              {publications.length === 0 && <li className="text-gray-500 text-sm">None listed yet.</li>}
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
            {!items.length && <li className="text-gray-500 text-sm">None listed yet.</li>}</ul>
          </div>) }
      </section>
    </>
  );
}
