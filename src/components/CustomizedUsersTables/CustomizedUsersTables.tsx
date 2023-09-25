import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { CustomizedTablesProps } from "./CustomizedUsersTablesProps";
import { Avatar, Grid, useMediaQuery } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export function createRow({
  image,
  name,
  role,
  actions,
}: {
  image: string;
  name: string;
  role: string;
  actions: React.JSX.Element;
}) {
  return { image, name, role, actions };
}

const CustomizedTables: React.FC<CustomizedTablesProps> = ({
  columns,
  rows,
}) => {
  const theme = useTheme();
  const mdSize = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <TableContainer sx={{ maxHeight: "900px" }} component={Paper}>
      <Table
        sx={{
          // minWidth: 700,
          "& .MuiTableCell-root:last-child": {
            textAlign: "center",
          },
        }}
        aria-label="customized table"
      >
        <TableHead>
          <TableRow>
            {columns.map((column, index) => (
              <StyledTableCell key={index}>{column}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <Grid
                  display={"flex"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <Avatar src={row.image} sx={{ mr: 2 }} /> {row.name}
                </Grid>
              </StyledTableCell>
              <StyledTableCell align="left">{row.role}</StyledTableCell>
              <StyledTableCell align="center">{row.actions}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomizedTables;
