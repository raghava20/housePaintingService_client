import {
    LOADING_DATA,
    SERVER_ERROR,
    CLEAR_ERRORS,
    ADD_CART_SUCCESS,
    ADD_CART_FAIL,
    SET_CART,
    DELETE_ITEM_CART,
    SET_ERRORS,
    SET_ORDERS,
    ADD_RAZORPAY,
} from "../types";
import API_URL from "../../utils/API_URL";
import { getUserData } from "./authActions";

// add item to the cart
export const addToCart = (itemData) => (dispatch) => {
    API_URL
        .post("/cart", itemData)
        .then((res) => {
            dispatch({
                type: ADD_CART_SUCCESS,
                payload: itemData.itemId,
            });
            dispatch(getCart());
        })
        .catch((err) => {
            dispatch({
                type: ADD_CART_FAIL,
            });
        });
};

// get items from the cart
export const getCart = () => (dispatch) => {
    API_URL
        .get("/cart")
        .then(res => {
            dispatch({
                type: SET_CART,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: SET_CART,
                payload: [],
            });
        });
};

// delete item in the cart
export const deleteCartItem = (itemData) => (dispatch) => {
    console.log(itemData);
    API_URL.delete("/delete-cart-item", { data: itemData }).then((res) => {
        dispatch({
            type: DELETE_ITEM_CART,
        });
        dispatch(getCart());
        dispatch(getUserData())
    })
        .catch((err) => {
            console.log(err.response);
        });
};

// add address to the user details
export const addAddress = (userData) => (dispatch) => {
    API_URL
        .post("/user/address", userData)
        .then((res) => {
            dispatch(getUserData());
            dispatch({ type: CLEAR_ERRORS });
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

// book the order
export const placeOrder = (navigate) => (dispatch) => {
    API_URL
        .post("/order")
        .then((res) => {
            navigate("/orders");
            dispatch(getOrders());
        })
        .catch((err) => {
            console.log(err.response);
        });
};

// get all the booked orders
export const getOrders = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    API_URL
        .get("/orders")
        .then((res) => {
            dispatch({
                type: SET_ORDERS,
                payload: res.data.order,
            });
        })
        .catch((err) => {
            console.log(err.response);
        });
};
