import { useId } from "react";

// Quiet, subject-specific line drawings keep the existing navy headers legible.
function HeroDrawing({ theme }) {
  switch (theme) {
    case "people":
    case "community-services":
      return <>
        <path d="M130 100 300 65 465 145 390 280 200 255 130 100 390 280M300 65 200 255 465 145" />
        {[[130, 100], [300, 65], [465, 145], [390, 280], [200, 255]].map(([x, y]) =>
          <g key={x} transform={`translate(${x} ${y})`}>
            <circle r="31" fill="#01416D" /><circle cy="-7" r="8" />
            <path d="M-16 16c0-18 32-18 32 0" />
          </g>)}
        {theme === "community-services" && <path stroke="#FCC104" d="m225 175 70-42 70 42v105H225ZM280 280v-58h30v58" />}
      </>;
    case "publications":
      return <>
        <path d="M120 70q90-30 180 10 90-40 180-10v210q-90-30-180 10-90-40-180-10ZM300 80v210" />
        {[120, 155, 190, 225].map((y) => <path key={y} d={`M150 ${y}q60-12 120 8m60-8q60-20 120-8`} />)}
        <path stroke="#FCC104" d="M365 68v86l24-18 24 11V62" />
      </>;
    case "intellectual-property":
      return <>
        <path d="M175 42h180l60 60v208H175ZM355 42v60h60M200 270h135M200 288h95" />
        <path d="m240 158 52-30 52 30v60l-52 30-52-30Zm0 0 52 30 52-30m-52 30v60" />
        <path strokeDasharray="5 7" d="M292 112V84m68 105h64m-200 0h-60" />
        <circle cx="405" cy="267" r="32" stroke="#FCC104" />
        <path stroke="#FCC104" d="m389 266 11 11 22-24m-37 42-6 34 25-11 24 11-5-34" />
      </>;
    case "facilities":
      return <>
        <rect x="212" y="90" width="166" height="103" rx="12" />
        <circle cx="295" cy="140" r="37" /><circle cx="295" cy="140" r="21" />
        <path d="M247 90V71h95v19M295 193v40m-36 0h72M280 233l-65 97m95-97 65 97m-80-97v97" />
        <path stroke="#FCC104" d="M158 70v-25h35m205 0h35v25M158 209v25h35m205 0h35v-25" />
        <path strokeDasharray="4 8" d="M105 140h96m188 0h96" />
      </>;
    case "news":
      return <>
        <path d="M152 70h277v220H152ZM429 105h30v190q0 20-20 20H182q-30 0-30-25" />
        <path stroke="#FCC104" d="M180 100h190" />
        <path d="M180 128h90v83h-90Zm113 0h107m-107 28h107m-107 28h107m-107 27h74M180 243h220m-220 23h175" />
      </>;
    case "contact":
    case "navigation":
      return <>
        <path d="m110 110 120-45 120 45 120-45v215l-120 45-120-45-120 45ZM230 65v215m120-170v215" />
        <path strokeDasharray="5 7" d="m155 243 87-45 55 27 112-59" />
        <path stroke="#FCC104" fill="#01416D" d="M354 135c0-62 88-62 88 0 0 30-44 69-44 69s-44-39-44-69Z" />
        <circle stroke="#FCC104" cx="398" cy="132" r="14" />
      </>;
    case "projects":
      return <>
        <path d="m80 262 95-180 145 28 172-62 35 202-184 67-168-55 145-152 23 207 149-269M175 82l168 235M320 110l207 140M80 262h95" />
        {[[80, 262], [175, 82], [320, 110], [492, 48], [527, 250], [343, 317], [175, 262]].map(([x, y]) =>
          <circle key={x + y} cx={x} cy={y} r="5" fill="#FCC104" stroke="none" />)}
      </>;
    default:
      return <>
        {[0, 1, 2, 3, 4, 5].map((i) => <path key={i} transform={`translate(${i * 20} ${i * 13})`}
          d="M40 265C20 195 100 210 123 147S173 27 252 57s24 113 123 109 145 40 100 115-130 79-191 40S58 347 40 265Z" />)}
        <path stroke="#FCC104" d="M300 143v28m-14-14h28M427 264v28m-14-14h28" />
      </>;
  }
}

export default function PageHero({ theme = "research", className = "py-20", children }) {
  const fadeId = useId();
  return (
    <section className={`relative isolate overflow-hidden bg-navy text-white ${className}`}>
      {theme === "about" ? <>
        <img src="/watermarked_img_15718748158720810915.jpg" alt="" aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/80" />
      </> : <svg aria-hidden="true" focusable="false" viewBox="0 0 600 360"
        className="absolute right-0 top-0 h-full w-full md:w-3/5 pointer-events-none opacity-[0.12] md:opacity-30"
        preserveAspectRatio="xMaxYMid meet">
        <defs><linearGradient id={fadeId}><stop stopColor="white" stopOpacity="0" /><stop offset="0.45" stopColor="white" /></linearGradient>
          <mask id={`${fadeId}-mask`}><rect width="600" height="360" fill={`url(#${fadeId})`} /></mask></defs>
        <g mask={`url(#${fadeId}-mask)`} fill="none" stroke="#dbeafe" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <HeroDrawing theme={theme} />
        </g>
      </svg>}
      <div className="relative">{children}</div>
    </section>
  );
}
