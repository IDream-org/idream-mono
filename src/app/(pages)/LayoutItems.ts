import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PermMediaIcon from "@mui/icons-material/PermMedia";
import LogoutIcon from "@mui/icons-material/Logout";

interface LayoutItems {
  name: string;
  path: string;
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
}

export const layoutItems: LayoutItems[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    Icon: HomeIcon,
  },
  {
    name: "Profile",
    path: "/profile",
    Icon: AccountCircleIcon,
  },
  {
    name: "Collections",
    path: "/collections",
    Icon: PermMediaIcon,
  },
];

export const layoutSubItems: LayoutItems[] = [
  {
    name: "Logout",
    path: "/",
    Icon: LogoutIcon,
  },
];
