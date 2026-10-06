import ErrorNotice from "../components/ErrorNotice";
import TaxonomyFilters from "../components/TaxonomyFilters";
import { matchesTaxonomy } from "../taxonomy";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import PersonCard from "../components/PersonCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

function FilterGroup({ label, options, value, onChange, activeClass }) {
  return (
    <div>
      <div className="text-xs font-semibold text-gray-500 uppercase mb-2">{label}</div>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full border transition-colors ${
              value === opt
                ? activeClass
                : "text-gray-500 border-gray-300 hover:border-navy hover:text-navy"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function People() {
  usePageMeta({ title: "People", description: "Meet the researchers of KBK Geoinformatika and explore their areas of study." });
  const [areas, setAreas] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [roleFilter, setRoleFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("");
  const [epistemologyFilter, setEpistemologyFilter] = useState("");
  const [epistemologies, setEpistemologies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([api.getResearchers(), api.getResearchAreas(), api.getEpistemologies()])
      .then(([r, a, e]) => { if (active) { setResearchers(r); setAreas(a); setEpistemologies(e); } })
      .catch((e) => { if (active) { console.error("Failed to load content:", e); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const roles = useMemo(() => {
    const unique = Array.from(new Set(researchers.map((r) => r.role).filter(Boolean)));
    return ["All", ...unique];
  }, [researchers]);

  const filtered = useMemo(
    () =>
      researchers.filter(
        (r) =>
          (roleFilter === "All" || r.role === roleFilter) &&
          matchesTaxonomy(r, areaFilter, epistemologyFilter)
      ),
    [researchers, roleFilter, areaFilter, epistemologyFilter]
  );

  if (error) return <ErrorNotice />;

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              People
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              Lecturers, researchers, and students working across our Ontologies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="Directory" title="Researchers" />

          <div className="flex flex-wrap gap-x-10 gap-y-5 mb-8">
            <FilterGroup
              label="Role"
              options={roles}
              value={roleFilter}
              onChange={setRoleFilter}
              activeClass="bg-navy text-white border-navy"
            />
            <TaxonomyFilters areas={areas} epistemologies={epistemologies} ontology={areaFilter} epistemology={epistemologyFilter} onOntologyChange={setAreaFilter} onEpistemologyChange={setEpistemologyFilter} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {loading && <LoadingSkeleton count={4} />}
            {filtered.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
            {!loading && filtered.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10">
                No one matches this filter yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
