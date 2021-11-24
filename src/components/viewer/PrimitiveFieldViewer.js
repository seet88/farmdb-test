import { ListItemText } from "@mui/material";

const PrimitiveFieldViewer = ({ columnName, value }) => (
  <ListItemText primary={columnName} secondary={value} sx={{ mx: 2 }} />
);

export default PrimitiveFieldViewer;
