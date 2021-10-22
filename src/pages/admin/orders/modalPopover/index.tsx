import React, { useState, useImperativeHandle, forwardRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { Popover, Typography } from "@material-ui/core";
import { TextTypography } from "../styled";
import axios from "axios";
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector> & {
  id?: any;
};

function PopoverPage(props: Props, ref) {
  const [state, _setState] = useState({
    show: null,
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  const handleClose = () => {
    setState({
      show: null,
    });
  };
  useImperativeHandle(
    ref,
    () => ({
      show: (data) => {
        setState({
          show: data,
        });
      },
      close: () => {
        setState({
          show: null,
        });
      },
    }),
    []
  );
  const open = Boolean(state.show);
  const onDownload = () => {
    // const id = "5f840609602c7c0011cecf68";
    const id = "5f840273602c7c0011cecf65";
    axios.get(`http://localhost:3000/api/order/${id}/download/`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
      },
    });
  };
  return (
    <Popover
      open={open}
      anchorEl={state.show}
      onClose={handleClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <TextTypography>Re-submit</TextTypography>
      <TextTypography onClick={onDownload}>Download order</TextTypography>
    </Popover>
  );
}
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(forwardRef(PopoverPage));
