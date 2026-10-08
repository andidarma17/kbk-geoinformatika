import PageHero from "../components/PageHero";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import TaxonomyFilters from "../components/TaxonomyFilters";
import { matchesTaxonomy } from "../taxonomy";
import { workTypes } from "../workTypes";
import ErrorNotice from "../components/ErrorNotice";
import { joinMeta } from "../utils/joinMeta";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

export default function WorkDirectory({ kind }) {
  const config = workTypes[kind];
  const isIntellectualProperty = kind === "intellectual-property";
  usePageMeta({ title: config.title, description: config.description });
  const [items, setItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [ontology, setOntology] = useState("");
  const [epistemology, setEpistemology] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError("");
    setItems([]);
    Promise.all([api.getWorks(kind), api.getResearchAreas(), api.getEpistemologies()])
      .then(([work, parent, children]) => { if (active) { setItems(work); setAreas(parent); setEpistemologies(children); } })
      .catch((e) => { if (active) { console.error("Failed to load content:", e); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [kind]);

  const filtered = useMemo(() => items.filter((item) =>
    matchesTaxonomy(item, ontology, epistemology) &&
    (!search.trim() || [item.title, item.summary, item.holders, item.partners]
      .some((value) => (value || "").toLowerCase().includes(search.trim().toLowerCase())))),
  [items, ontology, epistemology, search]);

  return <>
    <PageHero theme={kind} className="py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h1 className="font-display font-bold text-[34px] md:text-[44px]">{config.title}</h1>
        <p className="mt-4 text-blue-100/80">{config.description}</p>
      </div>
    </PageHero>
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      {error ? <ErrorNotice /> : <>
        <div className="flex flex-wrap gap-5 items-end mb-8">
          <label className="text-sm font-semibold text-gray-600">Search
            <input aria-label={`Search ${config.title}`} type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              className="block mt-1 border border-gray-300 rounded-md px-3 py-2" placeholder="Title or keyword" />
          </label>
          <TaxonomyFilters areas={areas} epistemologies={epistemologies} ontology={ontology} epistemology={epistemology}
            onOntologyChange={setOntology} onEpistemologyChange={setEpistemology} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {loading && <LoadingSkeleton count={4} />}
          {filtered.map((item) => <Link key={item.id} to={`/${kind}/${item.id}`}
            className="block bg-white border border-gray-200 hover:border-navy rounded-lg p-6">
            <h2 className="font-bold text-lg text-navy">{item.title}</h2>
            {joinMeta(item.year, item.area_name, isIntellectualProperty ? item.ip_type : item.epistemology_name) &&
              <p className="mt-1 text-sm text-gray-500">{joinMeta(item.year, item.area_name, isIntellectualProperty ? item.ip_type : item.epistemology_name)}</p>}
            {isIntellectualProperty ? <>
              {item.holders?.trim() && <p className="mt-3 text-sm text-gray-600"><span className="font-semibold">Inventors / Rights Holder: </span>{item.holders}</p>}
              {item.status?.trim() && <p className="mt-2 text-sm text-gray-600"><span className="font-semibold">Status: </span>{item.status}</p>}
            </> : item.summary && <p className="mt-3 text-gray-600 line-clamp-3">{item.summary}</p>}
            <span className="inline-block mt-3 text-sm font-semibold text-navy">View details →</span>
          </Link>)}
          {!loading && !filtered.length && <p className="col-span-full text-gray-500 text-center py-10">No records match this filter yet.</p>}
        </div>
      </>}
    </section>
  </>;
}
