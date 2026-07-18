"use client";

import { useEffect } from "react";

/**
 * Two fixes for the Clarky chat widget, which renders inside a shadow
 * DOM (so page CSS can't reach it):
 *
 * 1. Hide the auto-greeting bubble (the white "Welcome!..." popup) —
 *    inject a scoped <style> into the shadow root, leaving just the icon.
 * 2. Let the chat's message list scroll. Lenis (our smooth-scroll)
 *    hijacks wheel events window-wide, so scrolling inside the chat
 *    scrolled the page instead. `data-lenis-prevent` on the widget host
 *    tells Lenis to skip wheel events over it (the host is in Lenis's
 *    composed-path check), restoring native scroll inside the chat.
 *
 * If Clarky ever exposes a dashboard toggle for the greeting, prefer
 * that for #1 and delete the style injection.
 */
export function ClarkyTweaks() {
  useEffect(() => {
    const STYLE_ID = "sg-clarky-tweaks";
    const css = `.chat-widget-button-intro-w-picture { display: none !important; }`;

    let tries = 0;
    const maxTries = 80; // ~40s at 500ms — covers slow late loads

    const interval = setInterval(() => {
      tries += 1;
      const host = document.getElementById("chat-widget-container");
      const shadow = host?.shadowRoot;

      if (host && shadow) {
        // 1. Hide the greeting bubble.
        if (!shadow.getElementById(STYLE_ID)) {
          const style = document.createElement("style");
          style.id = STYLE_ID;
          style.textContent = css;
          shadow.appendChild(style);
        }
        // 2. Let the chat scroll natively (exclude it from Lenis).
        if (!host.hasAttribute("data-lenis-prevent")) {
          host.setAttribute("data-lenis-prevent", "");
        }
        clearInterval(interval);
      } else if (tries >= maxTries) {
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
}
