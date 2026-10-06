export function adminWriteError(error) {
  return new Error(error.code === "23503"
    ? "This item is still used by other records. Remove or reassign those first."
    : error.message);
}
