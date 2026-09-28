export default function NewsCard({ item }) {
  const date = new Date(item.published_at);
  const label = isNaN(date) ? item.published_at : date.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  return (
    <div className="border-l-[3px] border-navy pl-6">
      <div className="text-[12.5px] text-gray-500 mb-2">{label}</div>
      <h3 className="text-[15.5px] font-bold mb-2 leading-snug">{item.title}</h3>
      <p className="text-[13.5px] text-gray-500">{item.body}</p>
    </div>
  );
}
