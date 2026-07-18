"use client";

import { useEffect } from "react";

/**
 * Hides Clarky's auto-greeting bubble (the white "Welcome!..." popup),
 * leaving just the clean launcher icon. Clarky renders inside a shadow
 * DOM, so page CSS can't reach it — we inject a scoped <style> into the
 * shadow root once the widget mounts.
 *
 * If Clarky ever exposes a dashboard toggle for the greeting/welcome
 * message, prefer that and delete this.
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

      if (shadow) {
        if (!shadow.getElementById(STYLE_ID)) {
          const style = document.createElement("style");
          style.id = STYLE_ID;
          style.textContent = css;
          shadow.appendChild(style);
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
