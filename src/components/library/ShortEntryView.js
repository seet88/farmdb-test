import React from "react";
import classes from "./ShortEntryView.module.css";
import { Link } from "react-router-dom";

const ShortEntryView = ({ entry }) => {
  return (
    <Link
      to={`/library/${entry?.libraryId}/entry/${entry?.id}`}
      className={classes.entry}
    >
      <h3 className={classes.title}>{entry.title}</h3>
      <div className={classes.secondLevel}>
        <div className={classes.description}>{entry.description}</div>
        <div className={classes.status}>{entry.status}</div>
      </div>
    </Link>
  );
};

export default ShortEntryView;
