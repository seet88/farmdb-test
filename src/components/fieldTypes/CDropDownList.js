import { FormControlLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";

const CDropDownList = ({ field, mode, options }) => {
  const dispatch = useDispatch();
  const saveDataHandler = (e) => {
    const data = {
      columnUUID: field.columnUUID,
      type: e.target.type,
      checked: e.target.checked,
      value: e.target.value,
    };
    console.log("e", e);
    console.log("e.target", e.target);
    console.log("e.target.value", e.target.value);
    console.log("e.target.selectedIndex", e.target.selectedIndex);
    dispatch(updateFieldValue(data));
  };
  const selectOptions = [
    ...options,
    { value: "", index: options?.length + 1 || 1 },
  ];
  const isDisabled = mode === "view" ? true : false;
  // const selectedValue = options?.find(
  //   (option) => option.index === Number(field?.value)
  // )?.value;

  return (
    <FormControlLabel
      value="start"
      control={
        <Select
          id={field.columnUUID}
          name={field.columnName}
          disabled={isDisabled}
          value={field?.value || ""}
          sx={{ backgroundColor: isDisabled ? "default" : "primary.lighter" }}
          onChange={saveDataHandler}
          label="aga"
        >
          {selectOptions?.map((option) => (
            <MenuItem value={option.value} key={option.index}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
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

export default CDropDownList;
