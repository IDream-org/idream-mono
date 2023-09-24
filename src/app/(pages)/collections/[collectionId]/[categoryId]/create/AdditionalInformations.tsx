import * as React from "react";
import { CategoryItems } from "@prisma/client";
import { useMediaQuery, useTheme } from "@mui/material";

import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";

interface ListOptions {
  [key: string]: string;
}

interface AdditionalInformationsProps {
  data: Partial<CategoryItems>;
  left: readonly number[];
  right: readonly number[];
  setData: React.Dispatch<React.SetStateAction<Partial<CategoryItems>>>;
  setLeft: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setRight: React.Dispatch<React.SetStateAction<readonly number[]>>;
}

export const getItemList = (index: number) => {
  switch (index) {
    case 0:
      return "Genre";
    case 1:
      return "Duration";
    case 2:
      return "Production";
    case 3:
      return "Link";
    default:
      return "";
  }
};

export const getItemIndex = (item: string) => {
  switch (item) {
    case "Genre":
      return 0;
    case "Duration":
      return 1;
    case "Production":
      return 2;
    case "Link":
      return 3;
    default:
      return 0;
  }
};

function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const AdditionalInformations: React.FC<AdditionalInformationsProps> = ({
  data,
  left,
  right,
  setLeft,
  setRight,
  setData,
}) => {
  const theme = useTheme();
  const lgSize = useMediaQuery(theme.breakpoints.down("lg"));
  const [checked, setChecked] = React.useState<readonly number[]>([]);
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const customList = (items: readonly number[], textField: boolean = true) => (
    <Paper
      sx={{
        width: lgSize ? 360 : 400,
        height: lgSize ? 400 : 460,
        overflow: "auto",
      }}
    >
      <List dense component="div" role="list">
        {items.map((value: number) => {
          const labelId = `transfer-list-item-${value}-label`;
          const itemValue = getItemList(value);

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon sx={{ minWidth: 0 }}>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={itemValue} />
              {textField && (
                <TextField
                  value={(data as any).details[itemValue] || ""}
                  onChange={(e) => {
                    const newOptions: ListOptions = {};
                    newOptions[itemValue] = e.target.value;
                    setData((prev) => ({
                      ...prev,
                      details: {
                        ...(prev.details as any),
                        ...newOptions,
                      },
                    }));
                  }}
                  inputProps={{
                    style: {
                      height: "10px",
                    },
                  }}
                />
              )}
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid
      container
      spacing={2}
      justifyContent="center"
      alignItems="center"
      flexDirection={lgSize ? "column" : "row"}
    >
      <Grid item>{customList(left, false)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
};

export default AdditionalInformations;
