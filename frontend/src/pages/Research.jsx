import ErrorNotice from "../components/ErrorNotice";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import OntologyDiagram from "../components/OntologyDiagram";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

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
        </ul> : <p className="text-sm text-gray-500">No Epistemology listed yet.</p>}
      </div>
      <span className="text-[13.5px] font-semibold text-navy">View researchers, projects & publications →</span>
    </Link>
  );
}

export default function Research() {
  usePageMeta({ title: "Field of Study (Ontology)", description: "Explore the Ontologies and Epistemologies that guide KBK Geoinformatika research." });
  const [areas, setAreas] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([api.getResearchAreas(), api.getEpistemologies()])
      .then(([a, e]) => { if (active) { setAreas(a); setEpistemologies(e); } })
      .catch((e) => { if (active) { console.error("Failed to load content:", e); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (error) return <ErrorNotice />;

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              Field of Study (Ontology)
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              Explore our Ontologies and the Epistemologies within each field of study.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Overview"
            title="Field of Study (Ontology)"
            description="Select an area below to see the people and projects behind it."
          />
          <OntologyDiagram areas={areas} epistemologies={epistemologies} loading={loading} />
          <div className="space-y-6">
            {loading && <LoadingSkeleton count={2} />}
            {areas.map((area) => (
              <AreaCard key={area.id} area={area} epistemologies={epistemologies.filter((item) => item.research_area_id === area.id)} />
            ))}
            {!loading && areas.length === 0 && <p className="text-gray-500">No fields of study listed yet.</p>}
          </div>
        </div>
      </section>
<section className="py-16 bg-gray-50 border-t border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-12 max-w-3xl">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        Research Methodologies
      </h2>
      <p className="text-lg text-gray-500">
        How we acquire, process, and apply spatial data across our four core disciplines to deliver comprehensive geospatial solutions.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Photogrammetry */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mr-4">
            {/* Icon Drone / 3D */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Precision 3D Reconstruction</h3>
        </div>
        <p className="text-sm text-indigo-600 font-semibold mb-3 uppercase tracking-wider">Photogrammetry</p>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We utilize UAVs, terrestrial cameras, and LiDAR scanning to capture high-resolution point clouds and orthophotos. This methodology relies on Structure from Motion (SfM) to extract highly accurate metric measurements and 3D models of the environment.
        </p>
      </div>

      {/* Remote Sensing */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center mr-4">
            {/* Icon Satellite / Wave */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Earth Observation & Spectral Analysis</h3>
        </div>
        <p className="text-sm text-emerald-600 font-semibold mb-3 uppercase tracking-wider">Remote Sensing</p>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We extract critical bio-physical parameters and monitor temporal environmental changes without direct contact by analyzing spectral signatures from passive optical sensors and microwave backscatter from active radar (SAR).
        </p>
      </div>

      {/* Geospatial Visualization */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mr-4">
            {/* Icon Code / Web */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Geocomputation & Spatial Engineering</h3>
        </div>
        <p className="text-sm text-blue-600 font-semibold mb-3 uppercase tracking-wider">Geo Visualization</p>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We transform raw geometric data into scalable intelligence by structuring data within advanced spatial databases (PostGIS), applying machine learning, and deploying interactive WebGIS architectures to uncover hidden spatial patterns.
        </p>
      </div>

      {/* Cadaster */}
      <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 transition duration-300 hover:shadow-md">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center mr-4">
            {/* Icon Map / Policy */}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Land Informatics & Policy Integration</h3>
        </div>
        <p className="text-sm text-amber-600 font-semibold mb-3 uppercase tracking-wider">Cadaster</p>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We bridge technical mapping with socio-legal realities. By applying frameworks like LADM and rigorous spatial analysis, we digitize land registry data and provide a data-driven foundation for sustainable urban planning.
        </p>
      </div>
    </div>
  </div>
</section>
      {/* <section className="bg-white border-t border-gray-200 py-16">
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
      </section> */}
    </>
    
  );
}
