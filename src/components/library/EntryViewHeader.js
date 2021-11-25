import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Header from "./Header";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRowData } from "../../store/librariesData-slice";
import { useHistory } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import DialogQuestion from "../../UI/DialogQuestion";

const DIALOG_QUESTION = {
  title: "Are you sure?",
  contentText: `Do you want delete this row data? This cannot be undone!`,
};

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
        data-testid="edit"
        sx={{ mr: 1 }}
        onClick={editHandler}
      >
        <EditIcon />
      </IconButton>

      <IconButton
        size="large"
        edge="end"
        color="inherit"
        aria-label="delete"
        data-testid="delete"
        sx={{ mr: 1 }}
        onClick={openDeleteRowAlertHandler}
      >
        <DeleteIcon />
      </IconButton>

      <DialogQuestion
        isAlertOpen={isDeleteAlertOpen}
        disagreeHandler={closeDeleteAlertHandler}
        agreeHandler={deleteRowHandler}
        title={DIALOG_QUESTION.title}
        contentText={DIALOG_QUESTION.contentText}
      />
    </Header>
  );
};

export default EntryViewHeader;
