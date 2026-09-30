import SectionHeader from "../components/SectionHeader";
import MockFlag from "../components/MockFlag";
import LabCard from "../components/LabCard";

// Put photos in frontend/public/labs/ and reference them as "/labs/xxx.jpg"
const labs = [
  {
    name: "Laboratory of Geoinformatics",
    image: "/labs/geoinformatics.jpg",
    description:
      "[Placeholder] Spatial database management, GIS analysis, cadastral and address data work, and WebGIS development.",
    focus: ["GIS", "Cadastre", "WebGIS"]
  },
  {
    name: "Laboratory of Photogrammetry and Remote Sensing",
    image: "/labs/photogrammetry-rs.jpg",
    description:
      "[Placeholder] UAV photogrammetry, satellite image processing, and time-series analysis of land and coastal change.",
    focus: ["Photogrammetry", "Remote Sensing", "UAV"]
  }
];

const categories = [
  { title: "GIS Software", items: ["ArcGIS Pro", "QGIS", "PostGIS", "GeoServer"] },
  {
    title: "Remote Sensing & Image Processing",
    items: ["Google Earth Engine", "ENVI", "SNAP (Sentinel Application Platform)", "ERDAS Imagine"]
  },
  {
    title: "UAV & Field Survey Equipment",
    items: [
      "[Placeholder] Fixed-wing mapping drone",
      "[Placeholder] Multi-rotor UAV with RGB/multispectral sensor",
      "GNSS RTK receivers",
      "Total station"
    ]
  },
  {
    title: "Computing Infrastructure",
    items: [
      "[Placeholder] GPU workstation for image processing",
      "Cloud compute for large-scale remote sensing analysis"
    ]
  },
  {
    title: "Datasets",
    items: [
      "[Placeholder] Cadastral and address datasets, Yogyakarta",
      "[Placeholder] Multi-temporal satellite imagery archive",
      "[Placeholder] UAV orthomosaics from prior field campaigns"
    ]
  },
  {
    title: "Visualization & WebGIS",
    items: [
      "Leaflet / Mapbox GL-based WebGIS deployments",
      "[Placeholder] Departmental spatial data dashboard"
    ]
  }
];

export default function Facilities() {
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            Facilities &amp; Resources
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Laboratories, software, equipment, and data resources supporting our research in geoinformatics, photogrammetry, and remote sensing.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Laboratories"
            title="Our labs"
            description="Two laboratories host the group's research and teaching."
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            {labs.map((lab) => (
              <LabCard key={lab.name} lab={lab} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader
            kicker="Resources"
            title="What we work with"
            description="Only categories that genuinely apply to the group are listed here — replace placeholder items with actual inventory."
          />
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div key={cat.title} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="text-[16px] font-bold mb-3">{cat.title}</h3>
                <ul className="space-y-1.5">
                  {cat.items.map((item) => (
                    <li key={item} className="text-[14px] text-gray-600 flex gap-2">
                      <span className="text-navy">&middot;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}