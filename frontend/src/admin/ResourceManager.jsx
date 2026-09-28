import { useEffect, useState } from "react";
import { adminApi } from "./adminApi";

export default function ResourceManager({ resource, config, areas }) {
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
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError("");
    try {
      if (editing?.id) {
        await adminApi.update(resource, editing.id, form);
      } else {
        await adminApi.create(resource, form);
      }
      cancel();
      load();
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
                className={field.type === "textarea" ? "sm:col-span-2" : ""}
              >
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  {field.label}
                  {field.required && " *"}
                </label>

                {field.type === "textarea" ? (
                  <textarea
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                    rows={3}
                    value={form[field.key] || ""}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  />
                ) : field.type === "select" ? (
                  <select
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
                ) : field.type === "area-select" ? (
                  <select
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
                ) : (
                  <input
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

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
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