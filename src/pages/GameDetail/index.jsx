import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameDetail } from "../../hooks/useGames";
import ScreenshotLightbox from "../../components/game/ScreenshotLightbox";
import ReportModal from "../../components/common/ReportModal";
import GameDetailSeo from "./GameDetailSeo";
import GameHero from "./GameHero";
import GameContent from "./GameContent";
import DownloadSection from "./DownloadSection";
import { GameDetailSkeleton, GameDetailNotFound } from "./GameDetailStates";
import { SHELL } from "./utils";

export default function GameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { game, isLoading, isError } = useGameDetail(slug);

  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const navigateLightbox = (direction) => {
    if (!game?.screenshots) return;
    if (direction === "next") {
      setLightboxIndex((prev) => (prev + 1) % game.screenshots.length);
    } else {
      setLightboxIndex(
        (prev) =>
          (prev - 1 + game.screenshots.length) % game.screenshots.length,
      );
    }
  };

  if (isLoading) {
    return <GameDetailSkeleton />;
  }

  if (isError || !game) {
    return <GameDetailNotFound onBackToGames={() => navigate("/games")} />;
  }

  return (
    <article className="border-b border-line-soft">
      <GameDetailSeo game={game} />

      <GameHero game={game} onBack={() => navigate(-1)} />

      <div className={`${SHELL} py-14`}>
        <GameContent game={game} onOpenLightbox={openLightbox} />
        <DownloadSection
          game={game}
          onReport={() => setIsReportModalOpen(true)}
        />
      </div>

      {lightboxIndex !== null && (
        <ScreenshotLightbox
          images={game.screenshots}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNavigate={navigateLightbox}
        />
      )}

      <ReportModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        gameTitle={game.title}
      />
    </article>
  );
}
