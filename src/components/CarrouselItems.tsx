import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import { CarouselItemsProps } from "./WrapperComponent/CarouselItemsProps";

const CarouselImage = styled("img")(({ theme }) => ({
  color: "transparent",
  overflow: "hidden",
  width: "100%",
  height: "auto",
  objectFit: "cover",
  //   height: "100vh",
  //   width: "100%",
  //   opacity: "20%",
  // [theme.breakpoints.down('lg')]: {
  //   height: 600,
  // },
  //   position: "relative",
  //   "-webkit-animation": "linear infinite alternate",
  //   "-webkit-animation-name": "run",
  //   "-webkit-animation-duration": "40s",
  //   "@-webkit-keyframes run": {
  //     "0%": {
  //       left: "0%",
  //     },
  //     "50%": {
  //       left: "-50%",
  //     },
  //     "100%": {
  //       left: "0%",
  //     },
  //   },
  //   [theme.breakpoints.down("md")]: {
  //     width: "unset",
  //     "-webkit-animation": "linear infinite alternate",
  //     "-webkit-animation-name": "run",
  //     "-webkit-animation-duration": "20s",
  //     "@-webkit-keyframes run": {
  //       "0%": {
  //         left: "0%",
  //       },
  //       "50%": {
  //         left: "-50%",
  //       },
  //       "100%": {
  //         left: "0%",
  //       },
  //     },
  //   },
  // [theme.breakpoints.down('sm')]: {
  //   height: 300,
  // },
  // [theme.breakpoints.down('xs')]: {
  //   height: 200,
  // },
}));

const CarouselItems: React.FC<CarouselItemsProps> = ({ title, image }) => {
  return (
    <Grid
      sx={
        {
          // display: "flex",
          // justifyContent: "center",
          // width: { sm: "110%", md: "130%", xl: "150%" },
        }
      }
    >
      <CarouselImage src={image} alt={title} />
      <p>{title}</p>
    </Grid>
  );
};

export default CarouselItems;
