import ErrorNotice from "../components/ErrorNotice";
import OntologyDiagram from "../components/OntologyDiagram";
import { useEffect, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import SectionHeader from "../components/SectionHeader";
import ResearchAreaCard from "../components/ResearchAreaCard";
import ProjectCard from "../components/ProjectCard";
import PublicationRow from "../components/PublicationRow";
import PersonCard from "../components/PersonCard";
import NewsCard from "../components/NewsCard";
import StatBlock from "../components/StatBlock";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

export default function Home() {
  usePageMeta({ title: "Home", description: "Explore KBK Geoinformatika research, researchers, projects, publications, and news at Universitas Gadjah Mada." });
  const [areas, setAreas] = useState([]);
  const [epistemologies, setEpistemologies] = useState([]);
  const [projects, setProjects] = useState([]);
  const [publications, setPublications] = useState([]);
  const [researchers, setResearchers] = useState([]);
  const [news, setNews] = useState([]);
  const [stats, setStats] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const requests = [
      { section: "areas", promise: api.getResearchAreas(), update: setAreas },
      { section: "epistemologies", promise: api.getEpistemologies(), update: setEpistemologies },
      { section: "projects", promise: api.getProjects({ limit: 3 }), update: setProjects },
      { section: "publications", promise: api.getPublications({ limit: 3 }), update: setPublications },
      { section: "researchers", promise: api.getResearchers({ limit: 4 }), update: setResearchers },
      { section: "news", promise: api.getNews({ limit: 3 }), update: setNews },
      { section: "stats", promise: api.getStats(), update: setStats },
    ];
    Promise.allSettled(requests.map(({ promise }) => promise)).then((results) => {
      if (!active) return;
      const failed = {};
      results.forEach((result, index) => {
        const { section, update } = requests[index];
        if (result.status === "fulfilled") update(result.value);
        else {
          console.error(`Failed to load ${section}:`, result.reason);
          failed[section] = true;
        }
      });
      setErrors(failed);
      setLoading(false);
    });
    return () => { active = false; };
  }, []);

  return (
    <>
      <Hero />

      {/* Research snapshot */}
      <section className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[1.1fr_1fr] gap-14">
          <div>
            <h2 className="text-[27px] font-bold mb-4">
              Two disciplines, one question: how is space changing?
            </h2>
            <p className="text-gray-500 text-[15.5px] mb-3.5">
              Our work sits at the intersection of geographic information
              science and remote observation. We build spatial data, analyze
              it, and put it in front of the people who plan cities, manage
              coastlines, and respond to environmental change.
            </p>
            <p className="text-gray-500 text-[15.5px] mb-3.5">
              Current work spans address and cadastral data quality, urban
              accessibility, coastal heat and land change, and the geospatial
              dimensions of maritime boundaries.
            </p>
          </div>
          {errors.stats ? <ErrorNotice className="self-center text-gray-600" /> : (
            <div className="grid grid-cols-2 gap-px bg-gray-200 border border-gray-200 rounded-lg overflow-hidden h-fit">
              {loading ? <LoadingSkeleton count={4} /> : <>
                <StatBlock value={stats?.areas ?? "–"} label="Field of Study (Ontology)" />
                <StatBlock value={stats?.researchers ?? "–"} label="Researchers & students" />
                <StatBlock value={stats?.projects ?? "–"} label="Active projects" />
                <StatBlock value={stats?.publications ?? "–"} label="Publications" />
              </>}
            </div>
          )}
        </div>
      </section>

            {/* Field of Study (Ontology) — short teaser, full detail lives on /research */}
      <section id="research" className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-11">
            <SectionHeader
              kicker="Research"
              title="Field of Study (Ontology)"
              description="Explore our fields of study and their Epistemologies."
            />
            <Link
              to="/research"
              className="text-[14.5px] font-semibold text-navy hover:underline whitespace-nowrap mb-1"
            >
              All Fields of Study →
            </Link>
          </div>
          <OntologyDiagram areas={areas} epistemologies={epistemologies} loading={loading} error={errors.areas || errors.epistemologies} />
          <div className="grid md:grid-cols-2 gap-5">
            {loading && <LoadingSkeleton count={2} />}
            {errors.areas && <ErrorNotice className="md:col-span-2 py-6 text-center text-gray-600" />}
            {areas.map((area) => (
              <Link key={area.id} to={`/research/${area.slug}`} className="block">
                <ResearchAreaCard area={area} />
              </Link>
            ))}
          </div>
          
        </div>
      </section>

      {/* Projects — short teaser, full directory lives on /projects */}
      <section id="projects" className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              kicker="Projects"
              title="Featured projects"
              description="A sample of current and recent work."
            />
            <Link
              to="/projects"
              className="text-[14.5px] font-semibold text-navy hover:underline whitespace-nowrap mb-1"
            >
              All Projects →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {loading && <LoadingSkeleton />}
            {errors.projects && <ErrorNotice className="md:col-span-3 py-6 text-center text-gray-600" />}
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications — short teaser, full directory lives on /publications */}
      <section id="publications" className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              kicker="Publications"
              title="Recent publications"
              description="Selected outputs from the group."
            />
            <Link
              to="/publications"
              className="text-[14.5px] font-semibold text-navy hover:underline whitespace-nowrap mb-1"
            >
              All Publications →
            </Link>
          </div>
          
          <div className="border-t border-gray-200">
            {loading && <LoadingSkeleton />}
            {errors.publications && <ErrorNotice className="py-6 text-center text-gray-600" />}
            {publications.map((pub) => (
              <PublicationRow key={pub.id} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      {/* People — short teaser, full directory lives on /people */}
      <section id="people" className="bg-white border-y border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              kicker="People"
              title="Researchers"
              description="A selection of the group's faculty and researchers."
            />
            <Link
              to="/people"
              className="text-[14.5px] font-semibold text-navy hover:underline whitespace-nowrap mb-1"
            >
              All People →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {loading && <LoadingSkeleton count={4} />}
            {errors.researchers && <ErrorNotice className="col-span-full py-6 text-center text-gray-600" />}
            {researchers.map((person) => (
              <PersonCard key={person.id} person={person} />
            ))}
          </div>
        </div>
      </section>

      {/* News — short teaser, full feed lives on /news */}
      <section id="news" className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <SectionHeader
              kicker="News"
              title="News & activities"
              description="Recent activity from the group."
            />
            <Link
              to="/news"
              className="text-[14.5px] font-semibold text-navy hover:underline whitespace-nowrap mb-1"
            >
              All News →
            </Link>
          </div>
          
          <div className="grid md:grid-cols-3 gap-5">
            {loading && <LoadingSkeleton />}
            {errors.news && <ErrorNotice className="md:col-span-3 py-6 text-center text-gray-600" />}
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-navy-dark text-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8 py-14 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-[26px] font-bold text-white max-w-[520px]">
              Open to collaboration with academic, government, and industry
              partners.
            </h2>
            <p className="text-blue-100/70 mt-2 text-[14.5px]">
              Reach out to discuss research partnerships, student projects, or
              applied geospatial work.
            </p>
          </div>
         <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-md font-semibold text-[14.5px] bg-amber text-navy-dark hover:bg-amber-dark transition-colors"
          >
          Contact the group
        </Link>
        </div>
      </section>
    </>
  );
}
