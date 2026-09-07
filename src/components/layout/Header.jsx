import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV_LINKS, MARQUEE_ITEMS } from "./navigationData";

export default function Header({ menuOpen, onToggleMenu, onCloseMenu }) {
  return (
    <header className="sticky top-0 z-40 border-b border-line-soft bg-void/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 md:h-[76px] md:px-8">
        {/* Logo */}
        <Link
          to="/"
          onClick={onCloseMenu}
          className="group flex items-center gap-3"
          aria-label="Last Bos Games — beranda"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-carbon">
            <img
              src="/icon.webp"
              alt=""
              className="h-5 w-5 object-contain"
              aria-hidden="true"
            />
            <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-head text-[15px] font-bold tracking-[0.12em] text-ink">
              LAST&nbsp;BOS&nbsp;GAMES
            </span>
            <span className="font-jp text-[10px] tracking-[0.3em] text-ink-faint">
              ラストボス・アーカイブ
            </span>
          </span>
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 rounded-full px-4 py-2 font-head text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors duration-200 ${
                  isActive ? "text-ink" : "text-ink-dim hover:text-ink"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`h-1 w-1 rounded-full transition-colors ${
                      isActive
                        ? "bg-accent"
                        : "bg-transparent group-hover:bg-line"
                    }`}
                  />
                  {link.label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* CTA + menu */}
        <div className="flex items-center gap-3">
          <Link to="/games" className="hidden btn-primary sm:inline-flex">
            Jelajahi
            <ArrowUpRight size={14} />
          </Link>
          <button
            onClick={onToggleMenu}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink transition-colors hover:bg-white/[0.04] lg:hidden"
            aria-label="Buka menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Marquee strip */}
      <div className="overflow-hidden border-t border-line-soft bg-carbon/60">
        <div className="marquee-track py-1.5">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {MARQUEE_ITEMS.map((item, i) => (
                <span
                  key={`${dup}-${i}`}
                  className="flex items-center gap-4 whitespace-nowrap px-4 font-head text-[10px] uppercase tracking-[0.34em] text-ink-faint"
                >
                  {item}
                  <span className="text-accent">✳</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
