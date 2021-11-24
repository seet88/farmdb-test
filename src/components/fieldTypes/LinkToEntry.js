import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ModalEntriesList from "../library/ModalEntriesList";
import { useDispatch } from "react-redux";
import { deleteEntryLink } from "../../store/editedEntry-slice";
import {
  Collapse,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Modal,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";

const LinkToEntry = ({ field, mode, columnTemplate }) => {
  // const { libUUID, uniqueName } = entryLinks;
  // console.log("columnTemplate in LinkToEntry", columnTemplate);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [isLinkListOpen, setIsLinkListOpen] = useState(true);
  const listLinkOpenHandler = () => {
    setIsLinkListOpen(!isLinkListOpen);
  };

  const toggleShowModalHandler = () => {
    setShowModal(!showModal);
  };

  const deleteHandler = (e, entryIndex) => {
    console.log("delete link handler", entryIndex);
    e.preventDefault();
    dispatch(deleteEntryLink({ columnUUID: field?.columnUUID, entryIndex }));
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [showModal]);

  let libUUID;
  libUUID = columnTemplate?.options[0]?.dictionaryLibraryUUID;
  const libName = columnTemplate?.options[0]?.dictionaryLibraryName;
  const isEditMode = mode === "edit" || mode === "addNewEntry" ? true : false;

  return (
    <>
      <ListItemButton onClick={listLinkOpenHandler}>
        <ListItemText primary={libName} secondary="Link to entry" />
        {isLinkListOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Divider />
      <Collapse in={isLinkListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {field.entryLinks?.map((entryLink, idx) => (
            <Box key={idx}>
              <Link
                to={{
                  pathname: "/library/entry",
                  state: {
                    libUUID: entryLink?.libUUID,
                    rowUUID: entryLink?.rowUUID,
                    mode: "view",
                  },
                }}
              >
                <ListItem
                  sx={{ pl: 6 }}
                  secondaryAction={
                    isEditMode && (
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(event) => deleteHandler(event, idx)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )
                  }
                >
                  <ListItemText primary={entryLink?.rowTitle} />
                </ListItem>
              </Link>
              <Divider variant="inset" component="li" />
            </Box>
          ))}
          {isEditMode && (
            <ListItemButton sx={{ pl: 6 }} onClick={toggleShowModalHandler}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add from list" />
            </ListItemButton>
          )}
        </List>
      </Collapse>
      <Modal
        open={showModal}
        onClose={() => setShowModal(showModal)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ModalEntriesList
            toggleShowModal={toggleShowModalHandler}
            libUUID={libUUID}
            columnUUID={field?.columnUUID}
          ></ModalEntriesList>
        </Box>
      </Modal>
    </>
    // <div>
    //   <ul className={classes.list}>
    //     {field.entryLinks?.map((entryLink, idx) => (
    //       <li className={classes.item} key={idx}>
    //         {/* <Link to={`/library/${entry?.libraryId}/entry/${entry?.id}`}> */}
    //         <Link
    //           to={{
    //             pathname: "/library/entry",
    //             state: {
    //               libUUID: entryLink?.libUUID,
    //               rowUUID: entryLink?.rowUUID,
    //               mode: "view",
    //             },
    //           }}
    //           // className={classes.link}
    //         >
    //           <div className={classes.link}>
    //             <div className={classes.name}>{entryLink?.rowTitle}</div>
    //             {(mode === "edit" || mode === "addNewEntry") && (
    //               <button
    //                 className={classes.delete}
    //                 onClick={(event) => deleteHandler(event, idx)}
    //               >
    //                 X
    //               </button>
    //             )}
    //           </div>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    //   {(mode === "edit" || mode === "addNewEntry") && (
    //     <button
    //       className={classes.viewEntryList}
    //       onClick={toggleShowModalHandler}
    //     >
    //       Add from list
    //     </button>
    //   )}
    //   {showModal && (
    //     <ModalEntriesList
    //       toggleShowModal={toggleShowModalHandler}
    //       libUUID={libUUID}
    //       columnUUID={field?.columnUUID}
    //     ></ModalEntriesList>
    //   )}
    // </div>
  );
};

export default LinkToEntry;
