import { useEffect, useMemo, useState } from "react";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";

function ProjectDetailCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h3 className="text-[17px] font-bold">{project.title}</h3>
        <span
          className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full whitespace-nowrap ${
            project.status === "Active" ? "bg-amber/20 text-amber-dark" : "bg-gray-100 text-gray-500"
          }`}
        >
          {project.status}
        </span>
      </div>
      <div className="text-[13px] text-gray-500 mb-3">
        {project.area_name} &middot; {project.year}
        {project.study_area && <> &middot; {project.study_area}</>}
      </div>
      <p className="text-[14.5px] text-gray-600 mb-3">{project.summary}</p>
      {project.methodology && (
        <div className="text-[13px] text-gray-500">
          <span className="font-semibold text-gray-700">Methodology: </span>
          {project.methodology}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [areas, setAreas] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [areaFilter, setAreaFilter] = useState("All");
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([api.getProjects(), api.getResearchAreas()])
      .then(([p, a]) => {
        setProjects(p);
        setAreas(a);
      })
      .catch((e) => setError(e.message));
  }, []);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const statusOk = statusFilter === "All" || p.status === statusFilter;
      const areaOk = areaFilter === "All" || p.area_name === areaFilter;
      return statusOk && areaOk;
    });
  }, [projects, statusFilter, areaFilter]);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load projects from the API. {error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            Projects
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Current and completed research projects across our research areas.
          </p>
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
            <div className="flex flex-wrap gap-2">
              {["All", ...areas.map((a) => a.name)].map((a) => (
                <button
                  key={a}
                  onClick={() => setAreaFilter(a)}
                  className={`text-[13.5px] font-semibold px-4 py-1.5 rounded-full border transition-colors ${
                    areaFilter === a
                      ? "bg-amber text-navy-dark border-amber"
                      : "text-gray-500 border-gray-300 hover:border-navy hover:text-navy"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((project) => (
              <ProjectDetailCard key={project.id} project={project} />
            ))}
            {filtered.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-10">
                No projects match this filter yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}