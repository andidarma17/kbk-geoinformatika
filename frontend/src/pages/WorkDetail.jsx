import PageHero from "../components/PageHero";
import IntellectualPropertyDetails from "../components/IntellectualPropertyDetails";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { workTypes } from "../workTypes";
import ErrorNotice from "../components/ErrorNotice";
import { joinMeta } from "../utils/joinMeta";
import { safeUrl } from "../utils/safeUrl";
import { useRecord } from "../hooks/useRecord";
import { usePageMeta } from "../utils/usePageMeta";

export default function WorkDetail({ kind }) {
  const { id } = useParams();
  const config = workTypes[kind];
  const isIntellectualProperty = kind === "intellectual-property";
  const { record: item, error } = useRecord(id, (recordId) => api.getWork(kind, recordId), kind);
  usePageMeta({ title: item?.title ?? config.title, description: item?.summary || config.description });

  if (error) return <ErrorNotice />;
  if (item === undefined) return null;
  if (item === null) return <p className="max-w-6xl mx-auto px-6 py-16">Record not found. <Link className="text-navy underline" to={`/${kind}`}>Back to {config.title}</Link></p>;
  const externalUrl = safeUrl(item.external_url);

  return <>
    <PageHero theme={kind} className="py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <Link className="text-blue-100/80 hover:text-white" to={`/${kind}`}>← All {config.title}</Link>
        <h1 className="font-display font-bold text-[30px] md:text-[40px] mt-4">{item.title}</h1>
        {!isIntellectualProperty && <p className="mt-3 text-blue-100/80">{joinMeta(item.year, item.area_name, item.epistemology_name)}</p>}
      </div>
    </PageHero>
    {isIntellectualProperty ? <IntellectualPropertyDetails item={item} /> : <section className="max-w-6xl mx-auto px-6 md:px-8 py-14 grid md:grid-cols-[1fr_280px] gap-12">
      <article className="space-y-8">
        {item.summary && <div><h2 className="font-bold mb-2">Summary</h2><p className="whitespace-pre-line text-gray-700">{item.summary}</p></div>}
        {item.description && <div><h2 className="font-bold mb-2">Description</h2><p className="whitespace-pre-line text-gray-700">{item.description}</p></div>}
        {externalUrl && <a className="text-navy underline" href={externalUrl} target="_blank" rel="noreferrer">External reference ↗</a>}
      </article>
      <aside>
        <h2 className="font-bold mb-3">Details</h2>
        <dl className="text-sm space-y-3">
          {config.fields.map(([key, label]) => item[key] ? <div key={key}>
            <dt className="text-gray-500">{label}</dt><dd className="whitespace-pre-line">{item[key]}</dd>
          </div> : null)}
          {item.area_name && <div><dt className="text-gray-500">Ontology</dt><dd><Link className="text-navy underline" to={`/research/${item.area_slug}`}>{item.area_name}</Link></dd></div>}
          {item.epistemology_name && <div><dt className="text-gray-500">Epistemology</dt><dd>{item.epistemology_name}</dd></div>}
        </dl>
        {!!item.researchers?.length && <div className="mt-8"><h2 className="font-bold mb-3">Group members</h2>
          <ul className="space-y-2">{item.researchers.map((r) => <li key={r.id}><Link className="text-navy underline" to={`/people/${r.id}`}>{r.name}</Link></li>)}</ul>
        </div>}
      </aside>
    </section>}
  </>;
}
