import { Link } from "react-router-dom";

export default function PublicationRow({ pub }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-4 items-start py-5 border-b border-gray-200">
      <div>
        <h3 className="text-[15.5px] font-semibold mb-1.5">
          <Link to={`/publications/${pub.id}`} className="hover:text-navy hover:underline">
            {pub.title}
          </Link>
        </h3>
        <div className="text-[13px] text-gray-500">
          {pub.authors} &middot; {pub.venue} &middot; {pub.year}
        </div>
      </div>
      <div className="flex gap-3.5 whitespace-nowrap">
        <Link to={`/publications/${pub.id}`} className="text-[13px] font-semibold text-navy">
          Details
        </Link>
        {pub.doi_url && (
          <a href={pub.doi_url} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">
            DOI
          </a>
        )}
        {pub.pdf_url && (
          <a href={pub.pdf_url} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-navy">
            PDF
          </a>
        )}
      </div>
    </div>
  );
}