export default function LoadingSkeleton({ count = 3 }) {
  return (
    <>
      <span role="status" className="sr-only">Loading content…</span>
      {Array.from({ length: count }, (_, index) => (
        <div key={index} aria-hidden="true" className="animate-pulse rounded-lg border border-gray-100 bg-white p-5">
          <div className="h-4 w-2/3 rounded bg-gray-200" />
          <div className="mt-4 h-3 w-full rounded bg-gray-100" />
          <div className="mt-2 h-3 w-1/2 rounded bg-gray-100" />
        </div>
      ))}
    </>
  );
}
