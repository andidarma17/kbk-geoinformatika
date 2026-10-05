import { useEffect, useState } from "react";
import { adminApi } from "./AdminApi";
import { api } from "../api";
import { resourceConfigs } from "./resourceConfigs";
import ResourceManager from "./ResourceManager";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [researchers, setResearchers] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await adminApi.login(email, password);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-8 w-full max-w-sm">
        <h1 className="font-display font-bold text-navy text-lg mb-1">KBK Geoinformatika</h1>
        <p className="text-sm text-gray-500 mb-6">Admin sign in</p>

        <label className="block text-xs font-semibold text-gray-500 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
          autoFocus
        />

        <label className="block text-xs font-semibold text-gray-500 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
        />

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-navy text-white font-semibold py-2.5 rounded-md hover:bg-navy-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function ChangePasswordForm() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    try {
      await adminApi.changePassword(currentPassword, newPassword);
      setStatus({ ok: true });
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      setStatus({ error: err.message });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 max-w-md">
      <h2 className="text-xl font-bold mb-4">Change admin password</h2>
      <label className="block text-xs font-semibold text-gray-500 mb-1">Current password</label>
      <input
        type="password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
      />
      <label className="block text-xs font-semibold text-gray-500 mb-1">New password (min 8 chars)</label>
      <input
        type="password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-4"
      />
      {status?.ok && <div className="text-green-600 text-sm mb-3">Password updated.</div>}
      {status?.error && <div className="text-red-500 text-sm mb-3">{status.error}</div>}
      <button className="bg-amber text-navy-dark font-semibold px-4 py-2 rounded-md hover:bg-amber-dark">
        Update password
      </button>
    </form>
  );
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined); // undefined = still checking
  const [tab, setTab] = useState("research-areas");
  const [epistemologies, setEpistemologies] = useState([]);
  const [lookupError, setLookupError] = useState("");
  const [lookupVersion, setLookupVersion] = useState(0);
  const [areas, setAreas] = useState([]);
  const [researchers, setResearchers] = useState([]);   

  useEffect(() => {
    adminApi.getSession().then(setSession);
    return adminApi.onAuthChange(setSession);
  }, []);

    useEffect(() => {
    if (session) {
      setLookupError("");
      Promise.all([api.getResearchAreas(), api.getResearchers(), api.getEpistemologies()])
        .then(([a, r, e]) => { setAreas(a); setResearchers(r); setEpistemologies(e); })
        .catch((e) => setLookupError(e.message));
    }
  }, [session, tab, lookupVersion]);

  useEffect(() => {
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex, nofollow";
    document.head.appendChild(meta);
    return () => document.head.removeChild(meta);
  }, []);

  if (session === undefined) return null;
  if (!session) return <LoginForm />;

  const tabs = [...Object.keys(resourceConfigs), "settings"];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="font-display font-bold text-navy">KBK Geoinformatika — Admin</div>
          <button
            onClick={() => adminApi.logout()}
            className="text-sm font-semibold text-gray-500 hover:text-navy"
          >
            Log out
          </button>
        </div>
        <nav className="max-w-6xl mx-auto px-6 flex gap-6 border-t border-gray-100 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`py-3 text-sm font-semibold border-b-2 whitespace-nowrap ${
                tab === t ? "border-navy text-navy" : "border-transparent text-gray-500"
              }`}
            >
              {t === "settings" ? "Settings" : resourceConfigs[t].label}
            </button>
          ))}
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {lookupError && <p role="alert" className="mb-4 text-red-600">Could not load form options: {lookupError}</p>}
        {tab === "settings" ? (
          <ChangePasswordForm />
        ) : (
          <ResourceManager key={tab} epistemologies={epistemologies} onSaved={() => setLookupVersion((v) => v + 1)} resource={tab} config={resourceConfigs[tab]} areas={areas} researchers={researchers} />
        )}
      </main>
    </div>
  );
}