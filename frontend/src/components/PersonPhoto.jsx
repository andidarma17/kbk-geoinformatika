import { useEffect, useState } from "react";

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
  useEffect(() => setFailed(false), [person.photo_url]);

  return (
    <div
      className={`bg-gray-200 overflow-hidden flex items-center justify-center text-gray-500 text-lg font-semibold ${className}`}
    >
      {person.photo_url && !failed ? (
        <img
          src={person.photo_url}
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