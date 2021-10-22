import { StoreConstants } from "../../../constants/store";
// import axios from "axios";

function updateData(data) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.GET_ORDER,
      data: data,
    });
  };
}

export default { updateData };

export function search(text_search) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.SEARCH,
      value: text_search,
    });
  };
}

export function fromDate(from_date) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.FROM_DATE,
      value: from_date,
    });
  };
}

export function toDate(to_date) {
  return (dispatch) => {
    dispatch({
      type: StoreConstants.TO_DATE,
      value: to_date,
    });
  };
}
