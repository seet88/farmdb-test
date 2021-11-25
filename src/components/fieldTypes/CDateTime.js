import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { isNotEmpty } from "../../utils/utilsFunction";

const checkIfValueIsDate = (value) => {
  if (isNotEmpty(value)) return true;
  else return false;
};

const CDateTime = ({ field, mode }) => {
  const [value, setValue] = useState(
    checkIfValueIsDate(field?.value) ? new Date(JSON.parse(field?.value)) : null
  );
  const dispatch = useDispatch();
  const saveDataHandler = () => {
    const data = {
      columnUUID: field.columnUUID,
      type: "dateTime",
      checked: "",
      value: JSON.stringify(value),
    };
    dispatch(updateFieldValue(data));
  };

  useEffect(() => {
    saveDataHandler();
    // eslint-disable-next-line
  }, [value]);
  const isEdit = mode === "view" ? false : true;

  return (
    <Box
      sx={{ mx: 2 }}
      data-testid={field.columnName.replaceAll(" ", "_").toLowerCase()}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={value}
          label={
            <Typography variant="headline" component="h2" color="black">
              {field.columnName}
            </Typography>
          }
          disabled={!isEdit}
          onChange={(newValue) => setValue(newValue)}
        />
      </LocalizationProvider>
    </Box>
  );
};

export default CDateTime;
