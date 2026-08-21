import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import Games from "./pages/Games";
// import GameDetail from "./pages/GameDetail";
// import Emulator from "./pages/Emulator";
// import SupportUs from "./pages/SupportUs";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Placeholder untuk <Navbar /> */}
        <header className="p-4 bg-surface border-b border-[#D1D1CB]">
          <h1 className="text-2xl font-bold">LAST BOSS GAME</h1>
        </header>

        <main className="flex-grow">
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/games" element={<Games />} />
            <Route path="/game/:slug" element={<GameDetail />} />
            <Route path="/emulator" element={<Emulator />} />
            <Route path="/support" element={<SupportUs />} />
          </Routes> */}
        </main>

        {/* Placeholder untuk <Footer /> */}
        <footer className="p-4 text-center text-sm border-t border-[#D1D1CB]">
          &copy; 2026 Last Boss Game
        </footer>
      </div>
    </Router>
  );
}

export default App;
