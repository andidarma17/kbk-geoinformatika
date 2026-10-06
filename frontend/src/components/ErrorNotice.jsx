const defaultMessage = "We couldn't load this content. Please try again later.";

export default function ErrorNotice({ message = defaultMessage, onRetry, className }) {
  return (
    <div role="alert" className={className || "max-w-6xl mx-auto px-6 md:px-8 py-16 text-center text-gray-600"}>
      <p>{message}</p>
      {onRetry && (
        <button type="button" onClick={onRetry} className="mt-3 text-sm font-semibold text-navy underline">
          Retry
        </button>
      )}
    </div>
  );
}
