import React from "react";
import classes from "./LibraryHeader.module.css";
import GoBack from "../buttons/GoBack";

const LibraryHeader = ({ library }) => {
  const { name } = library;
  return (
    <header className={classes.header}>
      <GoBack />
      {name}
    </header>
  );
};

export default LibraryHeader;
