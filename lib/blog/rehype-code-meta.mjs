/**
 * Copies a fence's meta string onto the <code> element's properties.
 *
 * mdast-util-to-hast puts fence meta on `data.meta` (see its handlers/code.js),
 * and `data` is not converted into JSX props — so without this, the meta in
 * ```tsx title="app/page.tsx" {2-4}
 * is silently dropped and never reaches the CodeBlock component.
 *
 * Written as a local plugin with no options because Turbopack cannot marshal
 * function-valued plugin options to Rust; it is referenced by path string from
 * next.config.ts.
 */

/** @returns {(tree: unknown) => void} */
export default function rehypeCodeMeta() {
  return function transformer(tree) {
    walk(tree);
  };
}

function walk(node) {
  if (!node || typeof node !== "object") return;

  if (
    node.type === "element" &&
    node.tagName === "code" &&
    node.data &&
    typeof node.data.meta === "string"
  ) {
    node.properties = { ...node.properties, meta: node.data.meta };
  }

  if (Array.isArray(node.children)) {
    for (const child of node.children) walk(child);
  }
}
