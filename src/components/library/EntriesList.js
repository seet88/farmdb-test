import React from "react";
import ShortEntryView from "./ShortEntryView";
import { useSelector } from "react-redux";
import { selectLibraryById } from "../../store/templateLibraries-slice";
import { addNewEntryLink } from "../../store/editedEntry-slice";
import LibraryHeader from "./LibraryHeader";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLibDataByLibraryId } from "../../store/librariesData-slice";
import { v4 as uuidv4 } from "uuid";
import {
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListSubheader,
  Typography,
} from "@mui/material";
import Header from "./Header";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const EntriesList = ({
  libUUID,
  mode,
  parentColumnUUID,
  clickEntryLinkHandler,
}) => {
  const location = useLocation();
  if (mode !== "linking") libUUID = location?.state?.libUUID;
  const dispatch = useDispatch();
  const libData = useSelector((state) => getLibDataByLibraryId(state, libUUID));
  const library = {
    name: libData?.name,
  };

  const libTemplate = useSelector((state) => selectLibraryById(state, libUUID));
  const clickBoxHandler = (entry) => {
    if (mode === "linking") {
      const columnParentName = libTemplate.columns.find(
        (col) => col.columnUUID === parentColumnUUID
      )?.sqlFieldName;
      const link = {
        ...entry,
        parentColumnUUID,
        newUUID: uuidv4(),
        libUUID,
        sqlTableName: libTemplate.sqlTableName,
        columnParentName,
      };
      dispatch(addNewEntryLink(link));
      clickEntryLinkHandler();
    }
  };
  const CustomBox = ({ entry, children, clickHandler }) => {
    return <div onClick={() => clickHandler(entry)}>{children}</div>;
  };

  return (
    <>
      {mode !== "linking" && <LibraryHeader library={library} mode={mode} />}
      {mode === "linking" && (
        <Header mode="empty">
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="goBack"
            sx={{ mr: 2 }}
            onClick={clickEntryLinkHandler}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {library.name}
          </Typography>
        </Header>
      )}
      <List
        sx={{ width: "100%", bgcolor: "primary" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader
            component="div"
            id="nested-list-subheader"
            sx={{ backgroundColor: "primary.light" }}
            data-testid={"entriesList"}
          >
            Entries List Items:
          </ListSubheader>
        }
      >
        {!libData?.rows.length > 0 && (
          <ListItemButton>
            <ListItemText primary="No entry yet" />
          </ListItemButton>
        )}

        {libData?.rows.map((entry) => (
          <>
            <CustomBox
              key={entry.rowUUID}
              entry={entry}
              clickHandler={clickBoxHandler}
            >
              <ShortEntryView
                entry={entry}
                libUUID={libData.libUUID}
                mode={mode}
              />
            </CustomBox>
            <Divider />
          </>
        ))}
      </List>
    </>
  );
};

export default EntriesList;
