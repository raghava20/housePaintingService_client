import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

export default function AuthRoute({ children }) {
    const { authenticated } = useSelector(state => state.auth)
    return authenticated ? children : <Navigate to="/" />
}