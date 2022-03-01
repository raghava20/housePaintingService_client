import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import { Provider } from "react-redux"
import store from "./redux/store"

import { createTheme, ThemeProvider } from '@mui/material/styles';
import jwtDecode from "jwt-decode";

import AuthRoute from "./utils/route"
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";

import { getUserData, logoutAction } from "./redux/actions/authActions"
import { SET_AUTHENTICATED } from "./redux/types"
import API_URL from "./utils/API_URL"
import Dashboard from "./pages/dashboard/Dashboard";
import PageNotFound from "./pages/pagenotfound/PageNotFound";
import Cart from "./pages/cart/Cart";
import Orders from "./pages/orders/Orders";
import AppBarLayout from "./components/AppBar";

const theme = createTheme(
  {
    palette: {
      primary: {
        main: '#ab47bc',
        light: '#f759dd',
        dark: '#ba00ae',
        contrastText: '#000',
      },
      secondary: {
        main: '#ba68c8',
        light: '#f759dd',
        dark: '#ba00ae',
        contrastText: '#000',
      },
    },
  }

);

const token = localStorage.getItem("token")
if (token) {
  const decodedToken = jwtDecode(token)
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutAction())
    window.location.href = "/login"
  }
  else {
    store.dispatch({ type: SET_AUTHENTICATED })
    API_URL.defaults.headers.common["x-auth-token"] = token;
    store.dispatch(getUserData())
  }
}



function App() {

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <AppBarLayout />
          <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<Signup />}></Route>

            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
