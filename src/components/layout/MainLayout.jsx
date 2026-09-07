import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
import Footer from "./Footer";

const RouteFallback = () => (
  <div className="flex min-h-[60vh] w-full items-center justify-center">
    <span className="h-7 w-7 animate-spin rounded-full border-2 border-line border-t-accent" />
  </div>
);

export default function MainLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const close = () => setMenuOpen(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen flex-col bg-void">
      <Header
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((o) => !o)}
        onCloseMenu={close}
      />

      <MobileMenu open={menuOpen} onClose={close} />

      <main className="flex-grow">
        <Suspense fallback={<RouteFallback />}>
          <Outlet />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
