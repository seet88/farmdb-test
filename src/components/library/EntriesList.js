import React from "react";
import ShortEntryView from "./ShortEntryView";
import classes from "./EntriesList.module.css";
const EntriesList = () => {
  const entriesList = [
    {
      title: "first entry",
      description: "some description",
      status: "some entry status",
      id: 1,
    },
    {
      title: "Second entry",
      description: "second description",
      status: "second entry status",
      id: 2,
    },
  ];

  return (
    <ul className={classes.list}>
      {entriesList.map((entry) => (
        <li key={entry.id} className={classes.entry}>
          <ShortEntryView entry={entry} />
        </li>
      ))}
    </ul>
  );
};

export default EntriesList;
