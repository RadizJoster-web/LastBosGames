import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";

const Home = lazy(() => import("./pages/Home"));
const Games = lazy(() => import("./pages/Games"));
const GameDetail = lazy(() => import("./pages/GameDetail"));
const Emulator = lazy(() => import("./pages/Emulator"));
const SupportUs = lazy(() => import("./pages/SupportUs"));

const LoadingScreen = () => (
  <div className="h-screen w-full flex items-center justify-center bg-surface font-display text-primary">
    MEMUAT SISTEM...
  </div>
);

function App() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/games" element={<Games />} />
          <Route path="/game/:slug" element={<GameDetail />} />
          <Route path="/emulator" element={<Emulator />} />
          <Route path="/support" element={<SupportUs />} />
        </Route>
      </Routes>
    </Suspense> 
  );
}

export default App;
