import { MenuItem } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteLibraryData } from "../../store/librariesData-slice";
import { deleteLibraryTemplate } from "../../store/templateLibraries-slice";
import DialogQuestion from "../../UI/DialogQuestion";

const DIALOG_QUESTION = {
  title: "Are you sure?",
  contentText: ` Do you want delete this library template with data? This can't be
  undone.`,
};

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
      <MenuItem onClick={editHandler} data-testid="libraryMenuEditTemplate">
        Edit template
      </MenuItem>
      <MenuItem
        onClick={openDeleteAlertHandler}
        data-testid="libraryMenuDelete"
      >
        Delete lib
      </MenuItem>
      <DialogQuestion
        isAlertOpen={isDeleteAlertOpen}
        disagreeHandler={closeDeleteAlertHandler}
        agreeHandler={deleteLibraryHandler}
        title={DIALOG_QUESTION.title}
        contentText={DIALOG_QUESTION.contentText}
      />
    </>
  );
};

export default LibraryTileOptions;
