import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { trackPageView } from "../lib/tracking.js";

export default function RouteTracker() {
  const location = useLocation();

  useEffect(() => {
    // location.key is unique per history entry; module guard prevents StrictMode double-fire
    trackPageView(location.key || `${location.pathname}${location.search}${location.hash}`);
  }, [location.key, location.pathname, location.search, location.hash]);

  return null;
}
