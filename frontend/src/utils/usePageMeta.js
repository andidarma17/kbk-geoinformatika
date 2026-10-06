import { useEffect } from "react";

export function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    const meta = document.querySelector('meta[name="description"]');
    const previousDescription = meta?.getAttribute("content") ?? null;
    const descriptionElement = meta || document.createElement("meta");
    if (!meta) {
      descriptionElement.setAttribute("name", "description");
      document.head.appendChild(descriptionElement);
    }

    document.title = `${title} | KBK Geoinformatika`;
    descriptionElement.setAttribute("content", description);

    return () => {
      document.title = previousTitle;
      if (!meta) descriptionElement.remove();
      else if (previousDescription === null) descriptionElement.removeAttribute("content");
      else descriptionElement.setAttribute("content", previousDescription);
    };
  }, [title, description]);
}
