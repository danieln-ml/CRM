import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, IndexRoute, hashHistory } from "react-router";
import App from "./components/App.jsx";

const appElem = document.getElementById('app');
ReactDOM.render(<App />, appElem);
