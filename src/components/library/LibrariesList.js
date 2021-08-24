import React from "react";
import classes from "./LibrariesList.module.css";
import LibraryTile from "./LibraryTile";

const libraries = [
  {
    name: "Pola",
    id: 1,
    iconPath: "...",
    entriesCount: 5,
    lastModification: "2021-06-07 10:22",
  },
  {
    name: "Uprawy",
    id: 2,
    iconPath: "...",
    entriesCount: 3,
    lastModification: "2021-05-04 20:36",
  },
];

const LibrariesList = () => {
  return (
    <ul className={classes.list}>
      {libraries.map((lib) => {
        return (
          <li key={lib.id}>
            <LibraryTile library={lib} />
          </li>
        );
      })}
    </ul>
  );
};

export default LibrariesList;
