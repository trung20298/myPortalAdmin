import React from "react";
import MomentUtils from "@date-io/moment";
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import { Main } from "./styled";
export default function MaterialUIPickers(props) {
  return (
    <Main>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DateTimePicker format="DD/MM/yyyy" {...props} />
      </MuiPickersUtilsProvider>
    </Main>
  );
}
