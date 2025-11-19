"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X, Loader2 } from "lucide-react";
import { TipCard } from "@/components/tip-card";
import { Tip } from "@/types";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Tip[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setHasSearched(true);

      try {
        const response = await fetch(
          `/api/tips?search=${encodeURIComponent(query.trim())}`
        );
        const data = await response.json();

        if (response.ok) {
          setResults(data.tips);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
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
              ? `No results found for "${query}"`
              : `Found ${results.length} result${results.length === 1 ? "" : "s"} for "${query}"`}
          </p>

          {results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((tip) => (
                <TipCard key={tip.id} tip={tip} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
