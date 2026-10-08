import PageHero from "../components/PageHero";
import ErrorNotice from "../components/ErrorNotice";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import PersonPhoto from "../components/PersonPhoto";
import { joinMeta } from "../utils/joinMeta";
import { safeUrl } from "../utils/safeUrl";
import { usePageMeta } from "../utils/usePageMeta";

const orcidUrl = (v) => (/^https?:\/\//.test(v) ? v : `https://orcid.org/${v}`);

export default function PersonDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState(null);
  usePageMeta({ title: person?.name ?? "Researcher profile", description: person?.name ? `Research profile and outputs of ${person.name} at KBK Geoinformatika.` : "Researcher profile at KBK Geoinformatika." });

  useEffect(() => {
    setPerson(undefined);
    if (!/^\d+$/.test(id)) {
      setPerson(null);
      return;
    }
    api.getResearcher(id).then(setPerson).catch((e) => { console.error("Failed to load content:", e); setError(true); });
  }, [id]);

  if (error) return <ErrorNotice />;
  if (person === undefined) return null;
  if (person === null) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Profile not found.{" "}
        <Link to="/people" className="text-navy font-semibold">Back to People</Link>
      </div>
    );
  }

  const education = (person.education || "").split("\n").map((s) => s.trim()).filter(Boolean);
  const interests = (person.interests || "").split("\n").map((s) => s.trim()).filter(Boolean);
  const scholarUrl = safeUrl(person.scholar_url);
  const profileOrcidUrl = person.orcid?.trim() ? safeUrl(orcidUrl(person.orcid.trim())) : null;
  const profileButtonClass = "inline-flex items-center justify-center min-h-11 px-4 py-2 rounded-md border border-navy/25 text-navy font-semibold hover:bg-navy hover:text-white transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy";

  return (
    <>
      <PageHero theme="people" className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <Link to="/people" className="text-blue-100/70 text-sm font-semibold hover:text-white">
            ← All People
          </Link>
          <h1 className="font-display font-bold text-[30px] md:text-[40px] leading-tight mt-3">
            {person.name}
          </h1>
          <p className="mt-2 text-blue-100/80">
            {person.role}
            {person.area_name && (
              <>
                {person.role && " · "}
                {person.area_slug ? (
                  <Link to={`/research/${person.area_slug}`} className="underline hover:text-white">
                    {person.area_name}
                  </Link>
                ) : (
                  person.area_name
                )}
              </>
            )}
          </p>
          {person.epistemology_name && <p className="mt-2 text-blue-100/80">Epistemology: {person.epistemology_name}</p>}
        </div>
      </PageHero>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[260px_1fr] gap-10">
          <aside>
            <PersonPhoto person={person} className="w-full max-w-[260px] aspect-square rounded-lg mb-5 mx-auto" />
            <div className="space-y-3 text-[14px] text-center">
              {person.email && (
                <div>
                  <a href={`mailto:${person.email}`} className="text-navy font-semibold break-all">
                    {person.email}
                  </a>
                </div>
              )}
              <div className="flex flex-wrap justify-center gap-2">
                {profileOrcidUrl && (
                  <a href={profileOrcidUrl} target="_blank" rel="noreferrer" className={profileButtonClass}>
                    ORCID <span aria-hidden="true" className="ml-2">↗</span>
                  </a>
                )}
                {scholarUrl && (
                  <a href={scholarUrl} target="_blank" rel="noreferrer" className={profileButtonClass}>
                    Google Scholar <span aria-hidden="true" className="ml-2">↗</span>
                  </a>
                )}
              </div>
            </div>
          </aside>

          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Research Interests</h2>
              {interests.length > 0 ? (
                <ul className="space-y-2">
                  {interests.map((line, i) => (
                    <li key={i} className="text-[15px] text-gray-700 flex gap-2">
                      <span className="text-navy">&middot;</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Not listed yet.</p>
              )}
            </div>


            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Education</h2>
              {education.length > 0 ? (
                <ul className="space-y-2">
                  {education.map((line, i) => (
                    <li key={i} className="text-[15px] text-gray-700 flex gap-2">
                      <span className="text-navy">&middot;</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-sm">Not listed yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Projects ({person.projects.length})
              </h2>
              <ul className="space-y-4">
                {person.projects.map((p) => (
                  <li key={p.id}>
                    <Link to={`/projects/${p.id}`} className="font-semibold text-[15px] text-navy hover:underline">{p.title}</Link>
                    <div className="text-gray-500 text-[13px]">
                      {joinMeta(p.year, p.status, p.area_name)}
                    </div>
                    {p.summary && <p className="text-[14px] text-gray-600 mt-1">{p.summary}</p>}
                  </li>
                ))}
                {person.projects.length === 0 && <li className="text-gray-500 text-sm">None listed yet.</li>}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Publications ({person.publications.length})
              </h2>
              <ul className="space-y-4">
                {person.publications.map((p) => (
                  <li key={p.id}>
                    <Link to={`/publications/${p.id}`} className="font-semibold text-[15px] text-navy hover:underline">{p.title}</Link>
                    <div className="text-gray-500 text-[13px]">
                      {joinMeta(p.authors, p.venue, p.year)}
                    </div>
                    <div className="flex gap-4 mt-1">
                      {safeUrl(p.doi_url) && (
                        <a href={safeUrl(p.doi_url)} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">DOI</a>
                      )}
                      {safeUrl(p.pdf_url) && (
                        <a href={safeUrl(p.pdf_url)} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">PDF</a>
                      )}
                    </div>
                  </li>
                ))}
                {person.publications.length === 0 && <li className="text-gray-500 text-sm">None listed yet.</li>}
              </ul>
            </div>
            {[["Intellectual Property/Patent", person.intellectual_properties, "intellectual-property"], ["Community Services", person.community_services, "community-services"]].map(([label, items, path]) =>
              <div key={path}>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">{label} ({items.length})</h2>
                <ul className="space-y-3">{items.map((item) => <li key={item.id}>
                  <Link className="text-navy font-semibold hover:underline" to={`/${path}/${item.id}`}>{item.title}</Link>
                  {item.year && <span className="text-gray-500 text-sm"> · {item.year}</span>}
                </li>)}
                {!items.length && <li className="text-gray-500 text-sm">None listed yet.</li>}</ul>
              </div>)}
          </div>
        </div>
      </section>
    </>
  );
}
