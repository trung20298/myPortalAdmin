import * as React from "react";
import { connect, ConnectedProps, useDispatch, useSelector } from "react-redux";
import { Main, Logo, ButtonHeader } from "./styled";
import { icon } from "../../resources";
import { useHistory } from "react-router-dom";
import { auth_login } from "../../redux-store/action/auth";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.auth.loggedIn,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: (isLog) => dispatch(auth_login(isLog)),
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

const Index = (props: Props) => {
  let history = useHistory();

  let logout = () => {
    props.logout(false);
    history.push("/login");

    // window.location.reload();
  };

  return (
    <Main>
      {props.loggedIn && (
        <ButtonHeader onClick={logout} variant="contained" color="primary">
          Logout
        </ButtonHeader>
      )}
      <Logo src={icon.logo} />
    </Main>
  );
};

export default connector(Index);
