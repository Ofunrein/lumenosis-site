"use client";

import Script from "next/script";

/**
 * Wistia video embed.
 *
 * Video is hosted on Wistia (not in `public/`) so it never counts against the
 * Vercel deployment bundle or bandwidth. Pass the Wistia media ID (the hashed
 * ID from the embed snippet, e.g. "abc123xyz").
 */
export function WistiaVideo({
  mediaId,
  title = "Video",
  aspectRatio = "16 / 9",
}: {
  mediaId: string;
  title?: string;
  aspectRatio?: string;
}) {
  return (
    <>
      <Script src="https://fast.wistia.com/player.js" strategy="lazyOnload" />
      <Script src={`https://fast.wistia.com/embed/${mediaId}.js`} strategy="lazyOnload" type="module" />
      <style>{`
        wistia-player[media-id='${mediaId}']:not(:defined) {
          background: center / contain no-repeat
            url('https://fast.wistia.com/embed/medias/${mediaId}/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}</style>
      <div
        className="overflow-hidden rounded-[var(--radius)] bg-black shadow-[0_28px_90px_rgba(0,0,0,0.35)]"
        style={{ aspectRatio }}
      >
        {/* @ts-expect-error -- Wistia custom element is registered at runtime by the embed script */}
        <wistia-player media-id={mediaId} aria-label={title} style={{ width: "100%", height: "100%" }} />
      </div>
    </>
  );
}
