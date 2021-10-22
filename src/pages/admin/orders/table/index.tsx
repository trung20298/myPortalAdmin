import React, { useState, useRef, useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
} from "@material-ui/core";
import ModalPopover from "../modalPopover";
import { TableContainerCustome } from "../styled";
import axios from "axios";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Pagination } from "antd";
import PopupAntd from "../modalPopover/PopupAnt";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { fromDate, toDate } from "../../../../redux-store/action/orders";

const { RangePicker } = DatePicker;

const mapStateToProps = (state: any) => {
  console.log("loggedIn in table:", state.auth.loggedIn);
  console.log("from_date: ", state.orders.from_date);
  console.log("to_date: ", state.orders.to_date);
  console.log("state:", state);
  return {
    loggedIn: state.auth.loggedIn,
    textSearch: state.orders.valueData,
    from_date: state.orders.from_date,
    to_date: state.orders.to_date,
  };
};

// const mapDispatchToProps = {};

const mapDispatchToProps = (dispatch) => {
  return {
    fromDate: (from_date) => {
      dispatch(fromDate(from_date));
    },
    toDate: (to_date) => {
      dispatch(toDate(to_date));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
function AdminPage(props: Props) {
  const [state, _setState] = useState({
    limit_: 10, //Row per page
    page: 1,
    text_search: props.textSearch,
  });
  const setState = (newState) => {
    _setState((state) => {
      return { ...state, ...newState };
    });
  };
  // const setState = (valueData) => {
  //   _setState((state) => {
  //     return { ...state, ...valueData };
  //   });
  // };

  const [dataOrders, setDataOrders] = useState<any[]>([]);
  const [totalResults, setTotalResults] = useState<number>();

  //Kiem tra lai textSearch da dung voi text trong store hay chua
  useEffect(() => {
    console.log("text for check:", props.textSearch);

    const fetchData = async () => {
      const result = await axios({
        url: "http://localhost:3000/api/order",
        method: "GET",
        params: {
          page: 1,
          limit_: 10,
          text_search: props.textSearch[props.textSearch.length - 1],
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
        },
      });
      console.log("result: ", result.data.orders);

      setTotalResults(result.data.totalResults);
      setDataOrders(result.data.orders);
    };
    fetchData();
  }, [props.textSearch]);
  // });

  console.log(dataOrders);

  const modalPopoverRef = useRef<any>(null);
  const handleClick = (e) => {
    if (modalPopoverRef.current) {
      modalPopoverRef.current.show(e.currentTarget);
    }
  };
  // const handleChangePage = (event: unknown, page: number) => {
  //   setState({
  //     page,
  //   });
  // };

  function onChangeDate(dates: any) {
    console.log("Date: ", dates);

    // if (props.fromDate) props.fromDate(dates[0].toISOString());
    // if (props.toDate) props.toDate(dates[1].toISOString());
    if (dates === null) {
      const fetchData = async () => {
        const result = await axios({
          url: "http://localhost:3000/api/order",
          method: "GET",
          params: {
            page: 1,
            limit_: 10,
            text_search: props.textSearch[props.textSearch.length - 1],
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
          },
        });
        console.log("result: ", result.data.orders);

        setTotalResults(result.data.totalResults);
        setDataOrders(result.data.orders);
      };
      fetchData();
    } else {
      console.log("From: ", dates[0], ", to: ", dates[1]);
      console.log(
        "From: " + dates[0].toISOString(),
        ", to: " + dates[1].toISOString()
      );
      if (props.fromDate) props.fromDate(dates[0].toISOString());
      if (props.toDate) props.toDate(dates[1].toISOString());
      const fetchData = async () => {
        const result = await axios({
          url: "http://localhost:3000/api/order/",
          method: "GET",
          params: {
            page: 1,
            limit_: 10,
            from_date: dates[0].toISOString(),
            to_date: dates[1].toISOString(),
            text_search: props.textSearch[props.textSearch.length - 1],
          },
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
          },
        });
        console.log("result by date: ", result.data);

        setTotalResults(result.data.totalResults);

        setDataOrders(result.data.orders);
      };
      fetchData();
    }
  }

  function onChange(page, limit_) {
    console.log("Page: ", page);
    console.log("Limit:", limit_);
    const fetchDataOnChange = async () => {
      const resultOnChange = await axios({
        url: "http://localhost:3000/api/order",
        method: "GET",
        params: {
          page: page,
          limit_: limit_,
          from_date: props.from_date[props.from_date.length - 1],
          to_date: props.to_date[props.to_date.length - 1],
          text_search: props.textSearch[props.textSearch.length - 1],
        },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwMWJiNTkxOTBmMTg2MjI3NDViZTgxNiIsImVtYWlsIjoidHJ1bmdAam1hbmdvMzYwLmNvbSIsImZpcnN0TmFtZSI6IlRydW5nIiwibGFzdE5hbWUiOiJOZ28iLCJpYXQiOjE2MjUwMzkzMTIsImV4cCI6MzI1NTI2MjYyNH0.R4XgQoo2V6XOYYbjXURPWFdNG3frcccZPbKqSGAc9aQ",
        },
      });

      console.log("text_search in on change:", state.text_search);
      console.log(resultOnChange);
      setDataOrders(resultOnChange.data.orders);
      setTotalResults(resultOnChange.data.totalResults);
    };
    fetchDataOnChange();
  }

  // const handleChangeRows = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setState({
  //     page: 1,
  //     // rowsPerPage: parseInt(event.target.value, 10),
  //     limit_: parseInt(event.target.value, 10),
  //   });
  // };

  return (
    <>
      <br />
      <Space direction="vertical" size={12}>
        <RangePicker
          ranges={{
            Today: [moment(), moment()],
            "This Month": [moment().startOf("month"), moment().endOf("month")],
          }}
          onChange={onChangeDate}
          allowClear={true}
        />
      </Space>
      <br />
      <TableContainerCustome>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Order ID</TableCell>
              <TableCell align="center">TRACK NUMBER</TableCell>
              <TableCell align="center">CAR REGIS NUMBER</TableCell>
              <TableCell align="center">EMAIL</TableCell>
              <TableCell align="center">STATE NAME</TableCell>
              <TableCell align="center">CITY NAME</TableCell>
              <TableCell align="center">PAID</TableCell>
              <TableCell align="center">DATE CREATE</TableCell>
              <TableCell align="center">ACTION</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataOrders.map((item, index) => {
              return (
                <TableRow hover key={item.order_id}>
                  <TableCell align="center">{item.order_id}</TableCell>
                  <TableCell align="center">{item.track_number}</TableCell>
                  <TableCell align="center">{item.car_regis_number}</TableCell>
                  <TableCell align="center">{item.email}</TableCell>
                  <TableCell align="center">{item.state_name}</TableCell>
                  <TableCell align="center">{item.city_name}</TableCell>
                  <TableCell align="center">{`${item.paid}`}</TableCell>
                  <TableCell align="center">{item.date_created}</TableCell>
                  <TableCell align="center">
                    {/* <span
                      onClick={handleClick}
                      style={{ cursor: "pointer", color: "#1f308e" }}
                    >
                      View detail
                    </span> */}
                    <PopupAntd id={item._id} order_id={item.order_id} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainerCustome>
      {/* <Pagination
        count={totalResults}
        rowsPerPage={state.limit_ || 10}
        page={state.page || 0}
        onChangePage={handleChangePage}
        handleChangeRows={handleChangeRows}
      /> */}
      <Pagination
        defaultCurrent={1}
        total={totalResults}
        showQuickJumper={true}
        // showTotal={(total, range) =>
        //   `${range[0]}-${range[1]} of ${total} items`
        // }
        showTotal={(total) => `Total ${total} items`}
        defaultPageSize={10}
        onChange={onChange}
      />
      {/* <ModalPopover ref={modalPopoverRef} /> */}
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
