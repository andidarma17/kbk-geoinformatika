import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import OntologyDiagram from "../components/OntologyDiagram";

function AreaCard({ area, epistemologies }) {
  return (
    <Link
      to={`/research/${area.slug}`}
      className="block border border-gray-200 rounded-lg p-7 bg-white hover:border-navy transition-colors"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <h3 className="text-[20px] font-bold">{area.name}</h3>
        <div className="flex flex-wrap gap-2">
          {(area.tags || []).map((t) => (
            <span key={t} className="text-xs font-medium text-navy border border-navy/40 rounded-full px-2.5 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>
      <p className="text-gray-500 text-[14.5px] mb-3">{area.description}</p>
      <div className="mb-3">
        <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Epistemology</h4>
        {epistemologies.length ? <ul className="flex flex-wrap gap-2">
          {epistemologies.map((item) => <li key={item.id} className="text-xs bg-blue-50 text-navy rounded-full px-3 py-1">{item.name}</li>)}
        </ul> : <p className="text-sm text-gray-400">No Epistemology listed yet.</p>}
      </div>
      <span className="text-[13.5px] font-semibold text-navy">View researchers, projects & publications →</span>
    </Link>
  );
}

export default function Research() {
  const [areas, setAreas] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getResearchAreas(), api.getEpistemologies()])
      .then(([a, e]) => { setAreas(a); setEpistemologies(e); })
      .catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load research data from the API. {error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            Field of Study (Ontology)
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Explore our Ontologies and the Epistemologies within each field of study.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Overview"
            title="Field of Study (Ontology)"
            description="Select an area below to see the people and projects behind it."
          />
          <OntologyDiagram />
          <div className="space-y-6">
  {areas.map((area) => (
    <AreaCard key={area.id} area={area} epistemologies={epistemologies.filter((item) => item.research_area_id === area.id)} />
  ))}
</div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Methods"
            title="Research methodologies"
            description="[Placeholder] Representative methods used across the group's work — adjust to reflect the department's actual toolkit."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-[16px] mb-2">Field & UAV survey</h3>
              <p className="text-gray-500 text-[14.5px]">
                GNSS ground-truthing, UAV photogrammetry, and terrestrial surveying for validated spatial datasets.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] mb-2">Remote sensing analysis</h3>
              <p className="text-gray-500 text-[14.5px]">
                Satellite image processing and time-series analysis, including cloud-based platforms such as Google Earth Engine.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] mb-2">Spatial data science</h3>
              <p className="text-gray-500 text-[14.5px]">
                GIS-based modeling, spatial statistics, and WebGIS development for analysis and dissemination.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
