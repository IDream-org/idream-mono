import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import { BasicRatingProps } from "./BasicRatingProps";

const labels: { [index: string]: string } = {
  0.5: "Garbage",
  1: "Garbage+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const BasicRating: React.FC<BasicRatingProps> = ({
  value,
  size,
  disabled,
  width,
  sx,
  justifyContent,
  boxWidth,
  showLabel = true,
  handleChange,
}) => {
  const [hover, setHover] = React.useState(-1);

  return (
    <Box
      sx={{
        "& > legend": { mt: 2 },
        width: width ?? 200,
        display: "flex",
        justifyContent: justifyContent ?? "unset",
        alignItems: "center",
      }}
    >
      <Rating
        size={size}
        name="simple-controlled"
        value={value}
        readOnly={disabled}
        getLabelText={getLabelText}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        precision={0.5}
        onChange={(e, newValue) => handleChange(e, newValue)}
        sx={{ ...sx }}
      />
      {value !== null && showLabel && (
        <Box sx={{ ml: 2, width: boxWidth ?? "unset" }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
};

export default BasicRating;
