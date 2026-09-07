import { useRecentGames, useCollectionStats } from "../../hooks/useGames";
import HomeSeo from "./HomeSeo";
import HeroSection from "./HeroSection";
import ManifestoSection from "./ManifestoSection";
import StatsSection from "./StatsSection";
import LatestDropsSection from "./LatestDropsSection";
import CtaSection from "./CtaSection";

export default function Home() {
  const { games, isLoading, isError } = useRecentGames();
  const { stats } = useCollectionStats();
  const featured = games?.[0];
  const gameCount = stats?.games;

  return (
    <>
      <HomeSeo />

      <HeroSection
        featured={featured}
        isLoading={isLoading}
        isError={isError}
        gameCount={gameCount}
      />

      <ManifestoSection />

      <StatsSection stats={stats} />

      <LatestDropsSection games={games} isLoading={isLoading} isError={isError} />

      <CtaSection />
    </>
  );
}
