import { Box } from "@mui/system";
import React from "react";
import EntriesList from "./EntriesList";

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: 700,
  bgcolor: "primary.lighter",
  border: "2px solid #000",
  boxShadow: 24,

  overflow: "auto",
};

const ModalEntriesList = ({ toggleShowModal, libUUID, columnUUID }) => {
  console.log("modal:", libUUID, "columnUUID", columnUUID);

  return (
    <Box sx={style}>
      <EntriesList
        libUUID={libUUID}
        mode="linking"
        parentColumnUUID={columnUUID}
        clickEntryLinkHandler={toggleShowModal}
      ></EntriesList>
    </Box>
  );
};

export default ModalEntriesList;
