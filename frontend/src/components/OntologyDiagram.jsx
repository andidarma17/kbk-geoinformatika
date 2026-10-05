const diagramUrl = "/Field%20of%20Study%20(Ontology).svg";

export default function OntologyDiagram() {
  return (
    <figure className="my-8 rounded-lg border border-gray-200 bg-white p-3 md:p-6 text-gray-600">
      <a href={diagramUrl} target="_blank" rel="noreferrer" aria-label="Open Field of Study (Ontology) diagram at full size">
        <img src={diagramUrl} width="1123" height="794" className="w-full h-auto" alt="Field of Study (Ontology) diagram for KBK Geoinformatika" />
      </a>
      <figcaption className="mt-3 text-center text-sm">
        Field of Study (Ontology) · <a href={diagramUrl} target="_blank" rel="noreferrer" className="text-navy underline">Open full-size diagram</a>
      </figcaption>
    </figure>
  );
}
