import styled from "styled-components";
import { TextField } from "@material-ui/core";
export const Main = styled.div`
  min-height: calc(100vh - 118px);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .MuiFormGroup-root {
    display: block !important;
  }
`;
export const LabelError = styled.div`
  color: red;
`;
export const FormTextField = styled(TextField)`
  background-color: #ffff;
`;
