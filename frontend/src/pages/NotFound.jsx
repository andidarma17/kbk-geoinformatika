import { Link } from "react-router-dom";
import { usePageMeta } from "../utils/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found", description: "The requested KBK Geoinformatika page could not be found." });
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-8 py-20">
      <h1 className="font-display text-[34px] font-bold text-navy">Page not found</h1>
      <p className="mt-4 text-gray-600">The page you requested could not be found.</p>
      <Link to="/" className="inline-block mt-5 text-navy font-semibold underline">Back to Home</Link>
    </section>
  );
}
