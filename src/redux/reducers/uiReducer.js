import { CLEAR_ERRORS, LOADING_UI, SERVER_ERROR, SET_ERROR, SET_ERRORS, SIGNUP_SUCCESS } from "../types"

const initialState = {
    loading: false,
    serverError: false,
    errors: null,
    signUpSuccess: false
}

export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case SET_ERRORS:
            return { ...state, loading: false, errors: payload.errors, serverError: false }
        case SET_ERROR:
            return { ...state, loading: false, errors: payload.message, serverError: false }
        case SERVER_ERROR:
            return { ...state, loading: false, serverError: true, errors: null }
        case CLEAR_ERRORS:
            return { ...state, loading: false, errors: null }
        case LOADING_UI:
            return { ...state, loading: true, serverError: false, signUpSuccess: false }
        case SIGNUP_SUCCESS:
            return { ...state, signUpSuccess: true }
        default: return state;
    }
}