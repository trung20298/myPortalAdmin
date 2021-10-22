import { StoreConstants } from "../../../constants/store";

// const reducer = (state = {}, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case StoreConstants.GET_ORDER:
//       // console.log("get order:", action);
//       newState = { ...state, ...(action.data || {}) };
//       return newState;
//     case StoreConstants.SEARCH:
//       console.log("action search:", action);
//       newState = { ...state, ...(action.value || {}) };
//       console.log("newState:", newState);
//       return newState;
//     default:
//       return state;
//   }
// };
// export default reducer;

const initialState = {
  data: [],
  valueData: [],
  from_date: [],
  to_date: [],
};

function reducer(state = initialState, action) {
  if (action.type === StoreConstants.GET_ORDER) {
    return Object.assign({}, state, {
      data: state.data.concat(action.data),
    });
  }
  if (action.type === StoreConstants.SEARCH) {
    console.log("action get search", action);
    return Object.assign({}, state, {
      valueData: state.valueData.concat(action.value),
    });
  }
  if (action.type === StoreConstants.FROM_DATE) {
    console.log("action from date", action);
    return Object.assign({}, state, {
      from_date: state.from_date.concat(action.value),
    });
  }
  if (action.type === StoreConstants.TO_DATE) {
    console.log("action gto date", action);
    return Object.assign({}, state, {
      to_date: state.to_date.concat(action.value),
    });
  }
  return state;
}

export default reducer;
