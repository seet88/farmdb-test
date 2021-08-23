import React from "react";
import classes from "./ShortEntryView.module.css";
const ShortEntryView = ({ entry }) => {
  return (
    <a href="#" className={classes.entry}>
      <h3 className={classes.title}>{entry.title}</h3>
      <div className={classes.secondLevel}>
        <div className={classes.description}>{entry.description}</div>
        <div className={classes.status}>{entry.status}</div>
      </div>
    </a>
  );
};

export default ShortEntryView;
