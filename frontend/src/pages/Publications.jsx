import TaxonomyFilters from "../components/TaxonomyFilters";
import { matchesTaxonomy } from "../taxonomy";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import PublicationRow from "../components/PublicationRow";

export default function Publications() {
  const [publications, setPublications] = useState([]);
  const [areas, setAreas] = useState([]);
  const [areaFilter, setAreaFilter] = useState("");
  const [epistemologyFilter, setEpistemologyFilter] = useState("");
  const [epistemologies, setEpistemologies] = useState([]);
  const [yearFilter, setYearFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getPublications(), api.getResearchAreas(), api.getEpistemologies()])
      .then(([p, a, e]) => {
        setEpistemologies(e);
        setPublications(p);
        setAreas(a);
      })
      .catch((e) => setError(e.message));
  }, []);

  const years = useMemo(() => {
    const unique = Array.from(new Set(publications.map((p) => p.year).filter(Boolean)));
    return ["All", ...unique.sort((a, b) => b - a)];
  }, [publications]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return publications.filter((p) => {
      const areaOk = matchesTaxonomy(p, areaFilter, epistemologyFilter);
      const yearOk = yearFilter === "All" || String(p.year) === String(yearFilter);
      const searchOk =
        !q || p.title.toLowerCase().includes(q) || (p.authors || "").toLowerCase().includes(q);
      return areaOk && yearOk && searchOk;
    });
  }, [publications, areaFilter, epistemologyFilter, yearFilter, search]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load publications from the API. {error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            Publications
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Research outputs from the group, searchable by title, author, Ontology, and year.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="Directory" title="All publications" />

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by title or author…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md border border-gray-300 rounded-md px-4 py-2.5 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-6 mb-8">
            <TaxonomyFilters areas={areas} epistemologies={epistemologies} ontology={areaFilter} epistemology={epistemologyFilter} onOntologyChange={setAreaFilter} onEpistemologyChange={setEpistemologyFilter} />
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYearFilter(y)}
                  className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                    yearFilter === y
                      ? "bg-amber text-navy-dark border-amber"
                      : "text-gray-500 border-gray-300 hover:border-navy hover:text-navy"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200">
            {filtered.map((pub) => (
              <PublicationRow key={pub.id} pub={pub} />
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-400 text-center py-10">
                No publications match this search/filter yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}