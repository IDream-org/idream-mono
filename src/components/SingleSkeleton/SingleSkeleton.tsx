import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

const SingleSkeleton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <Grid container wrap="nowrap" onClick={onClick}>
      <Box key={1} sx={{ width: 210, marginRight: 0.5, my: 5 }}>
        <Skeleton variant="rectangular" width={210} height={118} />

        <Box sx={{ pt: 0.5 }}>
          <Skeleton />
          <Skeleton width="60%" />
        </Box>
      </Box>
    </Grid>
  );
};

export default SingleSkeleton;
