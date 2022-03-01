import React from 'react';
import { Link, useNavigate } from "react-router-dom"

// redux
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from '../../redux/actions/authActions'

// material ui
import CircularProgress from '@mui/material/CircularProgress';
import { Grid, Typography, TextField, Button } from '@mui/material';

// custom hook
import useForm from '../../hooks/useForm';
import logo from "../../images/logo.jpg"

export default function Signup() {

    const { loading, serverError, errors } = useSelector((state) => state.UI);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const signupHandle = (props) => {
        const newUserData = {
            email: inputs.email,
            firstName: inputs.firstName,
            lastName: inputs.lastName,
            password: inputs.password,
            confirmPassword: inputs.confirmPassword,
        };
        dispatch(signupUser(newUserData, navigate));
    };

    const { inputs, handleInputChange, handleSubmit } = useForm(
        {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        signupHandle
    );

    let emailError = null;
    let passwordError = null;
    let confirmPasswordError = null;
    let firstNameEmptyError = null;
    let lastNameEmptyError = null;

    // checking backend errors
    if (errors) {
        if (typeof errors !== "string") {
            for (let i = 0; i < errors.length; i++) {
                if (errors[i].msg.includes("First Name"))
                    firstNameEmptyError = errors[i].msg;
                if (errors[i].msg.includes("Last Name"))
                    lastNameEmptyError = errors[i].msg;
                if (errors[i].msg.includes("valid email")) emailError = errors[i].msg;
                if (errors[i].msg.includes("Email already"))
                    emailError = errors[i].msg;
                if (errors[i].msg.includes("Password should be at 6 characters long"))
                    passwordError = errors[i].msg;
                if (errors[i].msg.includes("Passwords have to"))
                    confirmPasswordError = errors[i].msg;
            }
        }
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
                textAlign="center">
                <img src={logo} alt="logo" style={{ width: "60px", height: "60px", margin: "auto" }} />
                <Typography variant="h3" mb={2}>
                    Sign up
                </Typography>
                <form noValidate onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                    <TextField
                        id="firstName"
                        name="firstName"
                        label="FirstName"
                        onChange={handleInputChange}
                        value={inputs.firstName}
                        // className={classes.textField}
                        helperText={firstNameEmptyError}
                        error={firstNameEmptyError ? true : false}
                        fullWidth
                        required
                        defaultValue="Small"
                        size="small"
                    />
                    <TextField
                        id="lastName"
                        name="lastName"
                        label="LastName"
                        onChange={handleInputChange}
                        value={inputs.lastName}
                        // className={classes.textField}
                        helperText={lastNameEmptyError}
                        error={lastNameEmptyError ? true : false}
                        fullWidth
                        required
                        defaultValue="Small"
                        size="small"
                    />
                    <TextField
                        id="email"
                        name="email"
                        label="Email"
                        onChange={handleInputChange}
                        value={inputs.email}
                        // className={classes.textField}
                        fullWidth
                        helperText={emailError}
                        error={emailError ? true : false}
                        required
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
                        // className={classes.textField}
                        helperText={passwordError}
                        error={passwordError ? true : false}
                        fullWidth
                        required
                        defaultValue="Small"
                        size="small"
                    />
                    <TextField
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        onChange={handleInputChange}
                        value={inputs.confirmPassword}
                        // className={classes.textField}
                        helperText={passwordError ? passwordError : confirmPasswordError}
                        error={passwordError ? true : confirmPasswordError ? true : false}
                        fullWidth
                        required
                        defaultValue="Small"
                        size="small"
                    />

                    {serverError && (
                        <Typography variant="body2" sx={{ color: 'error.main' }}>
                            {"server error, please try again"}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        // className={classes.button}
                        disabled={loading}
                    >
                        Sign-up
                        {loading && (
                            <CircularProgress size={30} />
                        )}
                    </Button>
                    <br />
                    <small>
                        Already have an account ? Login <Link to="/login">here</Link>
                    </small>
                </form>
            </Grid>
            <Grid item sm />
        </Grid>
    );
}
