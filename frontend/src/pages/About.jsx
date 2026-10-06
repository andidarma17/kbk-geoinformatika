import SectionHeader from "../components/SectionHeader";
import MockFlag from "../components/MockFlag";
import { usePageMeta } from "../utils/usePageMeta";

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
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              About KBK Geoinformatika
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              KBK Geoinformatika (Kelompok Bidang Keahlian Geoinformatika) is the
              geoinformatics research group within the Department of Geodetic
              Engineering, Faculty of Engineering, Universitas Gadjah Mada. KBK Geoinformatika is a merger of the Cadastre and Geoinformatics Engineering (CAGE) and Photogrammetry and Remote Sensing (FERS) KBKs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
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
      </section>

      <section className="bg-white border-y border-gray-200 py-16">
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
      </section>

      <section className="py-16">
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
      </section>

      <section className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-12">
          <h2 className="text-[22px] font-bold mb-2">Institutional affiliation</h2>
          <p className="text-blue-100/70 text-[15px] max-w-2xl">
            Departemen Teknik Geodesi, Fakultas Teknik, Universitas Gadjah
            Mada, Yogyakarta, Indonesia.
          </p>
        </div>
      </section>
    </>
  );
}
