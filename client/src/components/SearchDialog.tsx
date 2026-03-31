import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, BookOpen, User, Award, MessageSquare, FileText, ExternalLink } from "lucide-react";
import { searchContent, type SearchResult } from "@/lib/searchIndex";
import { useLocation } from "wouter";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (query.trim().length >= 2) {
      const searchResults = searchContent(query);
      setResults(searchResults);
      setSelectedIndex(0);
    } else {
      setResults([]);
      setSelectedIndex(0);
    }
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
      setSelectedIndex(0);
    }
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setLocation(result.url);
    onOpenChange(false);
  };

  const getCategoryIcon = (category: SearchResult["category"]) => {
    switch (category) {
      case "Publication":
        return <BookOpen className="h-4 w-4" />;
      case "Biography":
        return <User className="h-4 w-4" />;
      case "Research":
        return <FileText className="h-4 w-4" />;
      case "Award":
        return <Award className="h-4 w-4" />;
      case "Testimonial":
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: SearchResult["category"]) => {
    switch (category) {
      case "Publication":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-300";
      case "Biography":
        return "bg-green-500/10 text-green-700 dark:text-green-300";
      case "Research":
        return "bg-purple-500/10 text-purple-700 dark:text-purple-300";
      case "Award":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300";
      case "Testimonial":
        return "bg-pink-500/10 text-pink-700 dark:text-pink-300";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-300";
    }
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query.split(/\s+/).join("|")})`, "gi");
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-primary/30 text-foreground font-medium">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl p-0 gap-0 overflow-hidden">
        <DialogTitle className="sr-only">Search Prof. Menyeh's Website</DialogTitle>
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <Input
            placeholder="Search publications, biography, awards, testimonials..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
            autoFocus
          />
          {query && (
            <Badge variant="secondary" className="flex-shrink-0">
              {results.length} {results.length === 1 ? "result" : "results"}
            </Badge>
          )}
        </div>

        {/* Search Results */}
        <div className="max-h-[500px] overflow-y-auto">
          {query.trim().length < 2 && (
            <div className="px-4 py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">
                Type at least 2 characters to search across all content
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <Badge variant="outline" className="text-xs">Publications</Badge>
                <Badge variant="outline" className="text-xs">Biography</Badge>
                <Badge variant="outline" className="text-xs">Research</Badge>
                <Badge variant="outline" className="text-xs">Awards</Badge>
                <Badge variant="outline" className="text-xs">Testimonials</Badge>
              </div>
            </div>
          )}

          {query.trim().length >= 2 && results.length === 0 && (
            <div className="px-4 py-12 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <p className="text-sm text-muted-foreground">
                No results found for "<span className="font-medium text-foreground">{query}</span>"
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                Try different keywords or check your spelling
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div className="py-2">
              {results.map((result, index) => (
                <button
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`w-full text-left px-4 py-3 hover:bg-accent transition-colors ${
                    index === selectedIndex ? "bg-accent" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-lg ${getCategoryColor(result.category)}`}>
                      {getCategoryIcon(result.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm text-foreground truncate">
                          {highlightMatch(result.title, query)}
                        </h3>
                        <Badge variant="outline" className="text-xs flex-shrink-0">
                          {result.category}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2 mb-2">
                        {highlightMatch(result.description, query)}
                      </p>
                      {result.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {result.keywords.slice(0, 4).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-1" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer with keyboard shortcuts */}
        <div className="px-4 py-3 border-t border-border bg-muted/50">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-background border border-border">↑</kbd>
                <kbd className="px-2 py-1 rounded bg-background border border-border">↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-background border border-border">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center gap-1">
                <kbd className="px-2 py-1 rounded bg-background border border-border">Esc</kbd>
                <span>Close</span>
              </div>
            </div>
            <span>Searching {searchContent("").length} indexed items</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
