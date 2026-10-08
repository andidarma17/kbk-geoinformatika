import { Link } from "react-router-dom";
import { safeUrl } from "../utils/safeUrl";

const hasValue = (value) => value != null && String(value).trim() !== "";

export default function IntellectualPropertyDetails({ item }) {
  const fields = [
    ["year", "Year"], ["area_name", "Ontology"], ["ip_type", "Type"],
    ["holders", "Inventors / Rights Holder"], ["status", "Status"],
  ].filter(([key]) => hasValue(item[key]));
  const members = (item.researchers || []).filter((person) => hasValue(person.name));
  const referenceUrl = safeUrl(item.external_url);

  if (!fields.length && !members.length && !referenceUrl) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-14">
      <dl className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 break-words">
        {fields.map(([key, label]) => <div key={key}>
          <dt className="text-sm text-gray-500 mb-2">{label}</dt>
          <dd className="text-[15px] whitespace-pre-line">
            {key === "area_name" && item.area_slug ?
              <Link className="text-navy underline" to={`/research/${item.area_slug}`}>{item[key]}</Link> : item[key]}
          </dd>
        </div>)}
        {!!members.length && <div>
          <dt className="text-sm text-gray-500 mb-2">Group Members</dt>
          <dd><ul className="space-y-2 text-[15px]">
            {members.map((person) => <li key={person.id}>
              <Link className="text-navy underline" to={`/people/${person.id}`}>{person.name}</Link>
            </li>)}
          </ul></dd>
        </div>}
        {referenceUrl && <div>
          <dt className="text-sm text-gray-500 mb-2">Reference Link</dt>
          <dd><a className="text-navy underline text-[15px]" href={referenceUrl} target="_blank" rel="noreferrer">
            View reference <span aria-hidden="true">↗</span>
          </a></dd>
        </div>}
      </dl>
    </section>
  );
}
