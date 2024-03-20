import { useState } from "react";
import "./sidebar.css";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
} from "@mui/material";
import {
  Chat,
  Close,
  Home,
  Lightbulb,
  Menu,
  Person,
} from "@mui/icons-material";

enum CurrentPage {
  HOME = 0,
  CHATHISTORY = 1,
  PREDICTION = 2,
  PROFILE = 3,
}

interface sidebarItem {
  label: string;
  pageType: CurrentPage;
  icon: React.ReactElement;
}

// List of all sidebar components in the sidebar menu
const sidebarItems = [
  {
    label: "Home",
    pageType: CurrentPage.HOME,
    icon: <Home></Home>,
  },
  {
    label: "Chat History",
    pageType: CurrentPage.CHATHISTORY,
    icon: <Chat></Chat>,
  },
  {
    label: "Daily Prediction",
    pageType: CurrentPage.PREDICTION,
    icon: <Lightbulb></Lightbulb>,
  },
  {
    label: "Profile",
    pageType: CurrentPage.PROFILE,
    icon: <Person></Person>,
  },
];

/**
 * Sidebar component with links to various pages in the website
 */
export const Sidebar = (props: {
  handleLoginOpen: () => void;
  isLoggedIn: boolean;
  currentPage: CurrentPage;
}) => {
  // State to detect when the side bar menu is open
  const [open, setOpen] = useState(false);
  const handleLoginOpen = props.handleLoginOpen;
  const currentPage = props.currentPage;
  const isLoggedIn = props.isLoggedIn;

  const handleLogin = () => {
    handleLoginOpen();
    setOpen(false);
  };

  const handleLoginDefault = () => {
    setOpen(false);
  };

  const SidebarButton = (props: sidebarItem) => {
    return (
      <ListItem>
        <ListItemButton
          onClick={
            !isLoggedIn
              ? props.pageType === currentPage
                ? handleLoginDefault
                : handleLogin
              : () => {}
          }
        >
          <div className="sidebar-button">
            {props.icon}
            <div className="sidebar-label">{props.label}</div>
          </div>
        </ListItemButton>
      </ListItem>
    );
  };

  const SidebarHeader = (props: { setOpenHandler: Function }) => {
    return (
      <div className="sidebar-header">
        <div>🎱 GPT</div>
        <IconButton onClick={() => props.setOpenHandler(false)}>
          <Close></Close>
        </IconButton>
      </div>
    );
  };

  return (
    <div className="sidebar">
      <IconButton onClick={() => setOpen(true)} edge="start" aria-label="logo">
        <Menu />
      </IconButton>
      <Drawer
        variant="temporary"
        open={open}
        onClose={() => setOpen(false)}
        hideBackdrop
      >
        <div className="drawer-container">
          <SidebarHeader setOpenHandler={setOpen} />
          <Divider style={{ width: "100%" }}></Divider>
          <List sx={{ width: 260 }}>
            {sidebarItems.map((item) => (
              <SidebarButton
                key={item.label}
                label={item.label}
                pageType={item.pageType}
                icon={item.icon}
              ></SidebarButton>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
};
