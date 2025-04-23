
import React from "react";
import { ThemeData } from "@/types/reddit";
import RedditThemeCard from "./RedditThemeCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from "@/components/ui/pagination";

interface RedditThemeGridProps {
  themes: ThemeData[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const RedditThemeGrid: React.FC<RedditThemeGridProps> = ({
  themes,
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (themes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No themes found for this category.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, i) => (
          <RedditThemeCard theme={theme} key={`${theme.theme}-${i}`} />
        ))}
      </div>
      
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            {Array.from({ length: totalPages }).map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink 
                  isActive={currentPage === i + 1}
                  onClick={() => onPageChange(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default RedditThemeGrid;
