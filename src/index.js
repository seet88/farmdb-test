import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store/store";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import BrowserStore from "./store/browser-store";
import { ThemeProvider } from "@mui/system";
import { customTheme } from "./style/customTheme";
import { SERVER_IP } from "./API/config";

const client = new ApolloClient({
  uri: SERVER_IP,
  cache: new InMemoryCache({
    addTypename: false,
  }),
});
// window.__APOLLO_CLIENT__ = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={customTheme}>
          <Fragment>
            <App />
            <BrowserStore />
          </Fragment>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
