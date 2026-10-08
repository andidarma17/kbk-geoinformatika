import CollaborationCTA from "../components/CollaborationCTA";
import PageHero from "../components/PageHero";
import SectionHeader from "../components/SectionHeader";
import MockFlag from "../components/MockFlag";
import { usePageMeta } from "../utils/usePageMeta";
import { Link } from "react-router-dom";

const timeline = [
  { year: "[Year]", label: "Group established within Departemen Teknik Geodesi" },
  { year: "[Year]", label: "First cohort of graduate researchers joins the group" },
  { year: "[Year]", label: "Group expands into UAV-based remote sensing work" },
  { year: "[Year]", label: "Ongoing — current Ontologies and active projects" }
];

export default function About() {
  usePageMeta({ title: "About", description: "Learn about KBK Geoinformatika and its geoinformatics research at Universitas Gadjah Mada." });
  return (
    <>
      <PageHero theme="about" className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-extrabold text-[34px] md:text-[44px] leading-tight">
              About KBK Geoinformatika
            </h1>
            <h3 className="mt-2 text-[32px] leading-tight font-extrabold text-amber-400 mb-6">
            "Engineering spatial intelligence from land to sky."
            </h3>
            <p className="text-white-600 text-[16px] leading-relaxed mb-4">
            As a specialized expertise group within the Department of Geodetic Engineering at 
            <span className="font-semibold text-amber-400"> Universitas Gadjah Mada</span>, 
            we bridge the gap between physical earth observation and intelligent geospatial systems.
            </p>
            <p className="text-white-600 text-[16px] leading-relaxed mb-6">
              Our interdisciplinary approach converges <span className="font-bold text-amber-400" >Cadaster, Geospatial Visualization, 
              Photogrammetry, and Remote Sensing </span>. We capture the environment using UAV LiDAR 
              and satellite imagery, then transform that complex data through robust land informatics 
              and advanced geocomputation to support sustainable spatial policies.
            </p>
          </div>
        </div>
      </PageHero>

      {/* <section className="py-16">
        
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-10">
          <div className="bg-white border border-gray-200 rounded-lg p-7">
            
            <h2 className="text-xl font-bold mb-3">Mission</h2>
            <p className="text-gray-500 text-[15px]">
              To develop innovative technologies in photogrammetry, remote sensing, cadastral surveying, and geoinformation that are competitive at the international level and contribute to problem-solving through the three pillars of higher education: education, research, and community service.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-7">
            <h2 className="text-xl font-bold mb-3">Vision</h2>
            <p className="text-gray-500 text-[15px]">
              To become a leading and innovative center of expertise in education, research, and the development of cutting-edge geospatial technologies in the fields of photogrammetry, remote sensing, cadastral surveying, and geoinformation/geoinformatics—one that is characterized by integrity, adaptability, and tangible impact through global collaboration and data-driven decision-making.
            </p>
          </div>
        </div>
      </section> */}

      <section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center max-w-3xl mx-auto mb-16">
      <h2 className="text-sm font-extrabold text-amber-400 uppercase tracking-wide">
        Our Core Purpose
      </h2>
      <h3 className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Vision & Mission
      </h3>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      {/* Visi Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 lg:col-span-1">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-4">Vision</h4>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          To become a world-class center of excellence in Geoinformatics, pioneering innovative spatial intelligence through the integration of earth observation, geospatial systems, and land administration, dedicated to the sustainable development of the nation and humanity based on Pancasila values.
        </p>
      </div>

      {/* Misi Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 lg:col-span-2">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h4 className="text-xl font-bold text-gray-900 mb-6">Mission</h4>
        <ul className="space-y-6">
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-sm mr-4">1</span>
            <div>
              <h5 className="text-gray-900 font-semibold mb-1">Education & Capacity Building</h5>
              <p className="text-gray-600 text-sm leading-relaxed">To foster an academic environment that produces highly skilled spatial engineers equipped with technical mastery in geospatial visualization, photogrammetry, remote sensing, and cadaster.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-sm mr-4">2</span>
            <div>
              <h5 className="text-gray-900 font-semibold mb-1">Research & Innovation</h5>
              <p className="text-gray-600 text-sm leading-relaxed">To conduct interdisciplinary research that transforms raw spatial data from land to sky into actionable geospatial intelligence and innovative solutions.</p>
            </div>
          </li>
          <li className="flex">
            <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 font-bold text-sm mr-4">3</span>
            <div>
              <h5 className="text-gray-900 font-semibold mb-1">Community Service & Impact</h5>
              <p className="text-gray-600 text-sm leading-relaxed">To actively apply geoinformatics technologies and spatial platforms to support spatial planning and the achievement of Sustainable Development Goals (SDGs).</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</section>

      {/* <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Approach"
            title="Research philosophy"
            description="[Placeholder] How the group approaches its work — adjust or replace with the department's own framing."
          />
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-[16px] mb-2">Field-grounded</h3>
              <p className="text-gray-500 text-[14.5px]">
                Spatial data work is validated against ground conditions, not
                treated as an abstraction — field surveys and UAV missions
                accompany desk-based analysis.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] mb-2">Applied</h3>
              <p className="text-gray-500 text-[14.5px]">
                Research is oriented toward problems that government,
                industry, and communities actually face — accessibility,
                land change, coastal risk, boundary definition.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-[16px] mb-2">Open methodology</h3>
              <p className="text-gray-500 text-[14.5px]">
                Methods and, where possible, data are documented clearly
                enough for other researchers and institutions to replicate
                and build on.
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="py-16 bg-white border-t border-gray-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mb-12 max-w-3xl">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-4">
        Our Research Philosophy
      </h2>
      <p className="text-lg text-gray-500">
        How we bridge the physical world with digital decision-making—combining 
        rigorous earth observation with scalable spatial information systems.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
      {/* Point 1 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Empirically Grounded</h3>
        </div>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          Spatial data is never treated as a mere abstraction. Whether classifying land cover via satellite imagery or reconstructing 3D city models using UAV LiDAR, our digital pipelines are always anchored by precise terrestrial validation and rigorous geodetic principles.
        </p>
      </div>

      {/* Point 2 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Actionable Intelligence</h3>
        </div>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We engineer systems, not just maps. Our geocomputational models and land informatics frameworks are oriented toward solving tangible, real-world challenges—from securing land tenure and monitoring urban microclimates to supporting government spatial planning.
        </p>
      </div>

      {/* Point 3 */}
      <div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded flex items-center justify-center mr-3">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900">Interoperable & Open</h3>
        </div>
        <p className="text-gray-600 text-[15.5px] leading-relaxed">
          We champion Spatial Data Infrastructure (SDI) and open geospatial standards. Our workflows—from geodatabase architecture to interactive WebGIS deployment—are designed to be transparent, replicable, and easily integrated across different institutional platforms.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="History" title="Group timeline" />
          <MockFlag />
          <div className="border-l-2 border-gray-200 pl-6 space-y-8">
            {timeline.map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[31px] top-1 w-3 h-3 rounded-full bg-navy" />
                <div className="text-sm font-semibold text-navy">{item.year}</div>
                <div className="text-gray-600 text-[15px] mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <CollaborationCTA />
    </>
  );
}
