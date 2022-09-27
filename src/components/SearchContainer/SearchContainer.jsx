import React from "react";
import "./SearchContainer.css";
import SearchBar from "./SearchBar/SearchBar";

const SearchContainer = () => {
  return (
    <div className="cookbook-search-results">
      <div className="search-tools">
        <div className="search-tools-meta ">
          <SearchBar />
          <div className="filter-sort-organization">
            <div className="toggle-filters">
              <span className="filter-sliders"></span>
              <i
                style={{
                  color: " #1c355d",
                }}
                className="fas fa-sliders-h"
              ></i>
              <span className="filters-title">Filter</span>
            </div>
            <div className="guided-search-breadcrumbs">
              <span className="reset">Reset</span>
              <div className="guided-search-breadcrumbs-list"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchContainer;