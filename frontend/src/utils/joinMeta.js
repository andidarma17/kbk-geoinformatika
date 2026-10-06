export const joinMeta = (...parts) =>
  parts.filter((p) => p !== null && p !== undefined && p !== "").join(" · ");
