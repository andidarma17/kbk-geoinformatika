import { api } from "../api";
import { useRef, useState } from "react";
import ErrorNotice from "../components/ErrorNotice";
import { usePageMeta } from "../utils/usePageMeta";

export default function Contact() {
  usePageMeta({ title: "Contact & Collaboration", description: "Contact KBK Geoinformatika to discuss research, study, or collaboration opportunities." });
  const [form, setForm] = useState({ name: "", email: "", affiliation: "", message: "" });
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | { error }
  const mountedAt = useRef(Date.now());

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (website) {
      setStatus("sent");
      setForm({ name: "", email: "", affiliation: "", message: "" });
      setWebsite("");
      return;
    }
    if (Date.now() - mountedAt.current < 3000) {
      setStatus("too-soon");
      return;
    }
    setStatus("sending");
    try {
      await api.submitInquiry(form);
      setStatus("sent");
      setForm({ name: "", email: "", affiliation: "", message: "" });
    } catch (err) {
      console.error("Failed to send inquiry:", err);
      setStatus({ error: true });
    }
  };
  
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="max-w-[720px]">
            <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
              Contact &amp; Collaboration
            </h1>
            <p className="mt-5 text-[17px] text-blue-100/80">
              Open to collaboration with prospective students, academic researchers, government agencies, and industry partners.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Get in touch</h2>
            <div className="space-y-3 text-[15px] text-gray-600 mb-8">
              <p>Departemen Teknik Geodesi<br />Fakultas Teknik<br />Universitas Gadjah Mada<br />Yogyakarta, Indonesia</p>
              <p>Email: <a href="mailto:geodesi@ugm.ac.id" className="text-navy font-semibold">geodesi@ugm.ac.id</a></p>
              <p>(+62274)520226</p>
            </div>

            <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Who this is for</h3>
            <ul className="space-y-2 text-[14.5px] text-gray-600">
              <li><span className="font-semibold text-gray-800">Prospective students</span> — inquire about available research topics and thesis supervision.</li>
              <li><span className="font-semibold text-gray-800">Academic collaborators</span> — propose joint research or co-authorship.</li>
              <li><span className="font-semibold text-gray-800">Government &amp; industry</span> — discuss applied geospatial work or data partnerships.</li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-7">
            <h2 className="text-xl font-bold mb-5">Send an inquiry</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input id="contact-website" name="website" tabIndex={-1} autoComplete="off"
                  value={website} onChange={(e) => setWebsite(e.target.value)} />
              </div>
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-gray-500 mb-1">Name *</label>
                <input
                  id="contact-name"
                  required
                  maxLength={200}
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-gray-500 mb-1">Email *</label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  maxLength={320}
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-affiliation" className="block text-xs font-semibold text-gray-500 mb-1">Affiliation</label>
                <input
                  id="contact-affiliation"
                  maxLength={200}
                  value={form.affiliation}
                  onChange={(e) => handleChange("affiliation", e.target.value)}
                  placeholder="University, agency, or company"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="block text-xs font-semibold text-gray-500 mb-1">Message *</label>
                <textarea
                  id="contact-message"
                  required
                  maxLength={5000}
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {status === "sent" && (
                <div role="status" className="text-green-600 text-sm">Thanks — your message has been sent.</div>
              )}
              {status === "too-soon" && (
                <div role="alert" className="text-amber-800 text-sm">Please wait a moment and try again.</div>
              )}
              {status?.error && <ErrorNotice message="We couldn't send your message. Please try again later." className="text-red-600 text-sm" />}

              <button
                type="submit"
                disabled={status === "sending"}
                className="bg-amber text-navy-dark font-semibold px-5 py-2.5 rounded-md hover:bg-amber-dark disabled:opacity-60"
              >
                {status === "sending" ? "Sending…" : "Send inquiry"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
