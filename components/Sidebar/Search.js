import React, { useState, useEffect } from "react";
import { Input, InputGroup, InputLeftElement, Icon } from "@chakra-ui/core";

function Search({ onChange, placeholder }) {
  let delayTimer;
  const doSearch = (text) => {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      onChange(text);
    }, 750);
  };
  return (
    <InputGroup size="sm">
      <InputLeftElement children={<Icon name="search" color="gray.300" />} />
      <Input
        type="search"
        placeholder={placeholder || "Search"}
        size="sm"
        onChange={(e) => doSearch(e.target.value)}
      />
    </InputGroup>
  );
}
export default Search;
