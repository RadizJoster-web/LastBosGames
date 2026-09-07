import { Link, NavLink } from "react-router-dom";
import { ArrowUpRight, X } from "lucide-react";
import { NAV_LINKS } from "./navigationData";

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex flex-col bg-void isolate lg:hidden">
      <div className="flex h-16 items-center justify-between border-b border-line-soft px-5">
        <span className="font-jp text-xs tracking-[0.3em] text-ink-faint">
          メニュー
        </span>
        <button
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink"
          aria-label="Tutup menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
        {NAV_LINKS.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-baseline justify-between border-b border-line-soft py-5 ${
                isActive ? "text-ink" : "text-ink-dim"
              }`
            }
          >
            <span className="flex items-baseline gap-3">
              <span className="font-head text-xs tabular-nums text-ink-faint">
                0{i + 1}
              </span>
              <span className="display text-4xl">{link.label}</span>
            </span>
            <span className="font-jp text-sm text-ink-faint">{link.jp}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-6">
        <Link to="/games" onClick={onClose} className="btn-primary w-full">
          Cari game
          <ArrowUpRight size={14} />
        </Link>
      </div>
    </div>
  );
}
