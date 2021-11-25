import React from "react";
import { Link } from "react-router-dom";
import { ListItemButton, ListItemText } from "@mui/material";
import { Box } from "@mui/system";

const ShortEntryView = ({ entry, mode, libUUID }) => {
  const content = (
    <ListItemButton
      data-testid={
        "linkToEntry-" + entry.fe_title.replaceAll(" ", "_").toLowerCase()
      }
    >
      <ListItemText primary={entry.fe_title} secondary={entry.fe_description} />
    </ListItemButton>
  );
  if (mode === "linking") return <Box>{content}</Box>;
  else
    return (
      <Link
        to={{
          pathname: "/library/entry",
          state: {
            libUUID: libUUID,
            rowUUID: entry?.rowUUID,
            mode: "view",
          },
        }}
      >
        {content}
      </Link>
    );
};

export default ShortEntryView;
