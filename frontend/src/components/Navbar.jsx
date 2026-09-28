import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navStructure = [
  { type: "path", to: "/", label: "Home" },
  { type: "path", to: "/about", label: "About" },
  {
    type: "dropdown",
    label: "Research",
    items: [
      { to: "/research", label: "Research Areas" },
      { to: "/projects", label: "Projects" },
      { to: "/publications", label: "Publications" }
    ]
  },
  {
    type: "dropdown",
    label: "People & Resources",
    items: [
      { to: "/people", label: "People" },
      { to: "/facilities", label: "Facilities" }
    ]
  },
  { type: "path", to: "/news", label: "News" }
];

function Dropdown({ item, openMenu, setOpenMenu }) {
  const ref = useRef(null);
  const isOpen = openMenu === item.label;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpenMenu(null);
      }
    }

    // Changed 'mousedown' to 'click'
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [setOpenMenu]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation(); // Prevents immediate close on open
          setOpenMenu(isOpen ? null : item.label);
        }}
        className="flex items-center gap-1 text-[14.5px] font-medium text-gray-500 hover:text-navy transition-colors"
      >
        {item.label}
        <svg width="10" height="10" viewBox="0 0 10 10" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" fill="none" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-md shadow-sm py-1.5 min-w-[180px] z-50">
          {item.items.map((sub) => (
            <Link
              key={sub.to}
              to={sub.to}
              onClick={() => setOpenMenu(null)}
              className="block px-4 py-2 text-[14px] text-gray-600 hover:bg-gray-50 hover:text-navy"
            >
              {sub.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false); // mobile panel
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        <Link to="/" className="flex flex-col leading-tight">
          <span className="font-display font-bold text-navy text-[17px]">KBK Geoinformatika</span>
          <span className="text-[11.5px] text-gray-500">Departemen Teknik Geodesi, UGM</span>
        </Link>

        <nav className="hidden md:flex items-center gap-7">
          {navStructure.map((item) =>
            item.type === "dropdown" ? (
              <Dropdown key={item.label} item={item} openMenu={openMenu} setOpenMenu={setOpenMenu} />
            ) : (
              <Link
                key={item.to}
                to={item.to}
                className="text-[14.5px] font-medium text-gray-500 hover:text-navy transition-colors"
              >
                {item.label}
              </Link>
            )
          )}
          <Link
            to="/contact"
            className="bg-navy text-white px-5 py-2 rounded-md text-sm font-semibold hover:bg-navy-dark transition-colors"
          >
            Contact
          </Link>
        </nav>

        <button
          className="md:hidden flex flex-col gap-1.5 p-1.5"
          aria-label="Open menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="w-5 h-0.5 bg-gray-900" />
          <span className="w-5 h-0.5 bg-gray-900" />
          <span className="w-5 h-0.5 bg-gray-900" />
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 border-t border-gray-200 flex flex-col">
          {navStructure.map((item) =>
            item.type === "dropdown" ? (
              <div key={item.label} className="py-2.5 border-b border-gray-100">
                <div className="text-[13px] font-semibold text-gray-400 uppercase mb-1.5">
                  {item.label}
                </div>
                <div className="flex flex-col gap-2 pl-2">
                  {item.items.map((sub) => (
                    <Link key={sub.to} to={sub.to} className="text-[15px] text-gray-700">
                      {sub.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link key={item.to} to={item.to} className="py-2.5 text-[15px] border-b border-gray-100">
                {item.label}
              </Link>
            )
          )}
          <Link to="/contact" className="py-2.5 text-[15px] font-semibold text-navy">
            Contact
          </Link>
        </div>
      )}
    </header>
  );
}