export default function PersonCard({ person }) {
  return (
    <div className="text-left">
      <div className="w-full aspect-square rounded-lg bg-gray-200 flex items-center justify-center text-gray-500 text-xs mb-3.5">
        Photo
      </div>
      <h4 className="text-[15px] font-bold">{person.name}</h4>
      <div className="text-[12.5px] text-navy my-1">
        {person.role} &middot; {person.area_name}
      </div>
      <div className="text-[12.5px] text-gray-500">{person.interests}</div>
    </div>
  );
}
