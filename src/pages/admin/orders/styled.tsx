import styled from "styled-components";
import { Grid, TextField, Typography, TableContainer } from "@material-ui/core";

interface GridHeaderTableProps {
  width: any;
}
export const Main = styled.div`
  min-height: calc(100vh - 118px);
  background-color: #ffff;
  margin: 1em 0;
  padding: 0 12px;
`;
export const GridHeaderTable = styled(Grid)<GridHeaderTableProps>`
  line-height: 40px;
  > span {
    width: ${(props) => (props.width && `${props.width}px`) || "auto"};
    padding-right: 7pt;
    display: inline-block;
  }
  .MuiAutocomplete-root {
    width: 120px;
    display: inline-block;
    height: 40px;
    box-sizing: border-box;
    .MuiInputBase-root {
      padding-right: 39px !important;
      .MuiOutlinedInput-input {
        padding: 0 !important;
      }
    }
  }
`;

export const FormTextField = styled(TextField)`
  background-color: #ffff;
  .MuiOutlinedInput-input {
    height: 40px;
    box-sizing: border-box;
  }
`;

export const TextTypography = styled(Typography)`
  padding: 7px 10px;
  font-size: 15px !important;
  cursor: pointer;
  color: #1f308e;
  &:hover {
    background-color: #6c8ebf;
    color: #ffff;
  }
`;
export const TableContainerCustome = styled(TableContainer)`
  margin-top: 1em;
  .MuiTableCell-head {
    font-weight: 600;
  }
`;
