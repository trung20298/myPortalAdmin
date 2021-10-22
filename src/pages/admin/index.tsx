import React from "react";
import { connect, ConnectedProps } from "react-redux";
import RouterWithPaths from "../../routes";
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
function AdminPage(props: Props) {
  if (!props.loggedIn || !props.loggedIn) {
    window.location.href = "/login";
    return null;
  }
  const routers = [
    {
      path: "/",
      component: React.lazy(() => import("./orders")),
    },
  ];
  return (
    <>
      {routers.map((route, key) => {
        if (route.component)
          return (
            <RouterWithPaths
              exact
              key={key}
              path={route.path}
              render={(props: object, auth: string) => {
                return <route.component {...props} />;
              }}
            />
          );
        return null;
      })}
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPage);
