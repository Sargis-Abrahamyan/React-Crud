import React from "react";
import { createRoot } from "react-dom/client";

import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./Components/app/App";
import "./index.scss";
import store from "./redux/Index";

const root = createRoot(document.getElementById("root"));
root.render(

    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

);
