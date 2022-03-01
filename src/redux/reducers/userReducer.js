import { SET_USER, LOADING_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED } from "../types"

const initialState = {
    authenticated: false,
    loading: false,
    account: {},
    name: "",
    address: {},
    payment: [],
    costForOne: "",
    cart: {},
    _id: "",
    firstName: "",
    lastName: "",
}

// eslint-disable-next-line
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_USER:
            return { ...payload, authenticated: true, loading: false }
        case SET_AUTHENTICATED:
            return { ...state, authenticated: true }
        case SET_UNAUTHENTICATED:
            return initialState
        case LOADING_USER:
            return { ...state, loading: true }
        default: return state;
    }
}