import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import TaxonomyFilters from "../components/TaxonomyFilters";
import { matchesTaxonomy } from "../taxonomy";
import { workTypes } from "../workTypes";

export default function WorkDirectory({ kind }) {
  const config = workTypes[kind];
  const [items, setItems] = useState([]);
  const [areas, setAreas] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [ontology, setOntology] = useState("");
  const [epistemology, setEpistemology] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([api.getWorks(kind), api.getResearchAreas(), api.getEpistemologies()])
      .then(([work, parent, children]) => { setItems(work); setAreas(parent); setEpistemologies(children); })
      .catch((e) => setError(e.message));
  }, [kind]);

  const filtered = useMemo(() => items.filter((item) =>
    matchesTaxonomy(item, ontology, epistemology) &&
    (!search.trim() || [item.title, item.summary, item.holders, item.partners]
      .some((value) => (value || "").toLowerCase().includes(search.trim().toLowerCase())))),
  [items, ontology, epistemology, search]);

  return <>
    <section className="bg-navy text-white py-20">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h1 className="font-display font-bold text-[34px] md:text-[44px]">{config.title}</h1>
        <p className="mt-4 text-blue-100/80">{config.description}</p>
      </div>
    </section>
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      {error ? <p role="alert" className="text-red-600">Couldn't load {config.title}: {error}</p> : <>
        <div className="flex flex-wrap gap-5 items-end mb-8">
          <label className="text-sm font-semibold text-gray-600">Search
            <input aria-label={`Search ${config.title}`} type="search" value={search} onChange={(event) => setSearch(event.target.value)}
              className="block mt-1 border border-gray-300 rounded-md px-3 py-2" placeholder="Title or keyword" />
          </label>
          <TaxonomyFilters areas={areas} epistemologies={epistemologies} ontology={ontology} epistemology={epistemology}
            onOntologyChange={setOntology} onEpistemologyChange={setEpistemology} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((item) => <Link key={item.id} to={`/${kind}/${item.id}`}
            className="block bg-white border border-gray-200 hover:border-navy rounded-lg p-6">
            <h2 className="font-bold text-lg text-navy">{item.title}</h2>
            <p className="mt-1 text-sm text-gray-500">{[item.year, item.area_name, item.epistemology_name].filter(Boolean).join(" · ")}</p>
            {item.summary && <p className="mt-3 text-gray-600 line-clamp-3">{item.summary}</p>}
            <span className="inline-block mt-3 text-sm font-semibold text-navy">View details →</span>
          </Link>)}
          {!filtered.length && <p className="col-span-full text-gray-500 text-center py-10">No records match this filter yet.</p>}
        </div>
      </>}
    </section>
  </>;
}
