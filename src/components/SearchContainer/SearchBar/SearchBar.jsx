import React from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <form className="search-section">
      <span className="spyglass">
        <FaSearch />
      </span>
      <div className="searchbox-container">
        <input
          onChange={(e) => setSearchTerm(e.target.value)}
          type="text"
          className="searchbox-input"
          placeholder="Search items"
          value={searchTerm}
        />
      </div>
    </form>
  );
};

export default SearchBar;
