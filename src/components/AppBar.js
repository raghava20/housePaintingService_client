import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom"

// redux 
import { logoutAction } from "../redux/actions/authActions"

// mui 
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Box } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';

export default function AppBarLayout() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { authenticated, firstName, lastName, address } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(logoutAction(navigate))
    }
    return (
        <AppBar position="static">
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
            }} >
                <Link to="/" style={{ textDecoration: "none" }}>
                    <Typography variant="h6" nowarp="true" color="primary" sx={{ fontSize: { xs: 18, sm: 24 } }}>
                        House Painting
                    </Typography>
                </Link>
                {authenticated ? (
                    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", flexWrap: "wrap", padding: 2 }}>
                        <Typography sx={{ mr: 1, fontSize: { xs: 12, sm: 14 } }}>
                            Hello, {firstName} {lastName}
                        </Typography >
                        <Link to="/orders" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="secondary" sx={{ mr: 1, fontSize: { xs: 12, sm: 14 } }}>Orders</Button>
                        </Link>

                        <Link to={{ pathname: "/cart", state: { address: address } }} style={{ textDecoration: "none" }}>

                            <Button variant="contained" color="secondary" sx={{ mr: 1, fontSize: { xs: 12, sm: 14 } }}>Cart</Button>
                        </Link>
                        <Tooltip title="Logout">
                            <Button onClick={handleLogout} variant="contained" color="secondary" sx={{ mr: 1, fontSize: { xs: 12, sm: 14 } }}><LogoutIcon /></Button>
                        </Tooltip>
                    </div>
                ) : (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <Button variant="contained" color="secondary" sx={{ mr: 1, fontSize: { xs: 12, sm: 14 } }} >Login</Button>
                        </Link>
                        <Link to="/signup" style={{ textDecoration: "none" }} >
                            <Button variant="contained" color="secondary" sx={{ fontSize: { xs: 12, sm: 14 } }}>
                                SignUp
                            </Button>
                        </Link>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    )

}