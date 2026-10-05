import { epistemologiesFor, validateClassification } from "../taxonomy";
import { useEffect, useState } from "react";
import { adminApi } from "./AdminApi";

export default function ResourceManager({ resource, config, areas, researchers, epistemologies, onSaved }) {
  const readOnly = config.fields.length === 0;
  const [items, setItems] = useState([]);
  const [editing, setEditing] = useState(null); // null = not editing, {} = new, object = editing
  const [form, setForm] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () => {
    adminApi.list(resource).then(setItems).catch((e) => setError(e.message));
  };

  useEffect(load, [resource]);

  const startNew = () => {
    setEditing({});
    setForm({});
    setError("");
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm(item);
    setError("");
  };

  const cancel = () => {
    setEditing(null);
    setForm({});
  };

  

  const handleChange = (key, value) => {
    setForm((f) => ({ ...f, [key]: value, ...(key === "research_area_id" ? { epistemology_id: "" } : {}) }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      for (const field of config.fields) {
        if (field.required && !String(form[field.key] ?? "").trim()) throw new Error(`${field.label} is required.`);
      }
      validateClassification(form, epistemologies);
      const payload = Object.fromEntries(config.fields.map((field) => [field.key, form[field.key] ?? (field.type === "researcher-multiselect" ? [] : "")]));
      if (editing?.id) {
        await adminApi.update(resource, editing.id, payload);
      } else {
        await adminApi.create(resource, payload);
      }
      cancel();
      load();
      onSaved?.();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    try {
      await adminApi.remove(resource, id);
      load();
      onSaved?.();
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">{config.label}</h2>
        {!editing && !readOnly &&(
          <button
            onClick={startNew}
            className="bg-navy text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-navy-dark"
          >
            + New
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded mb-4">{error}</div>
      )}

      {editing && (
        <div className="bg-white border border-gray-200 rounded-lg p-5 mb-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {config.fields.map((field) => (
              <div
                key={field.key}
               className={
  field.type === "textarea" || field.type === "researcher-multiselect"
    ? "sm:col-span-2"
    : ""
}
              >
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  {field.label}
                  {field.required && " *"}
                </label>

                {field.type === "textarea" ? (
                  <textarea aria-label={field.label}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    rows={3}
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : field.type === "select" ? (
                  <select aria-label={field.label}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    <option value="">--</option>
                    {field.options.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : field.type === "epistemology-select" ? (
                  <select aria-label={field.label}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm disabled:bg-gray-100"
                    value={form[field.key] || ""} disabled={!form.research_area_id}
                    onChange={(e) => handleChange(field.key, e.target.value)}>
                    <option value="">{form.research_area_id ? "--" : "Select an Ontology first"}</option>
                    {epistemologiesFor(epistemologies, form.research_area_id).map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
                  </select>
                ) : field.type === "area-select" ? (
                  <select aria-label={field.label}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, Number(e.target.value) || "")}
                  >
                    <option value="">--</option>
                    {areas.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name}
                      </option>
                    ))}
                  </select>
                                  ) : field.type === "researcher-multiselect" ? (
                  <div className="border border-gray-300 rounded-md p-3 max-h-48 overflow-y-auto grid sm:grid-cols-2 gap-x-4 gap-y-1.5">
                    {researchers.map((r) => {
                      const selected = form.researcher_ids || [];
                      const checked = selected.includes(r.id);
                      return (
                        <label key={r.id} className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              handleChange(
                                "researcher_ids",
                                checked ? selected.filter((x) => x !== r.id) : [...selected, r.id]
                              )
                            }
                          />
                          <span>
                            {r.name}
                            {r.role ? ` (${r.role})` : ""}
                          </span>
                        </label>
                      );
                    })}
                    {researchers.length === 0 && (
                      <span className="text-sm text-gray-400">Add researchers first.</span>
                    )}
                  </div>
                ) : (
                  <input aria-label={field.label}
                    type={field.type === "number" ? "number" : "text"}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-amber text-navy-dark text-sm font-semibold px-4 py-2 rounded-md hover:bg-amber-dark disabled:opacity-60"
            >
              {loading ? "Saving…" : "Save"}
            </button>
            <button
              onClick={cancel}
              className="text-sm font-semibold px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs text-gray-500 uppercase">
            <tr>
              {config.columns.map((col) => (
                <th key={col.key} className="px-4 py-3">
                  {col.label}
                </th>
              ))}
              <th className="px-4 py-3 w-32">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t border-gray-100">
                {config.columns.map((col) => (
                  <td key={col.key} className="px-4 py-3">
                    {item[col.key]}
                  </td>
                ))}
                <td className="px-4 py-3 flex gap-3">
                  {!readOnly && (
                    <button onClick={() => startEdit(item)} className="text-navy font-semibold hover:underline">
                      Edit
                    </button>
                  )}
                  <button onClick={() => handleDelete(item.id)} className="text-red-500 font-semibold hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={config.columns.length + 1} className="px-4 py-6 text-center text-gray-400">
                  No items yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}