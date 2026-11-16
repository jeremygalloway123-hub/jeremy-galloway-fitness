import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import BookPage from "./pages/BookPage.jsx";
import ThankYouPage from "./pages/ThankYouPage.jsx";
import PrivacyPage from "./pages/PrivacyPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import RouteTracker from "./components/RouteTracker.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <RouteTracker />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  );
}
