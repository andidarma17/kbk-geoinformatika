import PageHero from "../components/PageHero";
import ErrorNotice from "../components/ErrorNotice";
import { useEffect, useState } from "react";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import NewsCard from "../components/NewsCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { usePageMeta } from "../utils/usePageMeta";

export default function News() {
  usePageMeta({ title: "News", description: "Read news and updates from KBK Geoinformatika at Universitas Gadjah Mada." });
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    api.getNews()
      .then((items) => { if (active) setNews(items); })
      .catch((e) => { if (active) { console.error("Failed to load content:", e); setError(true); } })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  if (error) return <ErrorNotice />;

  return (
    <>
      <PageHero theme="news" className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              News &amp; Activities
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              Field activities, seminars, publications milestones, and other group updates.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="Updates" title="All news" />
          <div className="grid md:grid-cols-3 gap-6">
            {loading && <LoadingSkeleton />}
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
            {!loading && news.length === 0 && (
              <p className="text-gray-500 col-span-full text-center py-10">
                No news posted yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
