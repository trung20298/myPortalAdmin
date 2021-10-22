import * as React from "react";
import { useEffect } from "react";
// import { withRouter } from 'react-router-dom'
import { Messages } from "../../constants";
import AppHeader from "../../components/appHeader";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import { Button, FormGroup } from "@material-ui/core";
// import { Main, LabelError, FormTextField } from "./styled";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import "./index.css";
import Pages from "../../pages/index";
import Admin from "../admin/orders";
import { Routes } from "../../constants/routes";
import { Redirect } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { auth_login } from "../../redux-store/action/auth";
import axios from "axios";

const mapStateToProps = (state: any) => {
  console.log("state logged in:", state.auth.loggedIn);
  return {
    stateLoggedIn: state.auth.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    increment: (loggedIn) => {
      console.log("here");
      dispatch(auth_login(loggedIn));
    },
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
const Index = (props: Props) => {
  // const useStyles = makeStyles((theme: Theme) =>
  //   createStyles({
  //     root: {
  //       "& > *": {
  //         margin: theme.spacing(1),
  //         width: "100%",
  //       },
  //     },
  //   })
  // );
  // const classes = useStyles();
  // return (
  //   <>
  //     <AppHeader />
  //     <Main>
  //       <LabelError>{Messages.login.userPasswordInvalid}</LabelError>
  //       <FormGroup className={classes.root}>
  //         <FormTextField variant="outlined" placeholder="Username" />
  //         <FormTextField variant="outlined" placeholder="Password" />
  //         <Button variant="contained" color="primary">
  //           Login
  //         </Button>
  //       </FormGroup>
  //     </Main>
  //   </>
  // );

  let history = useHistory();

  const [errorText, setErrorText] = React.useState("");

  useEffect(() => {
    if (props.stateLoggedIn === true) {
      console.log("Here i am");
      history.push("/");
    }
  }, [props.stateLoggedIn]);

  const onFinish: any = async (values) => {
    console.log("Received values of form: ", values);

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    // var urlencoded = new URLSearchParams();
    // urlencoded.append("email", values.email);
    // urlencoded.append("password", values.password);

    const userInfo = {
      email: values.email,
      password: values.password,
    };

    // interface RequestOptions {
    //   method: "POST";
    //   headers: any;
    //   body: any;
    //   redirect: any;
    // }

    // var requestOptions: RequestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: urlencoded,
    //   redirect: "follow",
    // };
    try {
      const data = await axios.post(
        "http://localhost:3000/api/auth/login",
        userInfo
      );
      props.increment(true);
      console.log({ data });
    } catch (error) {
      console.log(error.response);
      const message = error.response.data.message;

      setErrorText(message);
      setTimeout(() => {
        setErrorText("");
      }, 3000);
    }

    // fetch("http://localhost:3000/api/auth/login", requestOptions)
    //   .then(async (response) => {
    //     console.log(response);
    //     if (!response.ok) {
    //       const res = await response.json();
    //       const message = "Invalid email or password";
    //       setErrorText(message);
    //     }
    //     return response.json();
    //   })
    //   .then((result) => {
    //     console.log("result:", result);

    //     props.increment(true);
    //   })
    //   .catch((error) => {
    //     console.log("error:", error);
    //   });
  };

  return (
    <div>
      <AppHeader />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <div>{errorText && <h2 id="error">{errorText}</h2>}</div>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="#">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="#">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
