import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";

export default function PublicationDetail() {
  const { id } = useParams();
  const [pub, setPub] = useState(undefined); // undefined = loading, null = not found
  const [error, setError] = useState(null);

  useEffect(() => {
    setPub(undefined);
    if (!/^\d+$/.test(id)) {
      setPub(null);
      return;
    }
    api.getPublication(id).then(setPub).catch((e) => setError(e.message));
  }, [id]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load this publication. {error}
      </div>
    );
  }
  if (pub === undefined) return null;
  if (pub === null) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Publication not found.{" "}
        <Link to="/publications" className="text-navy font-semibold">Back to Publications</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[820px]">
          <Link to="/publications" className="text-blue-100/70 text-sm font-semibold hover:text-white">
            ← All Publications
          </Link>
          <h1 className="font-display font-bold text-[28px] md:text-[38px] leading-tight mt-3">
            {pub.title}
          </h1>
          {pub.authors && <p className="mt-4 text-[16px] text-blue-100/85">{pub.authors}</p>}
          <p className="mt-1 text-[14.5px] text-blue-100/70">
            {[pub.venue, pub.year].filter(Boolean).join(" · ")}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {pub.doi_url && (
              <a
                href={pub.doi_url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-md font-semibold text-[14px] bg-amber text-navy-dark hover:bg-amber-dark transition-colors"
              >
                View DOI
              </a>
            )}
            {pub.pdf_url && (
              <a
                href={pub.pdf_url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 rounded-md font-semibold text-[14px] border border-white/40 text-white hover:border-white transition-colors"
              >
                Download PDF
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[1fr_280px] gap-12">
          <div>
            <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Abstract</h2>
            {pub.abstract ? (
              <p className="text-[15.5px] text-gray-700 leading-relaxed whitespace-pre-line">
                {pub.abstract}
              </p>
            ) : (
              <p className="text-gray-400 text-sm">Abstract not available yet.</p>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Details</h2>
              <dl className="text-[14px] space-y-2">
                {pub.venue && (
                  <div>
                    <dt className="text-gray-400 text-[12.5px]">Journal / Venue</dt>
                    <dd className="text-gray-700">{pub.venue}</dd>
                  </div>
                )}
                {pub.year && (
                  <div>
                    <dt className="text-gray-400 text-[12.5px]">Year</dt>
                    <dd className="text-gray-700">{pub.year}</dd>
                  </div>
                )}
                {pub.area_name && (
                  <div>
                    <dt className="text-gray-400 text-[12.5px]">Research area</dt>
                    <dd>
                      {pub.area_slug ? (
                        <Link to={`/research/${pub.area_slug}`} className="text-navy font-semibold">
                          {pub.area_name}
                        </Link>
                      ) : (
                        pub.area_name
                      )}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            {pub.researchers.length > 0 && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Group members</h2>
                <ul className="space-y-2">
                  {pub.researchers.map((r) => (
                    <li key={r.id}>
                      <Link to={`/people/${r.id}`} className="text-navy font-semibold text-[14.5px] hover:underline">
                        {r.name}
                      </Link>
                      {r.role && <div className="text-gray-500 text-[12.5px]">{r.role}</div>}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}