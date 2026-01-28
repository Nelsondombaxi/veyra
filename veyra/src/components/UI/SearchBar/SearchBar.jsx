import React from 'react';
import { FiSearch } from 'react-icons/fi';
import './SearchBar.css';

const SearchBar = ({ value, onChange, placeholder = "Pesquisar projetos..." }) => {
  return (
    <div className="veyra-search-container">
      <FiSearch className="search-icon" />
      <input 
        type="text" 
        className="veyra-search-input"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;