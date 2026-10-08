import { Link } from "react-router-dom";
import { EnvelopeIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 mb-10">
          
          <div>
            {/* Add your logo here */}
            <img 
              src="/ugm-logo.png" 
              alt="KBK Geoinformatika Logo" 
              className="h-20 w-auto mb-4" 
            />

            {/* If your logo already has the words "KBK Geoinformatika" in the image, 
                you can delete this next <div> entirely! */}
            <div className="font-display font-bold text-navy text-base mb-2">
              KBK Geoinformatika
            </div>
            
            <p className="text-sm text-gray-500 leading-relaxed">
              Departemen Teknik Geodesi
              <br />
              Fakultas Teknik
              <br />
              Universitas Gadjah Mada
            </p>
          </div>
          <div>
            <h4 className="text-[14px] text-navy font-extrabold mb-3.5">Explore</h4>
            <Link to="/research" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Field of Study</Link>
            <Link to="/people" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">People</Link>
            <Link to="/projects" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Projects</Link>
            <Link to="/publications" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Publications</Link>
            <Link to="/intellectual-property" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Intellectual Property</Link>
            <Link to="/community-services" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Community Services</Link>
          </div>
          <div>
            <h4 className="text-[14px] text-navy  font-extrabold mb-3.5">Group</h4>
            <Link to="/about" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">About</Link>
            <Link to="/news" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">News</Link>
            <Link to="/contact" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Contact</Link>
          </div>
          <div>
            <h4 className="text-[14px] text-navy font-extrabold mb-3.5">Contact</h4>
            <p className="flex items-center gap-2 mb-2.5">
              <EnvelopeIcon className="w-5 h-5 text-navy" />
              <a href="mailto:geodesi@ugm.ac.id" className="text-sm text-gray-500 hover:text-navy">
                geodesi@ugm.ac.id
              </a>
            </p>
            <p className="flex items-center gap-2 mb-2.5">
              <PhoneIcon className="w-5 h-5 text-navy" />
              <span className="text-sm text-gray-500">(+62274) 520226</span>
            </p>
            <p className="flex items-center gap-2 mb-2.5">
              <MapPinIcon className="w-5 h-5 text-navy" />
              <span className="text-sm text-gray-500">Jl. Grafika No.2 Bulaksumur, 
                <br />
                Yogyakarta, 55281</span>
            </p>
            
          </div>
        </div>
        <div className="border-t border-gray-200 pt-5 flex flex-wrap justify-between gap-2 text-xs text-gray-500">
          <span>&copy; 2026 KBK Geoinformatika, Departemen Teknik Geodesi UGM</span>
          <span>Placeholder site — content under development</span>
        </div>
      </div>
    </footer>
  );
}
