import { useEffect, useState } from "react";
import { api } from "../api";
import SectionHeader from "../components/SectionHeader";
import NewsCard from "../components/NewsCard";

export default function News() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getNews().then(setNews).catch((e) => setError(e.message));
  }, []);

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-500">
        Couldn't load news from the API. {error}
      </div>
    );
  }

  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            News &amp; Activities
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Field activities, seminars, publications milestones, and other group updates.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <SectionHeader kicker="Updates" title="All news" />
          <div className="grid md:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
            {news.length === 0 && (
              <p className="text-gray-400 col-span-full text-center py-10">
                No news posted yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </>
  );
}