import React, { useState, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
// import { Grid, Button, TextField } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
import { FormTextField, GridHeaderTable } from "../styled";
import Datepicker from "../../../../components/Datepicker";
import { Input, DatePicker, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import Clock from "react-live-clock";
import axios from "axios";
import { StoreConstants } from "../../../../constants/store";
import { search } from "../../../../redux-store/action/orders";
import { Popover, Button } from "antd";
import moment from "moment";

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const content = (
  <div>
    <p>ORDER ID</p>
    <p>TRACK NUMBER</p>
    <p>CAR REGIS NUMBER</p>
  </div>
);

const { Search } = Input;
const { RangePicker } = DatePicker;

// const onSearch = value => console.log(value);

// Options for select
// const top100Films = [
//   { title: "The Shawshank Redemption", year: 1994 },
//   { title: "The Godfather", year: 1972 },
//   { title: "The Godfather: Part II", year: 1974 },
//   { title: "The Dark Knight", year: 2008 },
//   { title: "12 Angry Men", year: 1957 },
// ];
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.auth.loggedIn,
    textSearch: state.orders.valueData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSearch: (text) => {
      dispatch(search(text));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: "center",
//       color: theme.palette.text.secondary,
//     },
//   })
// );

function AdminPage(props: Props) {
  const [dataOrders, setDataOrders] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<number>();
  const [state, _setState] = useState({
    // rowsPerPage: 10,
    limit_: 10,
    page: 0,
    text_search: props.textSearch,
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  // const classes = useStyles();

  const onSearch = (text_search) => {
    if (props.onSearch) props.onSearch(text_search);
    console.log("text search:", text_search);
    const fetchData = async () => {
      const result = await axios({
        url: "http://localhost:3000/api/order",
        method: "GET",
        params: { text_search: text_search, page: 1, limit_: 10 },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
        },
      });
      console.log(result.data.orders);

      setTotalResults(result.data.totalResults);
      setDataOrders(result.data.orders);
    };
    fetchData();
  };

  return (
    //   <div className={classes.root}>
    <div>
      <Clock
        format={"dddd, MMMM Do, YYYY, h:mm:ss A"}
        ticking={true}
        interval={1000}
      />
      <br />
      <div>
        <br />
        <Search
          placeholder="INPUT YOUR TEXT SEARCH"
          enterButton="Search"
          size="large"
          suffix={suffix}
          onSearch={onSearch}
          allowClear={true}
        />
        <Popover content={content} title="YOU CAN SEARCH BY">
          <Button type="primary">Hover me for more information</Button>
        </Popover>
      </div>

      {/* <Grid container spacing={3}>
        <GridHeaderTable width={118} item md={6} xs={12}>
          <span>Registration No.</span>
          <FormTextField variant="outlined" placeholder="Registration No." />
        </GridHeaderTable>
        <GridHeaderTable
          width={false}
          item
          md={6}
          xs={12}
          container
          direction="row"
          justify="flex-end"
        >
          <span>Order Date</span>
          <Datepicker
            placeholder="Order Date"
            value={new Date()}
            onChange={(event) => {}}
            variant="outlined"
          />
        </GridHeaderTable>
        <GridHeaderTable width={118} item md={6} xs={12}>
          <span>Status</span>
          <Autocomplete
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" placeholder="status" />
            )}
          />
        </GridHeaderTable>
        <GridHeaderTable
          width={false}
          item
          md={6}
          xs={12}
          container
          direction="row"
          justify="flex-end"
        >
          <span>Clear all</span>
          <Button variant="contained" color="primary">
            Search
          </Button>
        </GridHeaderTable>
      </Grid> */}
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
