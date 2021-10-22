import * as React from "react";
import { connect } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Login from "./login";
import Admin from "./admin/orders";
import RouterWithPaths from "../routes";
import { Routes } from "../constants/routes";
import { useEffect } from "react";

function NotFound() {
  return (
    <>
      <h2>Not found</h2>;
    </>
  );
}

const mapStateToProps = (state: any) => {
  console.log("state:", state);
  console.log("Login:" + state.auth.loggedIn);
  return {
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = {};

const Pages = (props: any) => {
  const routers = [
    {
      path: ["/login"],
      component: Login,
    },
    {
      path: [
        "/",
        "/:function1",
        "/:function1/:id",
        "/:function1/:function2/:id",
      ],
      component: Admin,
    },
  ];

  useEffect(() => {
    console.log("prop: ", props.loggedIn);
  }, [props.loggedIn]);

  return (
    <Router>
      <Switch>
        {/* {!props.loggedIn && <Redirect to={Routes.LOGIN_URL} />} */}

        <Route path="/login" exact component={Login} />
        <Route
          path="/"
          exact
          render={() => {
            if (props.loggedIn) {
              return <Admin />;
            } else {
              return <Redirect to={Routes.LOGIN_URL} />;
              // return <Admin />; //just for don't redirect to login when test
            }
          }}
        />
        {/* <Route/>
        {routers.map((route, key) => {
          if (route.component)
            return (
              <RouterWithPaths
                exact
                key={key}
                path={route.path}
                render={(props: object, auth: string) => {
                  return <route.component {...props} />;
                  // return props.loggedIn == true ? (
                  //   <route.component {...props} />
                  // ) : (
                  //   <Redirect to={Routes.LOGIN_URL} />
                  // );
                }}
              />
            );
          return null;
        })} */}
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Pages);
