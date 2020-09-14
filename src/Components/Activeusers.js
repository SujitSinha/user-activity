import React from "react";
import "../App.css";
import data from "../Test_JSON.json";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import AccountCircleRoundedIcon from "@material-ui/icons/AccountCircleRounded";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventIcon from "@material-ui/icons/Event";
import Calendars from "./Calendars";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#559CAD',
    color: theme.palette.common.white,
    fontSize: "1.5rem",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({}))(TableRow);

function Activeusers() {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="customized table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell align="left">
                User Name
                <AccountCircleRoundedIcon />
              </StyledTableCell>
              <StyledTableCell align="left">
                Location
                <LocationOnIcon />
              </StyledTableCell>
              <StyledTableCell align="left">
                Activity Date <EventIcon />
              </StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <StyledTableCell align="left">{item.real_name}</StyledTableCell>
                <StyledTableCell align="left">{item.tz}</StyledTableCell>
                <StyledTableCell align="left">
                  {" "}
                  {item.activity_periods.map((time_in, index) => {
                    return (
                      <Calendars key={index}
                        date={time_in.start_time.substr(0, 11)}
                        timein={time_in.start_time.substr(12)}
                        timeout={time_in.end_time.substr(12)}
                        user={item}
                        activities={item.activity_periods}
                      />
                    );
                  })}
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Activeusers;
