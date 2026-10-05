import { epistemologiesFor } from "../taxonomy";

export default function TaxonomyFilters({ areas, epistemologies, ontology, epistemology, onOntologyChange, onEpistemologyChange }) {
  const children = epistemologiesFor(epistemologies, ontology);
  return (
    <div className="flex flex-wrap gap-4">
      <label className="block text-sm font-semibold text-gray-600">
        Ontology
        <select aria-label="Ontology" className="block mt-1 w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 bg-white"
          value={ontology} onChange={(event) => { onOntologyChange(event.target.value); onEpistemologyChange(""); }}>
          <option value="">All Ontologies</option>
          {areas.map((area) => <option key={area.id} value={area.id}>{area.name}</option>)}
        </select>
      </label>
      <label className="block text-sm font-semibold text-gray-600">
        Epistemology
        <select aria-label="Epistemology" className="block mt-1 w-full max-w-xs border border-gray-300 rounded-md px-3 py-2 bg-white disabled:bg-gray-100"
          value={epistemology} disabled={!ontology} onChange={(event) => onEpistemologyChange(event.target.value)}>
          <option value="">{!ontology ? "Select an Ontology first" : "All Epistemologies"}</option>
          {children.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select>
      </label>
    </div>
  );
}
