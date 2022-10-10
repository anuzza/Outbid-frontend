import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [recipeName, setRecipeName] = useState("");

  return (
    <form className="search-section">
      <span className="spyglass">
        <FaSearch />
      </span>
      <div className="searchbox-container">
        <input
          onChange={(e) => setRecipeName(e.target.value)}
          type="text"
          className="searchbox-input"
          placeholder="Search items"
          value={recipeName}
        />
      </div>
    </form>
  );
};

export default SearchBar;
