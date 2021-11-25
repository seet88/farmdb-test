import { Fragment, useState } from "react";
import LinkToLibraryField from "./LinkToLibraryField";
import SelectField from "./SelectField";
import classes from "./TemplateFieldCreator.module.css";

const prepareSqlFieldName = (name) => {
  let preparedName = name
    .replaceAll("  ", " ")
    .replaceAll(" ", "_")
    .toLowerCase();
  return preparedName;
};

const getScriptCode = (column) => {
  const jsonString = column?.options[0]?.script;
  const script = JSON.parse(jsonString);

  return script.expr;
};

const TemplateFieldCreator = ({
  saveFieldConfigHandler,
  fieldConfigTemplate,
  cancelModal,
  fieldConfig: fieldConfigForUpdate,
}) => {
  const availableFieldTypes = [
    { name: "Text", type: "string" },
    { name: "Float", type: "float" },
    { name: "Int", type: "int" },
    { name: "Image", type: "image" },
    { name: "Audio", type: "audio" },
    { name: "Date time", type: "dateTime" },
    { name: "Checkbox", type: "checkbox" },
    { name: "Script", type: "script" },
    { name: "Dropdown list", type: "dropDownList" },
    { name: "Link to library", type: "libEntry" },
  ];

  const availableFieldViewOptions = [
    { name: "Normal", type: "normal" },
    { name: "Title", type: "title" },
    { name: "Description", type: "description" },
    { name: "Status", type: "status" },
  ];

  const getFieldType = () => {
    return availableFieldTypes.find(
      (fieldType) => fieldType.type === fieldConfig["type"]
    )?.type;
  };

  const fieldConfigInit = {
    usage: availableFieldViewOptions[0].type,
  };
  const [fieldConfig, setFieldConfig] = useState(
    fieldConfigForUpdate || fieldConfigInit
  );
  const [fieldType, setFieldType] = useState(
    getFieldType() || availableFieldTypes[0].type
  );
  const [fieldOptions, setFieldOptions] = useState(fieldConfig.options || []);

  const setOptions = (options) => {
    setFieldOptions(options);
  };

  const getValueFromElement = (element) => {
    if (element.type === "checkbox") return element.checked ? 1 : 0;
    return element.value;
  };

  const saveScriptCodeHandler = (e) => {
    const options = [];
    const jsonString = fieldConfig?.options[0]?.script;
    const script = JSON.parse(jsonString);
    script.expr = e.target.value;
    options[0] = { script: JSON.stringify(script) };
    setFieldOptions(options);
  };

  const setInputValueHandler = (e) => {
    setFieldConfig((prevFieldConfig) => {
      return {
        ...prevFieldConfig,
        [e.target.id]: getValueFromElement(e.target),
      };
    });
  };

  const submitHandle = (e) => {
    e.preventDefault();
    console.log(e.target);
    const fieldConfigTmp = { ...fieldConfig };
    fieldConfigTmp.type = fieldType;
    fieldConfigTmp.sqlFieldName = prepareSqlFieldName(fieldConfigTmp.name);
    fieldConfigTmp.options = fieldOptions;

    saveFieldConfigHandler(fieldConfigTmp);
  };

  const hintField = (fieldType) => {
    if (
      fieldType === "checkbox" ||
      fieldType === "dropDownList" ||
      fieldType === "libEntry" ||
      fieldType === "script"
    )
      return null;
    return (
      <Fragment>
        <label htmlFor="description">Hint:</label>
        <input
          type="text"
          id="description"
          onBlur={setInputValueHandler}
          defaultValue={fieldConfig["description"]}
        />
      </Fragment>
    );
  };

  const defaultValueField = (fieldType) => {
    if (
      fieldType === "dropDownList" ||
      fieldType === "libEntry" ||
      fieldType === "script"
    )
      return null;
    if (fieldType === "checkbox")
      return (
        <Fragment>
          <label htmlFor="defaultValue">Default value:</label>
          <input
            type="checkbox"
            id="defaultValue"
            onChange={setInputValueHandler}
            defaultChecked={fieldConfig["defaultValue"]}
          />
        </Fragment>
      );

    return (
      <Fragment>
        <label htmlFor="defaultValue">Default value:</label>
        <input
          type="text"
          id="defaultValue"
          onBlur={setInputValueHandler}
          defaultValue={fieldConfig["defaultValue"]}
        />
      </Fragment>
    );
  };

  console.log("aviableTypesFound! ", getFieldType(), fieldConfig["type"]);

  return (
    <Fragment>
      <div className={classes.modal}>
        <div className={classes.container}>
          <header className={classes.header}>
            <button id="cancelFields" onClick={cancelModal}>
              &larr;
            </button>
            <button id="submitFields" onClick={submitHandle}>
              &#10003;
            </button>
          </header>
          <h2>Field Creator</h2>
          {
            <section className={classes.type}>
              <label htmlFor="field">Field type:</label>
              <select
                name="field"
                id="field"
                onChange={(e) => setFieldType(e.target.value)}
                defaultValue={fieldType}
              >
                {availableFieldTypes.map((availableType) => {
                  return (
                    <option key={availableType.type} value={availableType.type}>
                      {availableType.name}
                    </option>
                  );
                })}
              </select>
            </section>
          }
          {fieldType && (
            <form className={classes.form}>
              <label htmlFor="name">Field Name:</label>
              <input
                type="text"
                id="name"
                onBlur={setInputValueHandler}
                defaultValue={fieldConfig["name"]}
              />
              <label htmlFor="sqlFieldType">Field sql type:</label>
              <input
                type="text"
                id="sqlFieldType"
                onBlur={setInputValueHandler}
                defaultValue={fieldConfig["sqlFieldType"]}
              />
              {hintField(fieldType)}
              {defaultValueField(fieldType)}
              {fieldType === "dropDownList" && (
                <SelectField
                  setOptions={setOptions}
                  options={fieldConfig.options}
                />
              )}
              {fieldType === "libEntry" && (
                <LinkToLibraryField
                  setOptions={setOptions}
                  options={fieldConfig.options}
                />
              )}
              {fieldType === "script" && (
                <Fragment>
                  <label htmlFor="script"> Script code </label>
                  <textarea
                    defaultValue={getScriptCode(fieldConfig)}
                    rows={20}
                    onBlur={saveScriptCodeHandler}
                  ></textarea>
                </Fragment>
              )}

              <label htmlFor="usage">Field view:</label>
              <select
                id="usage"
                name="usage"
                onChange={setInputValueHandler}
                defaultValue={fieldConfig["usage"]}
              >
                {availableFieldViewOptions.map((option) => {
                  return (
                    <option key={option.type} value={option.type}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </form>
          )}
        </div>
      </div>
      <div className={classes.backdrop}></div>
    </Fragment>
  );
};

export default TemplateFieldCreator;
