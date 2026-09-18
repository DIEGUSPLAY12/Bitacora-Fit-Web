/**
 * Typed content blocks — replaces dangerouslySetInnerHTML across the app.
 *
 * A `Segment` is a unit of inline text: either a plain string or a bolded string.
 * A `Block` is one of: paragraph, heading (h2), or unordered list.
 * `ContentRenderer` turns an array of blocks into React elements with no raw HTML.
 */

import React from "react";

/** Inline text: plain string or `{ b: "bold text" }` */
export type Segment = string | { b: string };

/** Structured content block */
export type Block =
  | { t: "p"; s: Segment[] }
  | { t: "h2"; text: string }
  | { t: "ul"; items: Segment[][] };

function renderSegments(segments: Segment[]): React.ReactNode {
  return segments.map((seg, i) =>
    typeof seg === "string" ? (
      seg
    ) : (
      <strong key={seg.b} className="text-foreground font-semibold">
        {seg.b}
      </strong>
    )
  );
}

interface ContentRendererProps {
  blocks: Block[];
}

export function ContentRenderer({ blocks }: ContentRendererProps) {
  return (
    <>
      {blocks.map((block, i) => {
        if (block.t === "p") {
          return (
            <p key={`p-${JSON.stringify(block.s)}`} className="mb-4">
              {renderSegments(block.s)}
            </p>
          );
        }
        if (block.t === "h2") {
          return (
            <h2
              key={`h2-${block.text}`}
              className="font-display text-xl md:text-2xl font-bold text-foreground tracking-tight mt-10 mb-4"
            >
              {block.text}
            </h2>
          );
        }
        if (block.t === "ul") {
          return (
            <ul key={`ul-${JSON.stringify(block.items)}`} className="mb-4 pl-6 space-y-2 list-disc">
              {block.items.map((item) => (
                <li key={`li-${JSON.stringify(item)}`} className="text-muted leading-relaxed">
                  {renderSegments(item)}
                </li>
              ))}
            </ul>
          );
        }
        return null;
      })}
    </>
  );
}
