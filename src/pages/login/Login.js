import React from 'react';
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography, TextField, Button } from '@mui/material';

import { loginAction } from '../../redux/actions/authActions'
import useForm from '../../hooks/useForm';
import logo from "../../images/logo.jpg"

export default function Login() {

    const { loading, serverError, errors, signUpSuccess } = useSelector(
        (state) => state.UI
    );
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginHandle = (props) => {
        const userData = {
            email: inputs.email,
            password: inputs.password,
        };
        dispatch(loginAction(userData, navigate));
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(
        {
            email: "",
            password: "",
        },
        loginHandle
    );

    let incorrectCredentialsError = null;
    let verifyEmailError = null;
    if (errors) {
        if (errors.includes("Invalid Credentials"))
            incorrectCredentialsError = errors;
        if (errors.includes("Verify your email")) verifyEmailError = errors;
    }

    return (
        <Grid container
            style={{ marginTop: 25 }}
            justifyContent="center"
            alignItems="center">
            <Grid item sm />
            <Grid item sm style={{ marginBottom: 34 }} container
                direction="column"
                justifyContent="center"
                textAlign="center"

            >
                <img
                    src={logo}
                    alt="hamBurger"
                    style={{ width: "60px", height: "60px", margin: "auto" }}
                />
                <Typography variant="h3" mb={2}>
                    Login
                </Typography>
                <form noValidate onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                    {signUpSuccess && (
                        <Typography variant="body2" sx={{ color: 'success.main' }}>
                            Account registered successfully, please verify your Email before
                            logging-in
                        </Typography>
                    )}
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        onChange={handleInputChange}
                        value={inputs.email}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        onChange={handleInputChange}
                        value={inputs.password}
                        fullWidth
                        defaultValue="Small"
                        size="small"
                    />
                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {"server error, please try again"}
                        </Typography>
                    )}

                    {verifyEmailError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {verifyEmailError}
                        </Typography>
                    )}

                    {incorrectCredentialsError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {incorrectCredentialsError}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                        disabled={loading}
                    >
                        Login
                        {loading && (
                            <CircularProgress size={30} />
                        )}
                    </Button>
                    <br />
                    <small >
                        Don't have an account ? sign up <Link to="/signup">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
}
