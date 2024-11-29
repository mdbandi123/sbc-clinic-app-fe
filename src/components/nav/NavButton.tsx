import ListItem from "@mui/material/ListItem/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon/ListItemIcon";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import { ReactNode } from "react";
import { NavLink } from "react-router";

type NavButtonProps = {
  icon: ReactNode;
  text: string;
  path: string;
  isNestedElement?: boolean;
};

function NavButton({
  icon,
  text,
  path,
  isNestedElement = false,
}: NavButtonProps) {
  return (
    <NavLink to={path} style={{ textDecoration: "none", color: "#000" }}>
      <ListItem
        style={{
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: isNestedElement ? "10%" : 0,
        }}
      >
        <ListItemButton>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItemButton>
      </ListItem>
    </NavLink>
  );
}

export default NavButton;
