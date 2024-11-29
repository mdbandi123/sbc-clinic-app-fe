import { ReactNode, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

type NavCollapsingButtonProps = {
  icon: ReactNode;
  text: string;
  children: ReactNode;
};
function NavCollapsingButton({
  icon,
  text,
  children,
}: NavCollapsingButtonProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <List>
        <ListItemButton onClick={handleClick}>
          <ListItemIcon>{icon}</ListItemIcon>
          <ListItemText primary={text} />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </List>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
}

export default NavCollapsingButton;
