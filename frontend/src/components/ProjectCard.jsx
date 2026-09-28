export default function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <div className="h-32 relative bg-gradient-to-br from-navy to-navy-dark">
        <span className="absolute top-3 left-3 text-[11px] font-semibold bg-white/90 text-navy px-2.5 py-0.5 rounded-full">
          {project.status}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-[16px] font-semibold mb-2 leading-snug">{project.title}</h3>
        <div className="text-[12.5px] text-gray-500 mb-2.5">
          {project.area_name} &middot; {project.year}
        </div>
        <p className="text-[13.5px] text-gray-500 flex-1">{project.summary}</p>
      </div>
    </div>
  );
}