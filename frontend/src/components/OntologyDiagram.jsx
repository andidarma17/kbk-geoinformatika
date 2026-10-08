const diagramUrl = "/field-of-study-ontology.svg";

export default function OntologyDiagram({ areas = [], epistemologies = [], loading = false, error = false }) {
  return (
    <>
      <figure className="my-8 rounded-lg border border-gray-200 bg-white p-3 md:p-6 text-gray-600">
        <a href={diagramUrl} target="_blank" rel="noreferrer" aria-label="Open Field of Study (Ontology) diagram at full size">
          <img src={diagramUrl} width="1123" height="794" loading="lazy" decoding="async" className="w-full h-auto" alt="Field of Study (Ontology) diagram for KBK Geoinformatika" />
        </a>
        <figcaption className="mt-3 text-center text-sm">
          Field of Study (Ontology) · <a href={diagramUrl} target="_blank" rel="noreferrer" className="text-navy underline">Open full-size diagram</a>
        </figcaption>
      </figure>
      <details className="-mt-5 mb-8 rounded-lg border border-gray-200 bg-white p-4 text-sm text-gray-700">
        <summary className="cursor-pointer font-semibold text-navy">Text version</summary>
        {loading ? <p className="mt-3">Loading fields of study…</p> : error ? (
          <p className="mt-3">Current fields of study are unavailable.</p>
        ) : areas.length ? (
          <ul className="mt-4 space-y-4">
            {areas.map((area) => {
              const children = epistemologies.filter((item) => item.research_area_id === area.id);
              return <li key={area.id}>
                <strong>{area.name}</strong>
                {children.length ? (
                  <ul className="mt-1 ml-5 list-disc space-y-1">
                    {children.map((item) => <li key={item.id}>{item.name}</li>)}
                  </ul>
                ) : <p className="mt-1 text-gray-500">No Epistemology listed yet.</p>}
              </li>;
            })}
          </ul>
        ) : <p className="mt-3">No fields of study listed yet.</p>}
      </details>
    </>
  );
}
