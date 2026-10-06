import { useEffect, useState } from "react";
import { safeUrl } from "../utils/safeUrl";

function initials(name = "") {
  const letters = name
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return letters || "Photo";
}

export default function PersonPhoto({ person, className = "" }) {
  const [failed, setFailed] = useState(false);
  const photoUrl = safeUrl(person.photo_url);
  useEffect(() => setFailed(false), [person.photo_url]);

  return (
    <div
      className={`bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 text-lg font-semibold ${className}`}
    >
      {photoUrl && !failed ? (
        <img
          src={photoUrl}
          alt={`Photo of ${person.name}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className="w-full h-full object-cover object-top"
        />
      ) : (
        initials(person.name)
      )}
    </div>
  );
}
