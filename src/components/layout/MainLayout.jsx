import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-primary border-b-4 border-ink shadow-[0px_4px_0px_#0F0F0F]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-display text-3xl font-black text-white tracking-widest hover:scale-105 transition-transform origin-left"
            style={{ textShadow: "3px 3px 0px #0F0F0F" }}
          >
            LBG
          </Link>

          {/* Navigasi Desktop - Neo Brutalist Item */}
          <nav className="hidden md:flex gap-4 font-display font-bold text-lg">
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/games">GAMES</NavItem>
            <NavItem to="/emulator">EMULATOR</NavItem>
            <NavItem to="/support">SUPPORT</NavItem>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <Outlet />
      </main>

      <footer className="bg-ink border-t-4 border-primary py-8 mt-auto text-white">
        <div className="container mx-auto px-4 text-center font-display tracking-widest uppercase">
          &copy; {new Date().getFullYear()} LAST BOSS GAME.{" "}
          <span className="text-primary">NO MERCY.</span> NO OFFICIAL
          AFFILIATION.
        </div>
      </footer>
    </div>
  );
}

// Komponen NavItem khusus untuk efek taktil
function NavItem({ to, children }) {
  return (
    <Link
      to={to}
      className="bg-surface text-ink px-4 py-2 border-2 border-ink shadow-[3px_3px_0px_#0F0F0F] 
                 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[5px_5px_0px_#0F0F0F] hover:bg-white
                 active:translate-y-1 active:translate-x-1 active:shadow-none 
                 transition-all duration-100 ease-in-out uppercase"
    >
      {children}
    </Link>
  );
}
