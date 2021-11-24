import classes from "./TemplateFieldBox.module.css";

const TemplateFieldBox = ({ fieldConfig, editField }) => {
  return (
    <li
      key={fieldConfig.columnUUID}
      className={classes.box}
      onClick={() => editField(fieldConfig.columnUUID)}
    >
      <div className={classes.leftSide}>
        <div> {fieldConfig.name} </div>
        <div className={classes.description}>
          <div> {fieldConfig.type}</div>
          {fieldConfig.options.length > 0 && (
            <div className={classes.libName}>
              &emsp; {fieldConfig.options[0].dictionaryLibraryName}
            </div>
          )}
        </div>
      </div>
      <div> {fieldConfig.usage}</div>
    </li>
  );
};

export default TemplateFieldBox;
