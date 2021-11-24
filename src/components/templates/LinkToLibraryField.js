import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLibrariesInfo } from "../../store/templateLibraries-slice";
import classes from "./LinkToLibraryField.module.css";

const LinkToLibraryField = ({ setOptions, options: defaultOptions }) => {
  const librariesInfo = useSelector((state) => selectLibrariesInfo(state));

  const getOptionValue = () => {
    if (!defaultOptions || defaultOptions?.length < 1) return [];
    return librariesInfo.find(
      (lib) => lib?.libUUID === defaultOptions[0]?.dictionaryLibraryUUID
    )?.sqlTableName;
  };
  console.log(
    "getOptionValue",
    librariesInfo.find(
      (lib) => lib?.libUUID === defaultOptions?.dictionaryLibraryUUID
    )
  );
  const [chosenLibrary, setChosenLibrary] = useState(getOptionValue());

  const applyOptions = (index) => {
    if (librariesInfo.length <= index) return;
    const options = [
      {
        dictionaryLibraryName: librariesInfo[index].name,
        dictionaryLibraryUUID: librariesInfo[index].libUUID,
      },
    ];
    setOptions(options);
  };

  useEffect(() => {
    if (librariesInfo.length) applyOptions(0);
    // eslint-disable-next-line
  }, [librariesInfo]);

  console.log("librariesInfo", librariesInfo);
  const chooseLibHandler = (e) => {
    console.log("LinkToLibraryField in chooseLibHandler", e);
    const idx = e.target.selectedIndex;
    applyOptions(idx);
    setChosenLibrary(e.target.value);
  };

  return (
    <div className={classes.main}>
      Choose library from list
      <select onChange={chooseLibHandler} defaultValue={chosenLibrary}>
        {librariesInfo.map((lib) => (
          <option key={lib.libUUID} value={lib.sqlTableName}>
            {lib.name}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LinkToLibraryField;
