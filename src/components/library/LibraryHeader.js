import React from "react";
import Header from "./Header";

const LibraryHeader = ({ library, mode }) => {
  const { name } = library;

  return <Header title={name}></Header>;
};

export default LibraryHeader;
