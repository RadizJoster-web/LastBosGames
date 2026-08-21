import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
// import Games from "./pages/Games";
// import GameDetail from "./pages/GameDetail";
// import Emulator from "./pages/Emulator";
// import SupportUs from "./pages/SupportUs";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/games" element={<Games />} />
          <Route path="/game/:slug" element={<GameDetail />} />
          <Route path="/emulator" element={<Emulator />} />
          <Route path="/support" element={<SupportUs />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
