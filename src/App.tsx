import * as React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./redux-store/reducers";
import Containers from "./pages";
import { composeWithDevTools } from "redux-devtools-extension";

function App() {
  const store = createStore(
    reducers,
    {},
    composeWithDevTools(compose(applyMiddleware(thunk)))
  );
  return (
    <div className="App">
      <Provider store={store}>
        <Containers />
      </Provider>
    </div>
  );
}

export default App;
