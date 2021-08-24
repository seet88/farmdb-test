import React from "react";
import GoBack from "../buttons/GoBack";
import classes from "./EntryHeader.module.css";

const EntryHeader = () => {
  return (
    <header className={classes.header}>
      <GoBack />
      zzzz
      <button>edit</button>
      <button>delete</button>
      <button>info</button>
    </header>
  );
};

export default EntryHeader;
