import { MenuItem } from "@mui/material";
import { useHistory } from "react-router";

const HeaderMenuOptions = ({ handleCloseMenu }) => {
  const history = useHistory();

  const handleConfiguration = () => {
    history.push("/configuration");
    handleCloseMenu();
  };

  const handleNewLibraryCreator = () => {
    history.push("/creator");
    handleCloseMenu();
  };
  return (
    <>
      <MenuItem onClick={handleConfiguration}>Configuration</MenuItem>
      <MenuItem onClick={handleNewLibraryCreator}>New Library</MenuItem>
    </>
  );
};
export default HeaderMenuOptions;
