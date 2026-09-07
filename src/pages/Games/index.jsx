import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useFilteredGames, useFilterOptions } from "../../hooks/useGames";
import { AdCluster } from "../../components/ads";
import GamesSeo from "./GamesSeo";
import GamesHeader from "./GamesHeader";
import SearchAndFilterBar from "./SearchAndFilterBar";
import FilterDrawer from "./FilterDrawer";
import GamesGrid from "./GamesGrid";
import PaginationNav from "./PaginationNav";
import { SHELL } from "./constants";

export default function Games() {
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const [platform, setPlatform] = useState("");
  const [genre, setGenre] = useState("");
  const [region, setRegion] = useState("");
  const [isPopular, setIsPopular] = useState(false);

  const [drawerOpen, setDrawerOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) - 1 : 0;

  const setPage = (updater) => {
    setSearchParams((prevParams) => {
      const currentPage = prevParams.get("page")
        ? parseInt(prevParams.get("page"), 10) - 1
        : 0;
      const newPage =
        typeof updater === "function" ? updater(currentPage) : updater;

      const newUrlParams = new URLSearchParams(prevParams);
      if (newPage === 0) {
        newUrlParams.delete("page");
      } else {
        newUrlParams.set("page", newPage + 1);
      }
      return newUrlParams;
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput.trim());
    }, 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  const { games, totalPages, totalGames, isLoading, isError } =
    useFilteredGames(search, platform, genre, region, page, isPopular);

  const { options } = useFilterOptions();

  const resetFilters = () => {
    setSearch("");
    setSearchInput("");
    setPlatform("");
    setGenre("");
    setRegion("");
    setIsPopular(false);
    setSearchParams(new URLSearchParams());
  };

  const activeCount =
    (platform ? 1 : 0) +
    (genre ? 1 : 0) +
    (region ? 1 : 0) +
    (isPopular ? 1 : 0);
  const hasActive = !!search || activeCount > 0;

  const filterProps = {
    options,
    platform,
    genre,
    region,
    isPopular,
    onChangePlatform: (value) => {
      setPlatform(value);
      setPage(0);
    },
    onChangeGenre: (value) => {
      setGenre(value);
      setPage(0);
    },
    onChangeRegion: (value) => {
      setRegion(value);
      setPage(0);
    },
    onTogglePopular: () => {
      setIsPopular(!isPopular);
      setPage(0);
    },
    hasActive,
    resetFilters,
  };

  return (
    <div className="border-b border-line-soft">
      <GamesSeo />

      <GamesHeader totalGames={totalGames} />

      <div className={`${SHELL} py-10`}>
        {/* SEARCH + FILTER */}
        <SearchAndFilterBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          activeCount={activeCount}
          onOpenDrawer={() => setDrawerOpen(true)}
          {...filterProps}
        />

        {/* GRID */}
        <div className="mt-10">
          <GamesGrid
            isError={isError}
            isLoading={isLoading}
            games={games}
            page={page}
            resetFilters={resetFilters}
          />
        </div>

        {/* PAGINATION */}
        {!isLoading && !isError && totalPages > 1 && (
          <PaginationNav page={page} totalPages={totalPages} setPage={setPage} />
        )}

        {/* Kluster iklan tepat di atas footer */}
        <AdCluster className="mt-16" />
      </div>

      {/* DRAWER FILTER (mobile) */}
      <FilterDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        {...filterProps}
      />
    </div>
  );
}
