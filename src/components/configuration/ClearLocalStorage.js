import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

const ClearLocalStorage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const clearLocalStorageHandler = () => {
    localStorage.removeItem("libsData");
    localStorage.removeItem("templates");
    localStorage.removeItem("entryViewConfig");
    setIsOpen(false);
    window.location.reload(false);
  };

  return (
    <>
      <Typography component="h4">Clear database data?</Typography>
      <Button
        variant="outlined"
        color="error"
        sx={{ maxWidth: "40%" }}
        onClick={handleClickOpen}
      >
        Clear local storage
      </Button>

      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action will clear data from local storage. All your created
            library will be deleted with data. That's cannot be undone!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={clearLocalStorageHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ClearLocalStorage;
