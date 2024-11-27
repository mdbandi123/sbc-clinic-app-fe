import {ReactNode, useState} from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse/Collapse';
import StarBorder from '@mui/icons-material/StarBorder';
import NavButton from './NavButton';
import { Accessible, Add, AddBox, CalendarMonth, Edit, FormatListBulleted, Home, MedicalInformation, PersonAdd, PersonSearch, Search, SupervisorAccount } from '@mui/icons-material';
import { routes } from '../../util/routes/routes';
import NavCollapsingButton from './NavCollapsingButton';
import SbcLogo from "../../assets/sbclogo.jpg";

const drawerWidth = 240;

type NavDrawerProps = {
  children: ReactNode
}

export default function NavDrawer({children}: NavDrawerProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            SBC Clinic App
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img src={SbcLogo} alt="logo" style={{width:'100%'}}/>
        </Toolbar>
        <Divider />
        <List>
          <NavButton text="Home" icon={<Home />} path={routes.home}/>
        </List>
        <Divider />
        <List>
          <NavCollapsingButton text="Patient" icon={<Accessible/>}>
            <NavButton text="Add New" icon={<PersonAdd/>} path={routes.addPatient} isNestedElement={true}/>
            <NavButton text="Find Existing" icon={<PersonSearch/>} path={routes.searchPatient} isNestedElement={true}/>
          </NavCollapsingButton>
          <NavCollapsingButton text="Appointment" icon={<CalendarMonth/>}>
            <NavButton text="Create New" icon={<AddBox/>} path={routes.home} isNestedElement={true}/>
            <NavButton text="List All" icon={<FormatListBulleted/>} path={routes.home} isNestedElement={true}/>
          </NavCollapsingButton>
          <NavCollapsingButton text="Visitations" icon={<MedicalInformation/>}>
            <NavButton text="New Report" icon={<AddBox/>} path={routes.home} isNestedElement={true}/>
            <NavButton text="New Medical Certificate" icon={<AddBox/>} path={routes.home} isNestedElement={true}/>
            <NavButton text="Search Reports" icon={<Search/>} path={routes.home} isNestedElement={true}/>
          </NavCollapsingButton>
        </List>
        <Divider/>
        <List>
          <NavCollapsingButton text="Staff" icon={<SupervisorAccount/>}>
          <NavButton text="Add New" icon={<PersonAdd/>} path={routes.addStaff} isNestedElement={true}/>
            <NavButton text="List All" icon={<FormatListBulleted/>} path={routes.searchStaff} isNestedElement={true}/>
          </NavCollapsingButton>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        <Toolbar />
          {children}
      </Box>
    </Box>
  );
}
