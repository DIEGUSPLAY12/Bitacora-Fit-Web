/**
 * Typed content block definitions — pure TypeScript, sin JSX.
 * Importable desde cualquier archivo .ts o .tsx.
 *
 * A `Segment` is a unit of inline text: either a plain string or a bolded string.
 * A `Block` is one of: paragraph, heading (h2), or unordered list.
 */

/** Inline text: plain string or `{ b: "bold text" }` */
export type Segment = string | { b: string };

/** Structured content block */
export type Block =
  | { t: "p"; s: Segment[] }
  | { t: "h2"; text: string }
  | { t: "ul"; items: Segment[][] };
