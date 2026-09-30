export default function NewsCard({ item }) {
  const date = new Date(item.published_at);
  const label = isNaN(date)
    ? item.published_at
    : date.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const content = (
    <>
      <div className="text-[12.5px] text-gray-500 mb-2">{label}</div>
      <h3
        className={`text-[15.5px] font-bold mb-2 leading-snug ${
          item.link ? "group-hover:text-navy group-hover:underline" : ""
        }`}
      >
        {item.title}
      </h3>
      <p className="text-[13.5px] text-gray-500">{item.body}</p>
      {item.link && (
        <span className="inline-block mt-3 text-[13px] font-semibold text-navy">
          Read more ↗
        </span>
      )}
    </>
  );

  if (!item.link) {
    return <div className="border-l-[3px] border-navy pl-6">{content}</div>;
  }

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noreferrer"
      className="group block border-l-[3px] border-navy pl-6"
    >
      {content}
    </a>
  );
}