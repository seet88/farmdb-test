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

  // const [value, setValue] = useState(Number(field?.value));

  // useEffect(() => {
  //   if (mode !== "view") setValue(Number(field?.value));
  // }, [mode]);

  // const increaseNumberHandler = () => {
  //   let e = {};
  //   e.target = {};
  //   e.target.id = field.columnUUID;
  //   e.target.value = value + 1;
  //   saveDataHandler(e);
  //   setValue(value + 1);
  // };
  // const decreaseNumberHandler = () => {
  //   let e = {};
  //   e.target = {};
  //   e.target.id = field.columnUUID;
  //   e.target.value = value - 1;
  //   saveDataHandler(e);
  //   setValue(value - 1);
  // };
  // const inputNumberChangeHandler = (e) => {
  //   setValue(Number(e.target.value));
  //   saveDataHandler(e);
  // };
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
