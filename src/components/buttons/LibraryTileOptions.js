import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteLibraryData } from "../../store/librariesData-slice";
import { deleteLibraryTemplate } from "../../store/templateLibraries-slice";

const LibraryTileOptions = ({ libUUID, closeMenu }) => {
  const history = useHistory();
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const dispatch = useDispatch();

  const editHandler = (e) => {
    e.preventDefault();
    history.push({
      pathname: "/creator",
      state: { libUUID },
    });
  };

  const deleteLibraryHandler = (e) => {
    e.preventDefault();
    closeMenu(e);
    dispatch(deleteLibraryData({ libUUID }));
    dispatch(deleteLibraryTemplate({ libUUID }));
    setIsDeleteAlertOpen(false);
  };

  const openDeleteAlertHandler = (e) => {
    e.preventDefault();
    setIsDeleteAlertOpen(true);
  };
  const closeDeleteAlertHandler = (e) => {
    e.preventDefault();
    closeMenu(e);
    setIsDeleteAlertOpen(false);
  };

  return (
    <>
      <MenuItem onClick={editHandler}>Edit template</MenuItem>
      <MenuItem onClick={openDeleteAlertHandler}>Delete lib</MenuItem>
      <MenuItem onClick={closeMenu}>Option 3</MenuItem>
      <Dialog
        open={isDeleteAlertOpen}
        onClose={closeDeleteAlertHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this library template with data? This can't be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAlertHandler}>Disagree</Button>
          <Button onClick={deleteLibraryHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LibraryTileOptions;
