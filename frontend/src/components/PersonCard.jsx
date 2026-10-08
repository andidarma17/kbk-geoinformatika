import { Link } from "react-router-dom";
import PersonPhoto from "./PersonPhoto";
import { joinMeta } from "../utils/joinMeta";

export default function PersonCard({ person }) {
  return (
    <Link to={`/people/${person.id}`} className="block text-left group">
      <PersonPhoto
        person={person}
        className="w-full aspect-square rounded-lg mb-3.5 group-hover:opacity-90 transition-opacity"
      />
      <h4 className="text-[15px] font-bold group-hover:text-navy group-hover:underline">
        {person.name}
      </h4>
      <div className="text-[12.5px] text-navy my-1">
        {joinMeta(person.role, person.area_name)}
      </div>
      <div className="text-[12.5px] text-gray-500">{person.interests}</div>
    </Link>
  );
}
