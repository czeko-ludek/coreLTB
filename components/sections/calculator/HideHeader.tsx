'use client';

import { useEffect } from 'react';

/**
 * HideHeader — ukrywa globalny header na stronie /wycena TYLKO na desktop (lg+).
 * Na mobile header zostaje widoczny (hamburger menu).
 * Inline <style> renderowane na serwerze → zero flash.
 */

const CSS = `
header, header ~ .mega-menu-overlay { display: none !important; }
.sticky:has(header) { display: none !important; }
`;

export const HideHeader = () => {
  const styleId = 'hide-header-style';

  useEffect(() => {
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = CSS;
      document.head.appendChild(style);
    }

    return () => {
      document.getElementById(styleId)?.remove();
    };
  }, []);

  // SSR: render inline style to prevent flash before hydration
  return (
    <style dangerouslySetInnerHTML={{ __html: CSS }} />
  );
};
