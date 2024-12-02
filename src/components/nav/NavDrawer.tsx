import {
  Accessible,
  AddBox,
  CalendarMonth,
  FormatListBulleted,
  Home,
  MedicalInformation,
  PersonAdd,
  PersonSearch,
  Search,
  SupervisorAccount,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { ReactNode } from "react";
import SBClinicLogo from "../../assets/SB-Clinic.png";
import { routes } from "../../util/routes/routes";
import useStore from "../../util/store/store";
import NavButton from "./NavButton";
import NavCollapsingButton from "./NavCollapsingButton";

const drawerWidth = 240;

type NavDrawerProps = {
  children: ReactNode;
};

export default function NavDrawer({ children }: NavDrawerProps) {
  const { toolbarTitle } = useStore();
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar sx={{ backgroundColor: "#016bad" }}>
          <Typography variant="h6" noWrap component="div" style={{color: '#FFF', fontWeight: 700}}>
            {toolbarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <img src={SBClinicLogo} alt="logo" style={{ width: "100%" }} />
        </Toolbar>
        <Divider />
        <List>
          <NavButton text="Home" icon={<Home />} path={routes.home} />
        </List>
        <Divider />
        <List>
          <NavCollapsingButton text="Patient" icon={<Accessible />}>
            <NavButton
              text="Add New"
              icon={<PersonAdd />}
              path={routes.addPatient}
              isNestedElement={true}
            />
            <NavButton
              text="Find Existing"
              icon={<PersonSearch />}
              path={routes.searchPatient}
              isNestedElement={true}
            />
          </NavCollapsingButton>
          <NavCollapsingButton text="Appointment" icon={<CalendarMonth />}>
            <NavButton
              text="Create New"
              icon={<AddBox />}
              path={routes.addAppointment}
              isNestedElement={true}
            />
            <NavButton
              text="List All"
              icon={<FormatListBulleted />}
              path={routes.searchAppointment}
              isNestedElement={true}
            />
          </NavCollapsingButton>
          <NavCollapsingButton text="Visitations" icon={<MedicalInformation />}>
            <NavButton
              text="New Report"
              icon={<AddBox />}
              path={routes.appointmentReport}
              isNestedElement={true}
            />
            <NavButton
              text="New Medical Certificate"
              icon={<AddBox />}
              path={routes.addMc}
              isNestedElement={true}
            />
            <NavButton
              text="Search Reports"
              icon={<Search />}
              path={routes.searchReport}
              isNestedElement={true}
            />
          </NavCollapsingButton>
        </List>
        <Divider />
        <List>
          <NavCollapsingButton text="Staff" icon={<SupervisorAccount />}>
            <NavButton
              text="Add New"
              icon={<PersonAdd />}
              path={routes.addStaff}
              isNestedElement={true}
            />
            <NavButton
              text="List All"
              icon={<FormatListBulleted />}
              path={routes.searchStaff}
              isNestedElement={true}
            />
          </NavCollapsingButton>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "background.default", p:3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
