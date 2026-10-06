import ErrorNotice from "../components/ErrorNotice";
import { Link, useParams } from "react-router-dom";
import { api } from "../api";
import { joinMeta } from "../utils/joinMeta";
import { useRecord } from "../hooks/useRecord";
import { usePageMeta } from "../utils/usePageMeta";

export default function ProjectDetail() {
  const { id } = useParams();
  const { record: project, error } = useRecord(id, api.getProject);
  usePageMeta({ title: project?.title ?? "Project", description: project?.summary || "Research project from KBK Geoinformatika." });

  if (error) return <ErrorNotice />;
  if (project === undefined) return null;
  if (project === null) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Project not found.{" "}
        <Link to="/projects" className="text-navy font-semibold">Back to Projects</Link>
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[820px]">
            <Link to="/projects" className="text-blue-100/70 text-sm font-semibold hover:text-white">
              ← All Projects
            </Link>
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span
                className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                  project.status === "Active" ? "bg-amber text-navy-dark" : "bg-white/20 text-white"
                }`}
              >
                {project.status}
              </span>
              <span className="text-[14px] text-blue-100/70">
                {joinMeta(project.area_name, project.year)}
              </span>
            </div>
            <h1 className="font-display font-bold text-[28px] md:text-[38px] leading-tight mt-3">
              {project.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-14">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-[1fr_280px] gap-12">
          <div className="space-y-10">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Summary</h2>
              {project.summary ? (
                <p className="text-[15.5px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.summary}
                </p>
              ) : (
                <p className="text-gray-500 text-sm">Not listed yet.</p>
              )}
            </div>

            {project.description && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Description</h2>
                <p className="text-[15.5px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            )}

            {project.methodology && (
              <div>
                <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Methodology</h2>
                <p className="text-[15.5px] text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.methodology}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">Details</h2>
              <dl className="text-[14px] space-y-2">
                {project.year && (
                  <div>
                    <dt className="text-gray-500 text-[12.5px]">Year</dt>
                    <dd className="text-gray-700">{project.year}</dd>
                  </div>
                )}
                {project.study_area && (
                  <div>
                    <dt className="text-gray-500 text-[12.5px]">Study area</dt>
                    <dd className="text-gray-700">{project.study_area}</dd>
                  </div>
                )}
                {project.area_name && (
                  <div>
                    <dt className="text-gray-500 text-[12.5px]">Ontology</dt>
                    <dd>
                      {project.area_slug ? (
                        <Link to={`/research/${project.area_slug}`} className="text-navy font-semibold">
                          {project.area_name}
                        </Link>
                      ) : (
                        project.area_name
                      )}
                    </dd>
                  </div>
                )}
                {project.epistemology_name && <div><dt className="text-gray-500 text-[12.5px]">Epistemology</dt><dd>{project.epistemology_name}</dd></div>}
              </dl>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Team ({project.researchers.length})
              </h2>
              <ul className="space-y-2">
                {project.researchers.map((r) => (
                  <li key={r.id}>
                    <Link to={`/people/${r.id}`} className="text-navy font-semibold text-[14.5px] hover:underline">
                      {r.name}
                    </Link>
                    {r.role && <div className="text-gray-500 text-[12.5px]">{r.role}</div>}
                  </li>
                ))}
                {project.researchers.length === 0 && (
                  <li className="text-gray-500 text-sm">None listed yet.</li>
                )}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
