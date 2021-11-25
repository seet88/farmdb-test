import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CCheckbox = ({ field, mode }) => {
  const dispatch = useDispatch();
  const saveDataHandler = (e) => {
    const data = {
      columnUUID: field.columnUUID,
      type: e.target.type,
      checked: e.target.checked,
      value: e.target.value,
    };
    dispatch(updateFieldValue(data));
  };

  const isDisabled = mode === "view" ? true : false;
  const isChecked = field?.value === "1" ? true : false;
  return (
    <FormControlLabel
      value="start"
      control={
        <Checkbox
          id={field.columnUUID}
          data-testid={field.columnName.replaceAll(" ", "_").toLowerCase()}
          name={field.columnName}
          checked={isChecked}
          onChange={saveDataHandler}
          disabled={isDisabled}
          sx={{ backgroundColor: isDisabled ? "default" : "primary.lighter" }}
          inputProps={{ "aria-label": "controlled" }}
        />
      }
      label={
        <Typography variant="headline" component="h3" color="black">
          {field.columnName}
        </Typography>
      }
      labelPlacement="top"
    />
  );
};

export default CCheckbox;
