import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { Main } from "./styled";
import AppHeader from "../../../components/appHeader";
import TableOrders from "./table";
import HeaderSearch from "./headerSearch";
const mapStateToProps = (state: any) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = {};
const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;
function OrdersPage(props: Props) {
  return (
    <>
      <AppHeader />
      <Main>
        <HeaderSearch />
        <TableOrders />
      </Main>
    </>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(OrdersPage);
