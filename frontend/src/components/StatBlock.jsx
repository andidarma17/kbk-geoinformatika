export default function StatBlock({ value, label }) {
  return (
    <div className="bg-white py-6 px-5">
      <div className="font-display text-[30px] font-extrabold text-navy">{value}</div>
      <div className="text-[13px] text-gray-500 mt-1">{label}</div>
    </div>
  );
}
