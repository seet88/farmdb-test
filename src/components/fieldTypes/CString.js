import { TextField } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";
import { Typography } from "@mui/material";

const CString = ({ field, mode }) => {
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

  const isEdit = mode === "view" ? false : true;

  return (
    <TextField
      id={field.columnUUID}
      name={field.columnName}
      label={
        <Typography variant="headline" component="h2" color="black">
          {field.columnName}
        </Typography>
      }
      multiline
      focused
      maxRows={14}
      disabled={!isEdit}
      defaultValue={field?.value}
      onBlur={saveDataHandler}
      sx={{
        backgroundColor: isEdit ? "primary.lighter" : "default",
        width: "95%",
        mx: 2,
      }}
    />
  );
};

export default CString;
