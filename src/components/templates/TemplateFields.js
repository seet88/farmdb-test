import { useState, useEffect } from "react";
import TemplateFieldCreator from "./TemplateFieldCreator";
import { v4 as uuidv4 } from "uuid";
import TemplateFieldBox from "./TemplateFieldBox";
import classes from "./TemplateFields.module.css";

const TemplateFields = ({ saveFieldsConfigHandler, fields }) => {
  const [fieldsConfig, setFieldsConfig] = useState(fields || []);
  const [mode, setMode] = useState("view");
  const [fieldConfig, setFieldConfig] = useState();

  useEffect(() => {
    saveFieldsConfigHandler(fieldsConfig);
    // eslint-disable-next-line
  }, [fieldsConfig]);

  const addFieldConfig = (fieldConfig) => {
    console.log("fieldConfig in TemplateFieldCreator", fieldConfig);
    if (!fieldConfig?.columnUUID) fieldConfig.columnUUID = uuidv4();

    setFieldsConfig((prev) => [...prev, fieldConfig]);
    setMode("view");
  };

  const editFieldHandler = (columnUUID) => {
    setMode("edit");
    const foundField = fieldsConfig.find(
      (field) => field.columnUUID === columnUUID
    );
    setFieldConfig(foundField);
  };

  const updateFieldConfig = (fieldConfig) => {
    console.log("update", fieldConfig);
    let foundFieldIdx = fieldsConfig.findIndex(
      (field) => field.columnUUID === fieldConfig.columnUUID
    );
    const newFieldsConfig = [...fieldsConfig];
    newFieldsConfig[foundFieldIdx] = fieldConfig;
    setFieldsConfig(newFieldsConfig);
    setMode("view");
  };

  console.log("LIST fieldsConfig", fieldsConfig);
  return (
    <div className={classes.fields}>
      template fields
      <ul className={classes.ul}>
        {fieldsConfig.length === 0 && <div>No field added yet...</div>}
        {fieldsConfig?.map((fieldConfig) => {
          return (
            <TemplateFieldBox
              key={fieldConfig.columnUUID}
              fieldConfig={fieldConfig}
              editField={editFieldHandler}
            ></TemplateFieldBox>
          );
        })}
      </ul>
      <button onClick={() => setMode("addNew")} className={classes.addButton}>
        +
      </button>
      {mode === "addNew" && (
        <TemplateFieldCreator
          saveFieldConfigHandler={addFieldConfig}
          cancelModal={() => setMode("view")}
        />
      )}
      {mode === "edit" && (
        <TemplateFieldCreator
          saveFieldConfigHandler={updateFieldConfig}
          cancelModal={() => setMode("view")}
          fieldConfig={{ ...fieldConfig }}
        />
      )}
    </div>
  );
};

export default TemplateFields;
