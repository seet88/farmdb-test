import React from "react";
import { Box } from "@mui/system";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HomeIcon from "@mui/icons-material/Home";
import { useHistory } from "react-router";

const Header = (props) => {
  const history = useHistory();

  const handlerHomeClick = () => {
    history.push("/");
  };
  const handleGoBackClick = () => {
    history.goBack();
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {props.mode !== "empty" && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={handleGoBackClick}
              >
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {props.title}
              </Typography>

              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="home"
                sx={{ mr: 2 }}
                onClick={handlerHomeClick}
              >
                <HomeIcon />
              </IconButton>
            </>
          )}
          {props.children}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
