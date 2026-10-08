// import { Link } from "react-router-dom";

// export default function Hero() {
//   return (
//     <section className="relative bg-navy text-white overflow-hidden min-h-[calc(100svh-4rem)] flex items-center py-12">
//       <svg
//         className="absolute inset-0 w-full h-full opacity-[0.16] pointer-events-none"
//         viewBox="0 0 1280 520"
//         preserveAspectRatio="xMaxYMid slice"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern id="grid" width="64" height="64" patternUnits="userSpaceOnUse">
//             <path d="M 64 0 L 0 0 0 64" fill="none" stroke="#ffffff" strokeWidth="0.6" />
//           </pattern>
//         </defs>
//         <rect width="1280" height="520" fill="url(#grid)" />
//         <circle cx="980" cy="140" r="3.5" fill="#FCC104" />
//         <circle cx="1080" cy="220" r="3.5" fill="#ffffff" />
//         <circle cx="1150" cy="90" r="3.5" fill="#ffffff" />
//         <line x1="980" y1="140" x2="1080" y2="220" stroke="#ffffff" strokeWidth="1" />
//         <line x1="1080" y1="220" x2="1150" y2="90" stroke="#ffffff" strokeWidth="1" />
//         <polygon points="760,380 840,340 900,410 820,460" fill="none" stroke="#ffffff" strokeWidth="1" />
//       </svg>

//       <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
//         <h1 className="font-display font-bold leading-tight text-[34px] md:text-[52px] text-white">
//           Understanding place through data, from the field to the map.
//         </h1>
//         <p className="mt-5 text-[17.5px] text-blue-100/80 max-w-[600px]">
//           KBK Geoinformatika is the geoinformatics research group within the
//           Department of Geodetic Engineering, Universitas Gadjah Mada, working
//           across GIS, photogrammetry, and remote sensing to study Indonesia's
//           cities, coasts, and landscapes.
//         </p>
//         <div className="flex flex-wrap gap-3.5 mt-8">
//           <Link
//             to="/research"
//             className="inline-flex items-center gap-3 px-7 py-3 rounded-md font-semibold text-[14.5px] bg-amber text-navy-dark hover:bg-amber-dark transition-colors"
//           >
//             Explore our research
//           </Link>
//           <Link
//             to="/people"
//             className="inline-flex items-center gap-2 px-7 py-3 rounded-md font-semibold text-[14.5px] border border-white/35 text-white hover:border-white transition-colors"
//           >
//             Meet the researchers
//           </Link>
//         </div>
//         <div className="mt-12 pt-5 border-t border-white/15 text-[13px] text-blue-100/75 max-w-[600px]">
//           Departemen Teknik Geodesi &middot; Fakultas Teknik &middot; Universitas Gadjah Mada
//         </div>
//       </div>
//     </section>
//   );
// }

import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative bg-navy text-white overflow-hidden min-h-[calc(100svh-4rem)] flex items-center py-12">
      <img
        src="/watermarked_img_15718748158720810915.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.16] pointer-events-none"
      />

      <div className="relative w-full max-w-6xl mx-auto px-6 md:px-8">
        <h1 className="font-display font-bold leading-tight text-[34px] md:text-[52px] text-white">
          Understanding place through data, from the field to the map.
        </h1>
        <p className="mt-5 text-[17.5px] text-blue-100/80 max-w-[600px]">
          KBK Geoinformatika is the geoinformatics research group within the
          Department of Geodetic Engineering, Universitas Gadjah Mada, working
          across GIS, photogrammetry, and remote sensing to study Indonesia's
          cities, coasts, and landscapes.
        </p>
        <div className="flex flex-wrap gap-3.5 mt-8">
          <Link
            to="/research"
            className="inline-flex items-center gap-3 px-7 py-3 rounded-md font-semibold text-[14.5px] bg-amber text-navy-dark hover:bg-amber-dark transition-colors"
          >
            Explore our research
          </Link>
          <Link
            to="/people"
            className="inline-flex items-center gap-2 px-7 py-3 rounded-md font-semibold text-[14.5px] border border-white/35 text-white hover:border-white transition-colors"
          >
            Meet the researchers
          </Link>
        </div>
        <div className="mt-12 pt-5 border-t border-white/15 text-[13px] text-blue-100/75 max-w-[600px]">
          Departemen Teknik Geodesi &middot; Fakultas Teknik &middot; Universitas Gadjah Mada
        </div>
      </div>
    </section>
  );
}