import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { getOrders } from "../../redux/actions/dataActions"
import { Grid, Typography } from '@mui/material';
import OrderCard from "../../components/OrderCard"

const Orders = () => {
    const dispatch = useDispatch();
    const { orders } = useSelector((state) => state.data);

    useEffect(() => {
        dispatch(getOrders());
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <Typography variant="h5">
                Order History
            </Typography>
            <Grid item container direction="row">
                <Grid item xs={12} sm={1} />
                <Grid item xs={12} sm={10}>
                    <Grid container spacing={2}>
                        {orders ? (
                            orders.length > 0 ? (
                                orders.map((order) => {
                                    return <Grid item xs={12} sm={4} key={order._id}>
                                        <OrderCard order={order} />
                                    </Grid>
                                })
                            ) : (
                                <p >No Orders present.</p>
                            )
                        ) : null}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={1} />
            </Grid>
        </>
    );
};

export default Orders;