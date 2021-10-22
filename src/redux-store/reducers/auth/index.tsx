import { StoreConstants } from "../../../constants/store";

const initialState = {
  loggedIn: false,
};

// const reducer = (state = {}, action) => {
//   let newState = { ...state };
//   switch (action.type) {
//     case StoreConstants.AUTH:
//       newState = { ...state, ...(action.data || {}) };
//       return newState;
//     default:
//       return state;
//   }
// };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case StoreConstants.AUTH_LOGIN:
      return {
        ...state,
        loggedIn: action.data,
      };
    default:
      return state;
  }
};

// const reducer = (state = initialState, action) => {
//   if (action.type === StoreConstants.AUTH_LOGIN) {
//     return Object.assign({}, state, {
//       loggedIn: state.loggedIn.concat(action.data),
//       // loggedIn: true,
//     });
//   }
//   return state;
// };

export default reducer;
