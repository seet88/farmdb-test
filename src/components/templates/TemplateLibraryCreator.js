import TemplateFields from "./TemplateFields";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewLibraryTemplate,
  selectLibraryById,
} from "../../store/templateLibraries-slice";
import { useMutation } from "@apollo/client";
import {
  ADD_LIBRARY_TEMPLATE_PG,
  UPDATE_LIBRARY_TEMPLATE_PG,
} from "../../API/graphQLTypes";
import GoBack from "../buttons/GoBack";
import { useHistory } from "react-router-dom";
import classes from "./TemplateLibraryCreator.module.css";
import { useLocation } from "react-router-dom";
import { addNewLibraryData } from "../../store/librariesData-slice";
import { selectConfiguration } from "../../store/configuration-slice";

const prepareSqlFieldName = (name) => {
  let preparedName = name
    ?.replaceAll("  ", " ")
    ?.replaceAll(" ", "_")
    ?.toLowerCase();
  return preparedName;
};

const TemplateLibraryCreator = () => {
  const location = useLocation();
  let libUUID = null;
  libUUID = location?.state?.libUUID;
  const [libConfig, setLibConfig] = useState({});
  const [showPanel, setShowPanel] = useState("main");
  const dispatch = useDispatch();
  const [insertTemplateInPG] = useMutation(ADD_LIBRARY_TEMPLATE_PG);
  const [updateTemplateInPG] = useMutation(UPDATE_LIBRARY_TEMPLATE_PG);
  const history = useHistory();
  const isUpdate = libUUID ? true : false;
  const saveFieldsConfigHandler = (fieldsConfig) => {
    setLibConfig((prev) => {
      return { ...prev, columns: fieldsConfig };
    });
  };
  const storageType = useSelector((state) =>
    selectConfiguration(state)
  )?.storageType;

  const templateLibSelected = useSelector((state) =>
    selectLibraryById(state, libUUID)
  );
  if (libUUID && !libConfig?.libUUID) {
    setLibConfig({
      ...templateLibSelected,
    });
  }

  if (!libUUID && !libConfig?.libUUID)
    setLibConfig((prev) => {
      return { ...prev, libUUID: uuidv4() };
    });

  const setInputValueHandler = (e) => {
    setLibConfig((prev) => {
      return { ...prev, [e.target.id]: e.target.value };
    });
  };

  const saveLibraryHandler = () => {
    try {
      const libConfigTmp = { ...libConfig };
      libConfigTmp.sqlTableName = prepareSqlFieldName(libConfigTmp.name);
      dispatch(addNewLibraryTemplate(libConfigTmp));
      dispatch(
        addNewLibraryData({
          name: libConfigTmp.name,
          libUUID: libConfigTmp.libUUID,
        })
      );
      if (!isUpdate) {
        if (storageType === "outerDatabase")
          insertTemplateInPG({ variables: { libraryTemplate: libConfigTmp } });
      } else if (storageType === "outerDatabase")
        updateTemplateInPG({ variables: { libraryTemplate: libConfigTmp } });

      history.push("/");
    } catch (error) {
      console.log(
        `error occurred while update/insert template in db/state manager: ${error}`
      );
    }
  };
  const buttonActive = {
    checkMain: () => (showPanel === "main" ? classes.active : []),
    checkFields: () => (showPanel === "fields" ? classes.active : []),
  };
  return (
    <div className={classes.main}>
      <header className={classes.header}>
        <div className={classes.goBack}>
          <GoBack />
        </div>
        <button onClick={saveLibraryHandler}>&#10003;</button>
      </header>
      <section className={classes.tab}>
        <button
          onClick={() => setShowPanel("main")}
          className={[classes.tabButton, buttonActive.checkMain()].join(" ")}
        >
          Main
        </button>
        <button
          onClick={() => setShowPanel("fields")}
          className={[classes.tabButton, buttonActive.checkFields()].join(" ")}
        >
          Field
        </button>
      </section>
      {showPanel === "main" && (
        <section
          className={[classes.mainOptions, buttonActive.checkMain()].join(" ")}
        >
          <label htmlFor="name"> Name</label>
          <input
            type="edit"
            id="name"
            onBlur={setInputValueHandler}
            defaultValue={libConfig.name}
          ></input>
          <label htmlFor="color"> Color</label>
          <input type="color" id="color" onBlur={setInputValueHandler}></input>
          <label htmlFor="group"> Group</label>
          <input type="text" id="group" onBlur={setInputValueHandler}></input>
        </section>
      )}
      {showPanel === "fields" && (
        <div className={[buttonActive.checkFields()].join(" ")}>
          <TemplateFields
            saveFieldsConfigHandler={saveFieldsConfigHandler}
            fields={libConfig.columns}
          />
        </div>
      )}
    </div>
  );
};
export default TemplateLibraryCreator;
