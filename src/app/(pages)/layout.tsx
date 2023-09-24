"use client";
import React, { useContext } from "react";
import { useRouter } from "next/navigation";
import { styled, useTheme } from "@mui/material/styles";
import { signOut } from "next-auth/react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { LayoutProps } from "./LayoutProps";
import { layoutItems, layoutSubItems } from "./LayoutItems";
import { ThemeContext } from "@/components/ThemeRegistry/ThemeRegistry";
import MaterialUISwitch from "@/components/MaterialUISwitch/MaterialUISwitch";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { openDrawer } from "../redux/features/drawerSlice";

const drawerWidth = 200;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.drawer);

  const { mode, setMode } = useContext(ThemeContext);

  const handleDrawerOpen = () => {
    dispatch(openDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(openDrawer(false));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <MaterialUISwitch
          sx={{ position: "absolute", right: 15, top: 15, zIndex: 10 }}
          onChange={() => setMode(mode === "light" ? "dark" : "light")}
        />
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
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
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {layoutItems.map(({ name, path, Icon }) => (
            <ListItem
              key={name}
              disablePadding
              onClick={(e) => {
                e.preventDefault();
                router.push(path);
              }}
            >
              <ListItemButton>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {layoutSubItems.map(({ name, path, Icon }) => (
            <ListItem
              key={name}
              disablePadding
              onClick={(e) => {
                e.preventDefault();
                signOut();
              }}
            >
              <ListItemButton>
                <ListItemIcon>{<Icon />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};

export default Layout;
