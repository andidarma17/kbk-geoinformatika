import { useEffect, useState } from "react";

// undefined = loading, null = not found; key refreshes kind-dependent loaders.
export function useRecord(id, load, key) {
  const [record, setRecord] = useState(undefined);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    setRecord(undefined);
    setError(false);
    if (!/^\d+$/.test(id)) {
      setRecord(null);
    } else {
      load(id).then((value) => {
        if (active) setRecord(value);
      }).catch((cause) => {
        if (active) {
          console.error("Failed to load content:", cause);
          setError(true);
        }
      });
    }
    return () => { active = false; };
  }, [id, key]);

  return { record, error };
}
