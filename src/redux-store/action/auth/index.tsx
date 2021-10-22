import { StoreConstants } from "../../../constants/store";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.AUTH,
      data: data,
    });
  };
}
export default { updateData };

export function auth_login(loggedIn) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.AUTH_LOGIN,
      data: loggedIn,
    });
  };
}
