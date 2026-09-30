import { useEffect, useState } from "react";

export default function LabCard({ lab }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [lab.image]);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <div className="aspect-[16/10] bg-gradient-to-br from-navy to-navy-dark flex items-center justify-center">
        {lab.image && !failed ? (
          <img
            src={lab.image}
            alt={lab.name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-blue-100/60 text-sm font-semibold">Lab photo</span>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-[19px] font-bold mb-2">{lab.name}</h3>
        <p className="text-gray-500 text-[14.5px] mb-4">{lab.description}</p>
        {lab.focus?.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {lab.focus.map((f) => (
              <span
                key={f}
                className="text-xs font-medium text-navy border border-navy/40 rounded-full px-2.5 py-0.5"
              >
                {f}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}