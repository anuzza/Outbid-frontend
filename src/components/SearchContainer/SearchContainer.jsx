import React from "react";
import "./SearchContainer.css";
import SearchBar from "./SearchBar/SearchBar";

const SearchContainer = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="cookbook-search-results">
      <div className="search-tools">
        <div className="search-tools-meta ">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;
