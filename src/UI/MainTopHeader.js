import { AppBar, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import HeaderMenuOptions from "./HeaderMenuOptions";
import { useHistory } from "react-router";

const MainTopHeader = () => {
  const [anchorElement, setAnchorElement] = useState(null);
  const handleMenu = (event) => {
    setAnchorElement(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorElement(null);
  };
  const history = useHistory();

  const handleConfiguration = () => {
    history.push("/configuration");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="settings"
            sx={{ mr: 2 }}
            onClick={handleConfiguration}
          >
            <SettingsIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Default group
          </Typography>

          <IconButton
            size="large"
            aria-label="config"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElement}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElement)}
            onClose={handleClose}
          >
            <HeaderMenuOptions handleCloseMenu={handleClose} />
          </Menu>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainTopHeader;
