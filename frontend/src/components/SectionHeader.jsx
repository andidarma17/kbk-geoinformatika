export default function SectionHeader({ kicker, title, description }) {
  return (
    <div className="max-w-[620px] mb-11">
      {kicker && (
        <div className="text-[13.5px] font-semibold text-[#01416D]/80 mb-2">{kicker}</div>
      )}
      <h2 className="text-[30px] font-bold">{title}</h2>
      {description && (
        <p className="mt-3 text-gray-500 text-[15.5px]">{description}</p>
      )}
    </div>
  );
}
