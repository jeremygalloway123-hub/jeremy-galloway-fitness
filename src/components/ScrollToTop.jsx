import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, "");
      const scrollToHash = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView();
          return true;
        }
        return false;
      };

      if (!scrollToHash()) {
        // Element may not be painted yet on route change
        requestAnimationFrame(() => {
          if (!scrollToHash()) {
            setTimeout(scrollToHash, 50);
          }
        });
      }
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
