import React, { useState } from "react";
import { Main, Navigation } from "./styled";
import { TablePagination, IconButton } from "@material-ui/core";
import {
  KeyboardArrowRight,
  KeyboardArrowLeft,
  FirstPage,
  LastPage,
} from "@material-ui/icons";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
const Index = (props) => {
  const {
    count,
    rowsPerPage,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
  } = props;
  const useStyles1 = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      },
    })
  );
  function TablePaginationActions(props) {
    return (
      <Navigation>
        <IconButton disabled={page === 0} aria-label="first page">
          <FirstPage />
        </IconButton>
        <IconButton disabled={page === 0} aria-label="previous page">
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          <LastPage />
        </IconButton>
      </Navigation>
    );
  }

  return (
    <Main>
      <TablePagination
        component="div"
        rowsPerPageOptions={[10, 20, 50, 100]}
        count={count}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Main>
  );
};

export default Index;
