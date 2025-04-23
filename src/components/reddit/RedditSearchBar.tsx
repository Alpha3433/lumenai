
import React from "react";
import { Search } from "lucide-react";

interface RedditSearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  runSearch: () => void;
  searching: boolean;
}

const RedditSearchBar: React.FC<RedditSearchBarProps> = ({
  search, setSearch, runSearch, searching
}) => (
  <div className="flex gap-2 mb-10">
    <input
      className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF4500]/50 dark:bg-[#1a1310] bg-white text-base"
      placeholder="Search for themes (e.g. product, marketing, team development)"
      value={search}
      onChange={e => setSearch(e.target.value)}
      onKeyDown={e => { if (e.key === "Enter") runSearch(); }}
    />
    <button
      onClick={runSearch}
      disabled={searching}
      className="bg-[#FF4500] hover:bg-[#da3c00] text-white font-medium px-4 py-2 rounded-md transition"
    >
      <Search className="inline-block mr-1 h-4 w-4" />
      Search
    </button>
  </div>
);

export default RedditSearchBar;
