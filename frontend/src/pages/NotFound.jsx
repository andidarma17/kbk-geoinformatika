import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import { usePageMeta } from "../utils/usePageMeta";

export default function NotFound() {
  usePageMeta({ title: "Page not found", description: "The requested KBK Geoinformatika page could not be found." });
  return (
    <PageHero theme="navigation">
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <h1 className="font-display text-[34px] font-bold">Page not found</h1>
        <p className="mt-4 text-blue-100/80">The page you requested could not be found.</p>
        <Link to="/" className="inline-block mt-5 font-semibold underline">Back to Home</Link>
      </div>
    </PageHero>
  );
}
