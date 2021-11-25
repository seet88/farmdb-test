import React from "react";
import { useSelector } from "react-redux";
import { selectAllDataLibrary } from "./librariesData-slice";
import { selectAllLibraries } from "./templateLibraries-slice";

const BrowserStore = () => {
  const librariesData = useSelector((state) => selectAllDataLibrary(state));
  if (librariesData.length)
    localStorage.setItem("libsData", JSON.stringify(librariesData));

  const templateLibraries = useSelector((state) => selectAllLibraries(state));
  if (templateLibraries.length)
    localStorage.setItem("templates", JSON.stringify(templateLibraries));

  return <></>;
};

export default BrowserStore;
