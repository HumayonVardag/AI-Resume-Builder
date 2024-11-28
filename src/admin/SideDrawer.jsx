import * as React from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;

const NAVIGATION = [
  {
    routing: '/admin/dashboard',
    label: 'Dasboard'
  },
  {
    routing: '/admin/analytics',
    label: 'Analytics'
  },
  {
    routing: '/admin/plans',
    label: 'Plans'
  }
]

const SideDrawer = () => {
  const navigation = useNavigate()
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant='permanent'
      anchor='left'>
      <Toolbar />
      <Divider />
      <List>
        {NAVIGATION.map((current, index) => (
          <ListItem key={current.label}disablePadding>
            <ListItemButton onClick={() => (navigation(current.routing) )}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={current.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default SideDrawer;
