import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

// Route-level code splitting: tiap halaman jadi chunk terpisah, hanya diunduh
// saat rutenya dibuka. Fallback <Suspense> ada di dalam MainLayout supaya
// header/nav/footer tetap paint duluan (FCP lebih cepat).
const Home = lazy(() => import("./pages/Home"));
const Games = lazy(() => import("./pages/Games"));
const GameDetail = lazy(() => import("./pages/GameDetail"));
const Emulator = lazy(() => import("./pages/Emulator"));
const SupportUs = lazy(() => import("./pages/SupportUs"));
const Kodeks = lazy(() => import("./pages/Kodeks"));

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/games" element={<Games />} />
        <Route path="/game/:slug" element={<GameDetail />} />
        <Route path="/emulator" element={<Emulator />} />
        <Route path="/kodeks" element={<Kodeks />} />
        <Route path="/support" element={<SupportUs />} />
      </Route>
    </Routes>
  );
}

export default App;
