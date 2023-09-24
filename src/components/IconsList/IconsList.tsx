import React from "react";
import { Grid } from "@mui/material";
import { IconstArray } from "./IconstArray";

import "./InconListStyles.css";
import { CategoryItems, Icons } from "@prisma/client";
import { IconType } from "react-icons";

interface IconsListProps {
  data: Partial<CategoryItems>;
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
}

const IconsList: React.FC<IconsListProps> = ({ data, setData }) => {
  const size = "3.5em";
  console.log(data);
  const handleClick = (selectIcon: IconType) => {
    if (data.icons?.includes(selectIcon.name as Icons)) {
      const filteredIcons = data.icons.filter(
        (icon) => icon !== selectIcon.name
      );
      setData((prev) => ({
        ...prev,
        icons: filteredIcons,
      }));
    } else {
      setData((prev) => ({
        ...prev,
        icons: [...prev.icons!, selectIcon.name as Icons],
      }));
    }
  };

  return (
    <Grid>
      {IconstArray.map((icon, index) => {
        return (
          <React.Fragment key={index}>
            {icon({
              size,
              style: {
                backgroundColor: data.icons?.includes(icon.name as Icons)
                  ? "white"
                  : undefined,
                boxShadow: data.icons?.includes(icon.name as Icons)
                  ? "0.4px 0.2px 0.2px 0px black"
                  : undefined,
              },
              className: "icon",
              onClick: () => handleClick(icon),
            })}
          </React.Fragment>
        );
      })}
    </Grid>
  );
};

export default IconsList;
