export default function ResearchAreaCard({ area }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-7 hover:border-navy/60 transition-colors">
      <h3 className="text-[19px] font-bold mb-2.5">{area.name}</h3>
      <p className="text-gray-500 text-[14.5px] mb-4">{area.description}</p>
      <div className="flex flex-wrap gap-2">
        {area.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-medium text-navy border border-navy/40 rounded-full px-2.5 py-0.5"
          >
            {tag}
          </span>
        ))}
      </div>
      <a href="#" className="inline-block mt-4 text-[13.5px] font-semibold text-navy">
        View researchers &amp; projects
      </a>
    </div>
  );
}