import { api } from "../api";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", affiliation: "", message: "" });
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | { error }

  const handleChange = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setStatus("sending");
  //   try {
  //     const res = await fetch("/api/inquiries", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(form)
  //     });
  //     const data = await res.json().catch(() => ({}));
  //     if (!res.ok) throw new Error(data.error || "Something went wrong");
  //     setStatus("sent");
  //     setForm({ name: "", email: "", affiliation: "", message: "" });
  //   } catch (err) {
  //     setStatus({ error: err.message });
  //   }
  // };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await api.submitInquiry(form);
      setStatus("sent");
      setForm({ name: "", email: "", affiliation: "", message: "" });
    } catch (err) {
      setStatus({ error: err.message });
    }
  };
  
  return (
    <>
      <section className="bg-navy text-white py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-8 max-w-[720px]">
          <h1 className="font-display font-bold text-[34px] md:text-[44px] leading-tight">
            Contact &amp; Collaboration
          </h1>
          <p className="mt-5 text-[17px] text-blue-100/80">
            Open to collaboration with prospective students, academic researchers, government agencies, and industry partners.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6 md:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-xl font-bold mb-4">Get in touch</h2>
            <div className="space-y-3 text-[15px] text-gray-600 mb-8">
              <p>Departemen Teknik Geodesi<br />Fakultas Teknik<br />Universitas Gadjah Mada<br />Yogyakarta, Indonesia</p>
              <p>Email: <a href="mailto:geoinformatika@geodesi.ugm.ac.id" className="text-navy font-semibold">geoinformatika@geodesi.ugm.ac.id</a></p>
              <p>[Placeholder phone number]</p>
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
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Name *</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Email *</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Affiliation</label>
                <input
                  value={form.affiliation}
                  onChange={(e) => handleChange("affiliation", e.target.value)}
                  placeholder="University, agency, or company"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              {status === "sent" && (
                <div className="text-green-600 text-sm">Thanks — your message has been sent.</div>
              )}
              {status?.error && <div className="text-red-500 text-sm">{status.error}</div>}

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