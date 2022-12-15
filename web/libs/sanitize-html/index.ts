import sanitizeHtml from "sanitize-html";

export const showHtml = (content: string): string => {
  if (!content) {
    return "";
  }

  return sanitizeHtml(content, {
    allowedAttributes: {
      "*": ["class", "style", "id"],
      img: [
        "src",
        "alt",
        "title",
        "width",
        "srcset",
        "height",
        "loading",
        "data-entity-type",
        "data-entity-uuid",
      ],
      a: ["href", "name", "target"],
      iframe: ["src", "width", "height", "allowfullscreen"],
    },
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "iframe",
      "img",
      "nl",
      "strike",
      "ins",
    ]),
  });
};
