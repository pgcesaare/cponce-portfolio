import React, {
  startTransition,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import ContentItem from "./ContentItem.jsx";
import ChipReact from "./ChipReact.jsx";

const filterButtonClass =
  "rounded-xl border px-3 py-2 text-secondary-text transition-colors text-nowrap cursor-pointer";

const ChevronLeftIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12.5 4.5L7 10L12.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M7.5 4.5L13 10L7.5 15.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CloseIcon = () => (
  <svg
    aria-hidden="true"
    viewBox="0 0 20 20"
    className="h-4 w-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M5 5L15 15" strokeLinecap="round" />
    <path d="M15 5L5 15" strokeLinecap="round" />
  </svg>
);

const ProjectsExplorer = ({ title, posts, labels }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechnology, setSelectedTechnology] = useState("all");
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const deferredSearchQuery = useDeferredValue(searchQuery);
  const chipsScrollerRef = useRef(null);

  const technologies = Array.from(
    new Set(posts.flatMap((post) => post.tags))
  ).sort((left, right) => left.localeCompare(right));

  const normalizedQuery = deferredSearchQuery.trim().toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const matchesTitle = post.title.toLowerCase().includes(normalizedQuery);
    const matchesTechnology =
      selectedTechnology === "all" || post.tags.includes(selectedTechnology);

    return matchesTitle && matchesTechnology;
  });
  const resultsText =
    filteredPosts.length === 1 ? labels.singleResultLabel : labels.multipleResultsLabel;

  useEffect(() => {
    const chipsScroller = chipsScrollerRef.current;

    if (!chipsScroller) {
      return undefined;
    }

    const syncScrollState = () => {
      const { scrollLeft, scrollWidth, clientWidth } = chipsScroller;
      const maxScrollLeft = scrollWidth - clientWidth;

      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(maxScrollLeft - scrollLeft > 4);
    };

    syncScrollState();
    chipsScroller.addEventListener("scroll", syncScrollState, { passive: true });
    window.addEventListener("resize", syncScrollState);

    return () => {
      chipsScroller.removeEventListener("scroll", syncScrollState);
      window.removeEventListener("resize", syncScrollState);
    };
  }, [technologies.length]);

  const scrollChips = (direction) => {
    const chipsScroller = chipsScrollerRef.current;

    if (!chipsScroller) {
      return;
    }

    chipsScroller.scrollBy({
      left: direction * 220,
      behavior: "smooth",
    });
  };

  const clearSearch = () => {
    startTransition(() => {
      setSearchQuery("");
    });
  };

  return (
    <div className="w-full max-w-5xl flex flex-col gap-5.5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-title-h2 text-primary">{title}</h1>
          <p className="text-secondary-text text-secondary">
            {resultsText.replace("{count}", String(filteredPosts.length))}
          </p>
        </div>

        <div className="flex flex-col gap-3 rounded-2xl">
          <div className="flex flex-col gap-1">
            <div className="relative">
              <input
                id="project-search"
                type="text"
                value={searchQuery}
                placeholder={labels.searchPlaceholder}
                className="w-full rounded-xl border border-border-default bg-bg-elevated px-4 py-3 pr-12 text-principal-text text-primary outline-none transition-colors placeholder:text-secondary focus:border-accent-primary"
                onChange={(event) => {
                  const nextValue = event.target.value;

                  startTransition(() => {
                    setSearchQuery(nextValue);
                  });
                }}
              />

              {searchQuery ? (
                <button
                  type="button"
                  className="absolute top-1/2 right-2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-secondary transition-colors hover:bg-bg-main hover:text-primary"
                  onClick={clearSearch}
                  aria-label={labels.clearSearchLabel}
                >
                  <CloseIcon />
                </button>
              ) : null}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="inline-flex shrink-0 items-center justify-center self-stretch rounded-xl border border-border-default bg-bg-main px-2 text-secondary transition-colors hover:border-accent-primary hover:bg-bg-elevated hover:text-primary disabled:cursor-default disabled:opacity-45 disabled:hover:border-border-default disabled:hover:bg-bg-main disabled:hover:text-secondary"
                onClick={() => scrollChips(-1)}
                aria-label={labels.scrollLeftLabel}
                disabled={!canScrollLeft}
              >
                <ChevronLeftIcon />
              </button>

              <div
                ref={chipsScrollerRef}
                className="no-scrollbar flex overflow-x-scroll gap-2"
              >
                <button
                  type="button"
                  aria-pressed={selectedTechnology === "all"}
                  className={`${filterButtonClass} ${
                    selectedTechnology === "all"
                      ? "border-accent-primary bg-bg-elevated text-accent-primary"
                      : "border-border-default bg-bg-main text-secondary hover:border-accent-primary hover:bg-bg-elevated"
                  }`}
                  onClick={() => {
                    startTransition(() => {
                      setSelectedTechnology("all");
                    });
                  }}
                >
                  {labels.allTechnologiesLabel}
                </button>

                {technologies.map((technology) => (
                  <button
                    key={technology}
                    type="button"
                    aria-pressed={selectedTechnology === technology}
                    className={`${filterButtonClass} ${
                      selectedTechnology === technology
                        ? "border-accent-primary bg-bg-elevated text-accent-primary"
                        : "border-border-default bg-bg-main text-secondary hover:border-accent-primary hover:bg-bg-elevated"
                    }`}
                    onClick={() => {
                      startTransition(() => {
                        setSelectedTechnology(technology);
                      });
                    }}
                  >
                    {technology}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className=" cursor-pointer inline-flex shrink-0 items-center justify-center self-stretch rounded-xl border border-border-default bg-bg-main px-2 text-secondary transition-colors hover:border-accent-primary hover:bg-bg-elevated hover:text-primary disabled:cursor-default disabled:opacity-45 disabled:hover:border-border-default disabled:hover:bg-bg-main disabled:hover:text-secondary"
                onClick={() => scrollChips(1)}
                aria-label={labels.scrollRightLabel}
                disabled={!canScrollRight}
              >
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <ContentItem
            key={post.href}
            image={post.image}
            date={post.date}
            title={post.title}
            description={post.description}
            href={post.href}
            readMoreLabel={labels.readMoreLabel}
          >
            {post.tags.map((tag) => (
              <ChipReact key={`${post.href}-${tag}`}>{tag}</ChipReact>
            ))}
          </ContentItem>
        ))
      ) : (
        <div className="rounded-2xl border border-border-default bg-bg-surface px-4 py-6 text-center">
          <p className="text-principal-text text-primary">
            {labels.emptyStateTitle}
          </p>
          <p className="mt-1 text-secondary-text text-secondary">
            {labels.emptyStateCaption}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProjectsExplorer;
