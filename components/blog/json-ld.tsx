/**
 * Renders structured data as a server-rendered script tag so crawlers see it in
 * the initial HTML.
 *
 * `<` is escaped because a "</script>" sequence anywhere inside the data would
 * otherwise terminate the tag early and spill the rest into the document.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
