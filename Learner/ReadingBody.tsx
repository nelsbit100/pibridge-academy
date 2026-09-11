// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Structured Reading Renderer
// Reading lessons carry deep, structured markdown-ish content
// (## sections, - bullets, **bold**). This component renders it
// with the same visual language as the rest of the player.
// ──────────────────────────────────────────────────────────────

/** Render inline **bold** spans within a text node. */
function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") && part.length > 4 ? (
      <strong key={i} className="text-white font-semibold">
        {part.slice(2, -2)}
      </strong>
    ) : (
      part
    )
  );
}

export function ReadingBody({ content }: { content: string }) {
  const blocks: React.ReactNode[] = [];
  let bullets: string[] = [];
  let codeLines: string[] | null = null;

  const flushBullets = () => {
    if (bullets.length === 0) return;
    blocks.push(
      <ul key={`ul-${blocks.length}`} className="my-4 space-y-2 pl-1">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-3 text-neutral-300 leading-relaxed">
            <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400/80" />
            <span>{inline(b)}</span>
          </li>
        ))}
      </ul>
    );
    bullets = [];
  };

  for (const raw of content.split("\n")) {
    const line = raw.trimEnd();
    if (line.trim() === "```") {
      if (codeLines) {
        blocks.push(
          <pre key={`pre-${blocks.length}`} className="my-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-xs leading-relaxed text-emerald-300">
            <code>{codeLines.join("\n")}</code>
          </pre>
        );
        codeLines = null;
      } else {
        flushBullets();
        codeLines = [];
      }
      continue;
    }
    if (codeLines) {
      codeLines.push(raw);
      continue;
    }
    if (line.startsWith("- ")) {
      bullets.push(line.slice(2));
      continue;
    }
    flushBullets();
    if (line.startsWith("## ")) {
      blocks.push(
        <h2 key={`h2-${blocks.length}`} className="mt-8 mb-3 text-lg font-bold text-amber-400">
          {line.slice(3)}
        </h2>
      );
    } else if (line.trim() === "") {
      // blank line → paragraph spacing (blocks carry their own margins)
    } else {
      blocks.push(
        <p key={`p-${blocks.length}`} className="my-4 text-neutral-300 leading-relaxed">
          {inline(line)}
        </p>
      );
    }
  }
  flushBullets();
  if (codeLines && codeLines.length > 0) {
    blocks.push(
      <pre key="pre-last" className="my-4 overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-xs leading-relaxed text-emerald-300">
        <code>{codeLines.join("\n")}</code>
      </pre>
    );
  }

  return <div className="max-w-none">{blocks}</div>;
}
