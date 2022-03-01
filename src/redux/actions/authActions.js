import {
    SIGNUP_SUCCESS,
    LOADING_UI,
    SET_ERRORS,
    SERVER_ERROR,
    CLEAR_ERRORS,
    LOADING_USER,
    SET_USER,
    SET_ERROR,
    SET_UNAUTHENTICATED
} from "../types";


import API_URL from "../../utils/API_URL";


export const signupUser = (newUserData, navigate) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    API_URL
        .post("/signup", newUserData)
        .then((res) => {
            dispatch({
                type: SIGNUP_SUCCESS,
            });
            dispatch({ type: CLEAR_ERRORS });
            navigate("/login");
        })
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data,
                });
            } else {
                dispatch({
                    type: SERVER_ERROR,
                });
            }
        });
};

export const loginAction = (userData, navigate) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    API_URL
        .post("/login", userData)
        .then((res) => {
            const token = res.data.token;
            localStorage.setItem("token", token);
            API_URL.defaults.headers.common["x-auth-token"] = token;
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
            navigate("/");
        })
        .catch((err) => {
            if (err.response) {
                dispatch({
                    type: SET_ERROR,
                    payload: err.response.data,
                });
            } else {
                dispatch({
                    type: SERVER_ERROR,
                });
            }
        });
};


export const getUserData = () => (dispatch) => {
    dispatch({ type: LOADING_USER });
    API_URL
        .get("/user")
        .then((res) => {
            dispatch({
                type: SET_USER,
                payload: res.data.result,
            });
        })
        .catch((err) => console.log(err));
};

export const logoutAction = (navigate) => (dispatch) => {
    localStorage.removeItem("jwt");
    delete API_URL.defaults.headers.common["x-auth-token"];
    dispatch({ type: SET_UNAUTHENTICATED });
    if (navigate) navigate("/login");
};
