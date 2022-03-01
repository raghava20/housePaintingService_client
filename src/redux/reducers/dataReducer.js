import { ADD_CART_FAIL, ADD_CART_SUCCESS, ADD_RAZORPAY, DELETE_ITEM_CART, LOADING_DATA, SET_CART, SET_ORDERS, } from "../types";

const initialState = {
    cart: [],
    price: "",
    loading: false,
    addCartSuccess: null,
    deleteSuccessItem: null,
    orders: []
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case LOADING_DATA:
            return { ...state, loading: true }
        case ADD_CART_SUCCESS:
            return { ...state, addCartSuccess: true }
        case ADD_CART_FAIL:
            return { ...state, addCartSuccess: false }
        case SET_ORDERS:
            return { ...state, orders: payload, loading: false }
        case DELETE_ITEM_CART:
            return { ...state, deleteSuccessItem: true }
        case SET_CART:
            return { ...state, loading: false, cart: payload.cart, price: payload.totalPrice }
        case ADD_RAZORPAY:
            return { ...state, loading: false, payments: payload }
        default: return state;
    }
}