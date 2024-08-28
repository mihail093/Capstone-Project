import React from 'react';
import { TextInput } from 'flowbite-react';

const SearchBar = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <TextInput
      type="text"
      placeholder={placeholder || "Cerca..."}
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;