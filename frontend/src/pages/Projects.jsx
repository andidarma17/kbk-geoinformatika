import ErrorNotice from "../components/ErrorNotice";
import TaxonomyFilters from "../components/TaxonomyFilters";
import { matchesTaxonomy } from "../taxonomy";
import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";
import { joinMeta } from "../utils/joinMeta";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

function ProjectDetailCard({ project }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className="group block bg-white border border-gray-200 rounded-lg p-6 hover:border-navy transition-colors"
    >
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h3 className="text-[17px] font-bold group-hover:text-navy group-hover:underline">
          {project.title}
        </h3>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
            project.status === "Active" ? "bg-amber/30 text-navy-dark" : "bg-gray-100 text-gray-500"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="text-[13px] text-gray-500 mb-3">
        {joinMeta(project.area_name, project.year, project.study_area)}
      </div>
      <p className="text-[14.5px] text-gray-600 mb-3 line-clamp-3">{project.summary}</p>
      <span className="text-[13px] font-semibold text-navy">View details →</span>
    </Link>
  );
}

export default function Projects() {
  usePageMeta({ title: "Projects", description: "Browse current and completed geoinformatics research projects from KBK Geoinformatika." });
  const [projects, setProjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("");
  const [epistemologyFilter, setEpistemologyFilter] = useState("");
  const [epistemologies, setEpistemologies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([api.getProjects(), api.getResearchAreas(), api.getEpistemologies()])
      .then(([p, a, e]) => {
        if (!active) return;
        setEpistemologies(e);
        setProjects(p);
        setAreas(a);
      })
      .catch((e) => { if (active) { console.error("Failed to load content:", e); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusOk = statusFilter === "All" || p.status === statusFilter;
      const areaOk = matchesTaxonomy(p, areaFilter, epistemologyFilter);
      return statusOk && areaOk;
    });
  }, [projects, statusFilter, areaFilter, epistemologyFilter]);

  if (error) return <ErrorNotice />;

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              Projects
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              Current and completed research projects across our Ontologies.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="Directory" title="All projects" />

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex flex-wrap gap-2">
              {["All", "Active", "Completed"].map((s) => (
                <button
                  key={s}
                  onClick={() => setStatusFilter(s)}
                  className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                    statusFilter === s
                      ? "bg-navy text-white border-navy"
                      : "text-gray-500 border-gray-300 hover:border-navy hover:text-navy"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <TaxonomyFilters areas={areas} epistemologies={epistemologies} ontology={areaFilter} epistemology={epistemologyFilter} onOntologyChange={setAreaFilter} onEpistemologyChange={setEpistemologyFilter} />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {loading && <LoadingSkeleton count={4} />}
            {filtered.map((project) => (
              <ProjectDetailCard key={project.id} project={project} />
            ))}
            {!loading && filtered.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10">
                No projects match this filter yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
