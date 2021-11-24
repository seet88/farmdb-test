import React from "react";
import LibraryTileOptions from "../buttons/LibraryTileOptions";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Card,
  CardHeader,
  IconButton,
  CardContent,
  Typography,
  CardMedia,
  CardActions,
  Menu,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const src = "https://img.icons8.com/ios/452/field.png";

const LibraryTile = ({ library }) => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpened = Boolean(anchorEl);
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
    event.preventDefault();
  };
  const handleCloseMenu = (event) => {
    setAnchorEl(null);
    event.preventDefault();
  };

  const addNewEntryHandler = (event) => {
    event.preventDefault();
    history.push({
      pathname: "/library/entry",
      state: { libUUID: library?.libUUID, mode: "addNewEntry", rowUUID: null },
    });
  };

  return (
    <Link
      to={{
        pathname: "/library",
        state: { libUUID: library?.libUUID },
      }}
    >
      <Card sx={{ maxWidth: 200, m: 1, backgroundColor: "primary.light" }}>
        <CardHeader
          avatar={
            <CardMedia
              image={src}
              width="30"
              component="img"
              sx={{ maxWidth: 50 }}
            />
          }
          action={
            <IconButton
              id="additional-action-button"
              aria-controls="additional-action-menu"
              aria-haspopup="true"
              aria-expanded={isMenuOpened ? "true" : undefined}
              onClick={handleOpenMenu}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title=""
          subheader=""
        />
        <Menu
          id="additional-action-menu"
          aria-labelledby="additional-action-button"
          anchorEl={anchorEl}
          open={isMenuOpened}
          onClose={handleCloseMenu}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          <LibraryTileOptions
            closeMenu={handleCloseMenu}
            libUUID={library?.libUUID}
          />
        </Menu>
        <CardContent>
          <Typography variant="body1" color="initial">
            {library?.name}
          </Typography>
          <Typography variant="body2" color="initial">
            Entries: {library?.entriesCount}
          </Typography>
          <Typography variant="body3" color="initial">
            {library?.lastModification}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            size="large"
            variant=""
            edge="end"
            color="primary"
            aria-label="home"
            sx={{
              mr: 1,
              ml: "auto",
              backgroundColor: "primary.main",
              color: "primary.dark",
              "&:hover": {
                backgroundColor: "secondary.light",
              },
            }}
            onClick={addNewEntryHandler}
          >
            <AddIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Link>
  );
};

export default LibraryTile;
