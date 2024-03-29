import React from "react";
import ReactDOM from "react-dom";
import "index.scss";
import App from "App";
import reportWebVitals from "./reportWebVitals";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from "redux-store/store";
import {createTheme, ThemeProvider} from "@mui/material";
import Colors from "styles/colors.module.scss";

const theme = createTheme(
    {palette: {
      primary: {
        main: Colors.primary,
      },
      secondary: {
        main: Colors.secondary,
      },
      info: {
        main: Colors.info,
      },
      error: {
        main: Colors.error,
      },
    }},
);

ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <App/>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
    document.getElementById("root"),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
