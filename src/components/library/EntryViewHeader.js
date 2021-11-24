import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
import Header from "./Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRowData } from "../../store/librariesData-slice";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
// import GoBack from "../buttons/GoBack";
// import classes from "./EntryViewHeader.module.css";

const EntryViewHeader = ({ entry, setMode }) => {
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const editHandler = () => {
    setMode("edit");
  };
  const openDeleteRowAlertHandler = (e) => {
    e.preventDefault();
    setIsDeleteAlertOpen(true);
  };
  const closeDeleteAlertHandler = (e) => {
    e.preventDefault();
    setIsDeleteAlertOpen(false);
  };

  const deleteRowHandler = (e) => {
    e.preventDefault();
    dispatch(
      deleteRowData({ libUUID: entry?.libUUID, rowUUID: entry?.rowUUID })
    );

    history.goBack();
  };

  return (
    <Header title={entry?.title}>
      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="edit"
        sx={{ mr: 1 }}
        onClick={editHandler}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 1 }}
        onClick={openDeleteRowAlertHandler}
      >
        <DeleteIcon />
      </IconButton>

      <Dialog
        open={isDeleteAlertOpen}
        onClose={closeDeleteAlertHandler}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want delete this row data? This can't be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteAlertHandler}>Disagree</Button>
          <Button onClick={deleteRowHandler} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Header>
  );
};

export default EntryViewHeader;
