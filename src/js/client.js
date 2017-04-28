import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, IndexRoute, hashHistory } from "react-router";

import Layout from "./components/Layout";
import UserLayout from "./components/UserLayout.jsx";

import UserStorage from "./services/UserSession.js"

const appElem = document.getElementById('app');
// ReactDOM.render(<Layout/>, app);

var user = UserStorage.getUser();
var view = user ?  <Layout /> : <UserLayout />
ReactDOM.render(view, appElem);
