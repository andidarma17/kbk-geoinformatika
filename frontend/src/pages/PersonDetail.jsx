import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import PersonPhoto from "../components/PersonPhoto";

const orcidUrl = (v) => (/^https?:\/\//.test(v) ? v : `https://orcid.org/${v}`);

export default function PersonDetail() {
  const { id } = useParams();
  const [person, setPerson] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState(null);

  useEffect(() => {
    setPerson(undefined);
    if (!/^\d+$/.test(id)) {
      setPerson(null);
      return;
    }
    api.getResearcher(id).then(setPerson).catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load this profile. {error}
      </div>
    );
  }
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

  return (
    <>
      <section className="bg-navy text-white py-14">
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
                {" "}&middot;{" "}
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
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[260px_1fr] gap-10">
          <aside>
            <PersonPhoto person={person} className="w-full max-w-[260px] aspect-square rounded-lg mb-5" />
            <div className="space-y-2 text-[14px]">
              {person.email && (
                <div>
                  <a href={`mailto:${person.email}`} className="text-navy font-semibold break-all">
                    {person.email}
                  </a>
                </div>
              )}
              {person.orcid && (
                <div>
                  <a href={orcidUrl(person.orcid)} target="_blank" rel="noreferrer" className="text-navy font-semibold">
                    ORCID
                  </a>
                </div>
              )}
              {person.scholar_url && (
                <div>
                  <a href={person.scholar_url} target="_blank" rel="noreferrer" className="text-navy font-semibold">
                    Google Scholar
                  </a>
                </div>
              )}
            </div>
          </aside>

          <div className="space-y-10">
            

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Research Interests</h2>
              {person.interests.length > 0 ? (
                <ul className="space-y-2">
                  {person.interests.split("\n").map((line, i) => (
                    <li key={i} className="text-[15px] text-gray-700 flex gap-2">
                      <span className="text-navy">&middot;</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">Not listed yet.</p>
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
                <p className="text-gray-400 text-sm">Not listed yet.</p>
              )}
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Projects ({person.projects.length})
              </h2>
              <ul className="space-y-4">
                {person.projects.map((p) => (
                  <li key={p.id}>
                    <div className="font-semibold text-[15px]">{p.title}</div>
                    <div className="text-gray-500 text-[13px]">
                      {[p.year, p.status, p.area_name].filter(Boolean).join(" · ")}
                    </div>
                    {p.summary && <p className="text-[14px] text-gray-600 mt-1">{p.summary}</p>}
                  </li>
                ))}
                {person.projects.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
              </ul>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Publications ({person.publications.length})
              </h2>
              <ul className="space-y-4">
                {person.publications.map((p) => (
                  <li key={p.id}>
                    <div className="font-semibold text-[15px]">{p.title}</div>
                    <div className="text-gray-500 text-[13px]">
                      {[p.authors, p.venue, p.year].filter(Boolean).join(" · ")}
                    </div>
                    <div className="flex gap-4 mt-1">
                      {p.doi_url && (
                        <a href={p.doi_url} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">DOI</a>
                      )}
                      {p.pdf_url && (
                        <a href={p.pdf_url} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">PDF</a>
                      )}
                    </div>
                  </li>
                ))}
                {person.publications.length === 0 && <li className="text-gray-400 text-sm">None listed yet.</li>}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}