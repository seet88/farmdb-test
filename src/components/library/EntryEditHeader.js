import { IconButton, Typography } from "@mui/material";
import React from "react";
import Header from "./Header";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";

const EntryEditHeader = ({ setMode, actionButtonHandler }) => {
  const { cancelHandler, saveHandler, setIsSnackbarOpen } = actionButtonHandler;
  const cancelButtonHandler = () => {
    setMode("view");
    cancelHandler();
  };

  const saveButtonHandler = () => {
    setMode("view");
    saveHandler();
    setIsSnackbarOpen(true);
  };

  return (
    <Header mode="empty">
      <IconButton
        data-testid="saveEntry"
        size="large"
        edge="start"
        color="inherit"
        aria-label="save"
        sx={{ mr: 2 }}
        onClick={saveButtonHandler}
      >
        <DoneIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Edit
      </Typography>
      <IconButton
        data-testid="cancelEntry"
        size="large"
        edge="end"
        color="inherit"
        aria-label="cancel"
        sx={{ mr: 2 }}
        onClick={cancelButtonHandler}
      >
        <ClearIcon />
      </IconButton>
    </Header>
  );
};

export default EntryEditHeader;
