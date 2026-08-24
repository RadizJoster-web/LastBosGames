import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function MainLayout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 bg-primary border-b-4 border-ink shadow-[0px_4px_0px_#0F0F0F]">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <Link
            to="/"
            onClick={closeMenu}
            className="relative z-50 group flex items-center"
            aria-label="Beranda"
          >
            <div className="bg-white border-2 border-ink shadow-[3px_3px_0px_#0F0F0F] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[5px_5px_0px_#0F0F0F] active:translate-y-0 active:translate-x-0 active:shadow-[1px_1px_0px_#0F0F0F] transition-all duration-150 flex items-center justify-center p-1 md:p-1.5 w-12 h-12 md:w-14 md:h-14">
              <img
                src="/icon.webp"
                alt="LBG Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 p-2 text-white hover:bg-surface hover:text-ink border-2 border-transparent hover:border-ink transition-colors flex items-center justify-center"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <nav className="hidden md:flex gap-4 font-display font-bold text-lg">
            <NavItem to="/">HOME</NavItem>
            <NavItem to="/games">GAMES</NavItem>
            <NavItem to="/emulator">EMULATOR</NavItem>
            <NavItem to="/support">SUPPORT</NavItem>
          </nav>
        </div>
      </header>

      {/* PERBAIKAN 1: Overlay Menu Mobile di Tengah Layar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-primary/95 backdrop-blur-sm flex flex-col items-center justify-center p-4 animate-in fade-in duration-200">
          <nav className="flex flex-col gap-6 w-full max-w-xs">
            <MobileNavItem to="/" onClick={closeMenu}>
              HOME
            </MobileNavItem>
            <MobileNavItem to="/games" onClick={closeMenu}>
              GAMES
            </MobileNavItem>
            <MobileNavItem to="/emulator" onClick={closeMenu}>
              EMULATOR
            </MobileNavItem>
            <MobileNavItem to="/support" onClick={closeMenu}>
              SUPPORT
            </MobileNavItem>
          </nav>
        </div>
      )}

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

function MobileNavItem({ to, onClick, children }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="bg-surface text-ink px-4 py-4 border-4 border-ink text-center font-display font-black text-2xl uppercase tracking-widest
                 shadow-[6px_6px_0px_#0F0F0F] active:bg-border-subtle active:translate-y-1 active:shadow-[2px_2px_0px_#0F0F0F] transition-all"
    >
      {children}
    </Link>
  );
}
