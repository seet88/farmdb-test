import {
  Alert,
  Button,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateConfiguration,
  selectConfiguration,
} from "../../store/configuration-slice";
import Header from "../library/Header";

const Configuration = () => {
  const dispatch = useDispatch();
  const config = useSelector((state) => selectConfiguration(state));
  const [storageType, setStorageType] = useState(config?.storageType);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const storageTypeHandler = (e) => {
    setStorageType(e.target.value);
  };
  const saveConfigHandler = (event) => {
    const configForSave = {
      storageType,
    };
    dispatch(updateConfiguration(configForSave));
    localStorage.setItem("config", JSON.stringify(configForSave));
    event.preventDefault();
    setIsSnackbarOpen(true);
  };
  const snackbarCloseHandle = (event, reason) => {
    if (reason === "clickaway") return;
    setIsSnackbarOpen(false);
  };

  return (
    <>
      <Header title="Configuration" />
      <form onSubmit={saveConfigHandler}>
        <Box display="flex" flexDirection="column">
          <FormControl sx={{ m: 3 }}>
            <InputLabel id="storageTypeLabel">Storage type</InputLabel>
            <Select
              labelId="storageTypeLabel"
              id="storageType"
              value={storageType}
              onChange={storageTypeHandler}
              autoWidth
              label="Storage type"
            >
              <MenuItem value="localStorage">Local storage</MenuItem>
              <MenuItem value="outerDatabase">Outer database</MenuItem>
            </Select>
          </FormControl>
          <Button type="submit" variant="contained">
            Save
          </Button>
          <Snackbar
            open={isSnackbarOpen}
            autoHideDuration={5000}
            onClose={snackbarCloseHandle}
          >
            <Alert
              onClose={snackbarCloseHandle}
              severity="success"
              sx={{ width: "100%" }}
            >
              Config saved successfully!
            </Alert>
          </Snackbar>
        </Box>
      </form>
    </>
  );
};

export default Configuration;
