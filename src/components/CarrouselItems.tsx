import Grid from "@mui/material/Grid";
import styled from "@mui/system/styled";
import { CarouselItemsProps } from "./WrapperComponent/CarouselItemsProps";

const CarouselImage = styled("img")(({ theme }) => ({
  color: "transparent",
  overflow: "hidden",
  width: "100%",
  height: "auto",
  objectFit: "cover",
}));

const CarouselItems: React.FC<CarouselItemsProps> = ({ title, image }) => {
  return (
    <Grid>
      <CarouselImage src={image} alt={title} />
      <p>{title}</p>
    </Grid>
  );
};

export default CarouselItems;
