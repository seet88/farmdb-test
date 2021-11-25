import { TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateFieldValue } from "../../store/editedEntry-slice";
import { Typography } from "@mui/material";

const CInt = ({ field, mode }) => {
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
      id={field.columnName.replaceAll(" ", "_")}
      data-testid={field.columnName.replaceAll(" ", "_").toLowerCase()}
      name={field.columnName}
      label={
        <Typography variant="headline" component="h2" color="black">
          {field.columnName}
        </Typography>
      }
      focused
      disabled={!isEdit}
      type="number"
      defaultValue={field?.value}
      onBlur={saveDataHandler}
      sx={{ backgroundColor: isEdit ? "primary.lighter" : "default", mx: 2 }}
    />
  );
};
export default CInt;
