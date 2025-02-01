import { useRef } from "react";
import PropTypes from "prop-types";

function SearchBar({ value, onSearchChange, onImmediateSearchChange }) {
  const searchDebounceRef = useRef(null);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;

    onImmediateSearchChange(searchValue);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      onSearchChange?.(searchValue);
    }, 300);
  };

  return (
    <div className="search-bar">
      <input type="text" value={value} onChange={handleSearchChange} />
    </div>
  );
}

SearchBar.propTypes = {
  value: PropTypes.string,
  onSearchChange: PropTypes.func,
  onImmediateSearchChange: PropTypes.func,
};

export default SearchBar;
