export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-14 pb-8">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.3fr_1fr_1fr_1fr] gap-8 mb-10">
          <div>
            <div className="font-display font-bold text-navy text-base mb-2">
              KBK Geoinformatika
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              Departemen Teknik Geodesi
              <br />
              Fakultas Teknik
              <br />
              Universitas Gadjah Mada
              <br />
              Yogyakarta, Indonesia
            </p>
          </div>
          <div>
            <h4 className="text-[13px] text-gray-500 font-semibold mb-3.5">Explore</h4>
            <a href="/research" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Research</a>
            <a href="/people" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">People</a>
            <a href="/rojects" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Projects</a>
            <a href="/publications" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Publications</a>
          </div>
          <div>
            <h4 className="text-[13px] text-gray-500 font-semibold mb-3.5">Group</h4>
            <a href="/about" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">About</a>
            <a href="/news" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">News</a>
            <a href="/contact" className="block text-sm text-gray-500 mb-2.5 hover:text-navy">Contact</a>
          </div>
          <div>
            <h4 className="text-[13px] text-gray-500 font-semibold mb-3.5">Contact</h4>
            <p className="text-sm text-gray-500 mb-2.5">geoinformatika@geodesi.ugm.ac.id</p>
            <p className="text-sm text-gray-500 mb-2.5">[Placeholder phone / address]</p>
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
