// components/SearchBar.js
import React, { useState } from "react";
import { TextField } from "@mui/material";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <TextField
      label="Search Items"
      value={query}
      onChange={handleSearch}
      fullWidth
    />
  );
};

export default SearchBar;
