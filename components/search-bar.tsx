"use client";

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Search, X, Loader2, Plus, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TipCard } from "@/components/tip-card";
import { Tip } from "@/types";
import { categoryArray, Category } from "@/types/categories";

type SearchIn = "both" | "title" | "description";

interface Filters {
  categories: Category[];
  searchIn: SearchIn;
  showFavorites: boolean;
  showMyTips: boolean;
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    categories: [],
    searchIn: "both",
    showFavorites: false,
    showMyTips: false,
  });
  const [favoritedIds, setFavoritedIds] = useState<Set<string>>(new Set());

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.searchIn !== "both" ||
    filters.showFavorites ||
    filters.showMyTips;

  // Build query string
  const buildQueryString = (pageNum: number) => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    if (filters.categories.length > 0) {
      params.set("categories", filters.categories.join(","));
    }
    if (filters.searchIn !== "both") params.set("searchIn", filters.searchIn);
    if (filters.showFavorites) params.set("favorites", "true");
    if (filters.showMyTips) params.set("myTips", "true");
    params.set("page", pageNum.toString());
    params.set("limit", "9");
    return params.toString();
  };

  // Fetch results
  const fetchResults = useCallback(async (pageNum: number, append: boolean = false) => {
    if (!query.trim() && !hasActiveFilters) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    if (append) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set("search", query.trim());
      if (filters.categories.length > 0) {
        params.set("categories", filters.categories.join(","));
      }
      if (filters.searchIn !== "both") params.set("searchIn", filters.searchIn);
      if (filters.showFavorites) params.set("favorites", "true");
      if (filters.showMyTips) params.set("myTips", "true");
      params.set("page", pageNum.toString());
      params.set("limit", "9");

      const response = await fetch(`/api/tips?${params.toString()}`);
      const data = await response.json();

      if (response.ok) {
        if (append) {
          setResults((prev) => [...prev, ...data.tips]);
        } else {
          setResults(data.tips);
        }
        setTotal(data.total);
        setHasMore(data.hasMore);
        setPage(pageNum);
        // Update favorited IDs
        if (data.favoritedIds) {
          setFavoritedIds(new Set(data.favoritedIds));
        }
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [query, filters, hasActiveFilters]);

  // Debounced search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchResults(1);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [fetchResults]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
  };

  const handleShowMore = () => {
    fetchResults(page + 1, true);
  };

  // Filter handlers
  const toggleCategory = (category: Category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const setSearchIn = (value: SearchIn) => {
    setFilters((prev) => ({ ...prev, searchIn: value }));
  };

  const toggleFavorites = () => {
    setFilters((prev) => ({ ...prev, showFavorites: !prev.showFavorites }));
  };

  const toggleMyTips = () => {
    setFilters((prev) => ({ ...prev, showMyTips: !prev.showMyTips }));
  };

  const removeFilter = (type: string, value?: string) => {
    if (type === "category" && value) {
      setFilters((prev) => ({
        ...prev,
        categories: prev.categories.filter((c) => c !== value),
      }));
    } else if (type === "searchIn") {
      setFilters((prev) => ({ ...prev, searchIn: "both" }));
    } else if (type === "favorites") {
      setFilters((prev) => ({ ...prev, showFavorites: false }));
    } else if (type === "myTips") {
      setFilters((prev) => ({ ...prev, showMyTips: false }));
    }
  };

  // Render filter chips
  const renderChips = () => {
    const chips: JSX.Element[] = [];

    filters.categories.forEach((cat) => {
      chips.push(
        <Badge
          key={`cat-${cat}`}
          variant="secondary"
          className="cursor-pointer gap-1 hover:bg-secondary/80"
          onClick={() => removeFilter("category", cat)}
        >
          {cat.charAt(0) + cat.slice(1).toLowerCase()}
          <X className="h-3 w-3" />
        </Badge>
      );
    });

    if (filters.searchIn !== "both") {
      chips.push(
        <Badge
          key="searchIn"
          variant="secondary"
          className="cursor-pointer gap-1 hover:bg-secondary/80"
          onClick={() => removeFilter("searchIn")}
        >
          {filters.searchIn === "title" ? "Title only" : "Description only"}
          <X className="h-3 w-3" />
        </Badge>
      );
    }

    if (filters.showFavorites) {
      chips.push(
        <Badge
          key="favorites"
          variant="secondary"
          className="cursor-pointer gap-1 hover:bg-secondary/80"
          onClick={() => removeFilter("favorites")}
        >
          Favorites
          <X className="h-3 w-3" />
        </Badge>
      );
    }

    if (filters.showMyTips) {
      chips.push(
        <Badge
          key="myTips"
          variant="secondary"
          className="cursor-pointer gap-1 hover:bg-secondary/80"
          onClick={() => removeFilter("myTips")}
        >
          My Tips
          <X className="h-3 w-3" />
        </Badge>
      );
    }

    return chips;
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search health tips..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-10"
        />
        {query && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Filters Row */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Filter Chips */}
        {renderChips()}

        {/* Filters Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              {hasActiveFilters ? (
                <>
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </>
              ) : (
                <>
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            {/* Show All */}
            <DropdownMenuItem
              onClick={() => {
                setFilters({
                  categories: [...categoryArray],
                  searchIn: "both",
                  showFavorites: false,
                  showMyTips: false,
                });
                setQuery("");
              }}
            >
              Show all
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* Categories Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Categories</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                {categoryArray.map((cat) => (
                  <DropdownMenuItem
                    key={cat}
                    onClick={() => toggleCategory(cat)}
                    disabled={filters.categories.includes(cat)}
                  >
                    <span
                      className={
                        filters.categories.includes(cat) ? "opacity-50" : ""
                      }
                    >
                      {cat.charAt(0) + cat.slice(1).toLowerCase()}
                    </span>
                    {filters.categories.includes(cat) && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        ✓
                      </span>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            {/* Search In Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Search in</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  onClick={() => setSearchIn("both")}
                  disabled={filters.searchIn === "both"}
                >
                  Both
                  {filters.searchIn === "both" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSearchIn("title")}
                  disabled={filters.searchIn === "title"}
                >
                  Title only
                  {filters.searchIn === "title" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSearchIn("description")}
                  disabled={filters.searchIn === "description"}
                >
                  Description only
                  {filters.searchIn === "description" && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            {/* Label Submenu */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <span>Label</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuItem onClick={toggleFavorites}>
                  Favorites
                  {filters.showFavorites && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMyTips}>
                  My Tips
                  {filters.showMyTips && (
                    <span className="ml-auto text-xs">✓</span>
                  )}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Clear All Filters */}
        {hasActiveFilters && (
          <>
            <div className="h-6 w-px bg-border" />
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => {
                setFilters({
                  categories: [],
                  searchIn: "both",
                  showFavorites: false,
                  showMyTips: false,
                });
                setQuery("");
              }}
            >
              <X className="h-4 w-4 mr-1" />
              Clear all
            </Button>
          </>
        )}
      </div>

      {/* Results */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {!loading && hasSearched && (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            {results.length === 0
              ? "No results found"
              : `Found ${total} result${total === 1 ? "" : "s"}`}
          </p>

          {results.length > 0 && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.map((tip) => (
                  <TipCard
                    key={tip.id}
                    tip={tip}
                    initialFavorited={favoritedIds.has(tip.id)}
                  />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    onClick={handleShowMore}
                    disabled={loadingMore}
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      `Show more (${total - results.length} remaining)`
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
