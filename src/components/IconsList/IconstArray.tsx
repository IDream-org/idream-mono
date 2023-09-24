import {
  AiFillYoutube,
  AiOutlineAmazon,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
} from "react-icons/ai";
import { RiNetflixFill } from "react-icons/ri";
import { SiHulu, SiHbo } from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowDownLeftCircleFill,
  BsFillArrowDownLeftSquareFill,
  BsFillArrowDownRightCircleFill,
  BsFillArrowDownRightSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightCircleFill,
  BsFillArrowRightSquareFill,
  BsFillArrowUpCircleFill,
  BsFillArrowUpLeftCircleFill,
  BsFillArrowUpLeftSquareFill,
  BsFillArrowUpRightCircleFill,
  BsFillArrowUpRightSquareFill,
  BsFillArrowUpSquareFill,
} from "react-icons/bs";
import {
  CgShapeCircle,
  CgShapeHalfCircle,
  CgShapeHexagon,
  CgShapeRhombus,
  CgShapeSquare,
  CgShapeTriangle,
} from "react-icons/cg";
import { Icons } from "@prisma/client";
import { IconType } from "react-icons";

export const IconstArray = [
  AiFillYoutube,
  AiOutlineAmazon,
  AiOutlineArrowDown,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineArrowUp,
  RiNetflixFill,
  SiHbo,
  SiHulu,
  TbBrandDisney,
  BsFillArrowDownCircleFill,
  BsFillArrowDownLeftCircleFill,
  BsFillArrowDownLeftSquareFill,
  BsFillArrowDownRightCircleFill,
  BsFillArrowDownRightSquareFill,
  BsFillArrowDownSquareFill,
  BsFillArrowLeftCircleFill,
  BsFillArrowLeftSquareFill,
  BsFillArrowRightCircleFill,
  BsFillArrowRightSquareFill,
  BsFillArrowUpCircleFill,
  BsFillArrowUpLeftCircleFill,
  BsFillArrowUpLeftSquareFill,
  BsFillArrowUpRightCircleFill,
  BsFillArrowUpRightSquareFill,
  BsFillArrowUpSquareFill,
  CgShapeCircle,
  CgShapeHalfCircle,
  CgShapeHexagon,
  CgShapeRhombus,
  CgShapeSquare,
  CgShapeTriangle,
];

const getIconComponent = (Icon: IconType) => (
  <Icon key={Icon.name} size={"2em"} style={{ marginRight: "30px" }} />
);

export const getIcons = (icon: Icons) => {
  switch (icon) {
    case Icons.CgShapeCircle:
      return getIconComponent(CgShapeCircle);
    case Icons.CgShapeHalfCircle:
      return getIconComponent(CgShapeHalfCircle);
    case Icons.CgShapeHexagon:
      return getIconComponent(CgShapeHexagon);
    case Icons.CgShapeRhombus:
      return getIconComponent(CgShapeRhombus);
    case Icons.CgShapeSquare:
      return getIconComponent(CgShapeSquare);
    case Icons.CgShapeTriangle:
      return getIconComponent(CgShapeTriangle);
    case Icons.AiFillYoutube:
      return getIconComponent(AiFillYoutube);
    case Icons.AiOutlineAmazon:
      return getIconComponent(AiOutlineAmazon);
    case Icons.AiOutlineArrowDown:
      return getIconComponent(AiOutlineArrowDown);
    case Icons.AiOutlineArrowLeft:
      return getIconComponent(AiOutlineArrowLeft);
    case Icons.AiOutlineArrowRight:
      return getIconComponent(AiOutlineArrowRight);
    case Icons.AiOutlineArrowUp:
      return getIconComponent(AiOutlineArrowUp);
    case Icons.RiNetflixFill:
      return getIconComponent(RiNetflixFill);
    case Icons.SiHulu:
      return getIconComponent(SiHulu);
    case Icons.SiHbo:
      return getIconComponent(SiHbo);
    case Icons.TbBrandDisney:
      return getIconComponent(TbBrandDisney);
    case Icons.BsFillArrowDownCircleFill:
      return getIconComponent(BsFillArrowDownCircleFill);
    case Icons.BsFillArrowDownLeftCircleFill:
      return getIconComponent(BsFillArrowDownLeftCircleFill);
    case Icons.BsFillArrowDownLeftSquareFill:
      return getIconComponent(BsFillArrowDownLeftSquareFill);
    case Icons.BsFillArrowDownRightCircleFill:
      return getIconComponent(BsFillArrowDownRightCircleFill);
    case Icons.BsFillArrowDownRightSquareFill:
      return getIconComponent(BsFillArrowDownRightSquareFill);
    case Icons.BsFillArrowDownSquareFill:
      return getIconComponent(BsFillArrowDownSquareFill);
    case Icons.BsFillArrowLeftCircleFill:
      return getIconComponent(BsFillArrowLeftCircleFill);
    case Icons.BsFillArrowLeftSquareFill:
      return getIconComponent(BsFillArrowLeftSquareFill);
    case Icons.BsFillArrowRightCircleFill:
      return getIconComponent(BsFillArrowRightCircleFill);
    case Icons.BsFillArrowRightSquareFill:
      return getIconComponent(BsFillArrowRightSquareFill);
    case Icons.BsFillArrowUpCircleFill:
      return getIconComponent(BsFillArrowUpCircleFill);
    case Icons.BsFillArrowUpLeftCircleFill:
      return getIconComponent(BsFillArrowUpLeftCircleFill);
    case Icons.BsFillArrowUpLeftSquareFill:
      return getIconComponent(BsFillArrowUpLeftSquareFill);
    case Icons.BsFillArrowUpRightCircleFill:
      return getIconComponent(BsFillArrowUpRightCircleFill);
    case Icons.BsFillArrowUpRightSquareFill:
      return getIconComponent(BsFillArrowUpRightSquareFill);
    case Icons.BsFillArrowUpSquareFill:
      return getIconComponent(BsFillArrowUpSquareFill);

    default:
      return null;
  }
};
