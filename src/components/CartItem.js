import React from 'react';
import { useDispatch } from "react-redux"

import DeleteIcon from '@mui/icons-material/Delete';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

import { deleteCartItem } from "../redux/actions/dataActions"
import MyButton from "../utils/MyButton"


export default function CartItem(props) {

    const { itemId: { title, price, _id } } = props;

    const dispatch = useDispatch();

    const handleDeleteItem = () => {
        const itemData = {
            itemId: _id,
        };
        dispatch(deleteCartItem(itemData));
    };

    return (
        <>
            <Card variant="outlined">
                <div >
                    <CardContent style={{ display: 'flex', justifyContent: "space-between" }}>
                        <div>
                            <Typography component="h5" variant="h5">
                                {title}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                                Rs.{price}
                            </Typography>
                        </div>

                        <MyButton tip="Delete Item" onClick={handleDeleteItem}>
                            <DeleteIcon style={{ color: "#f44336" }} />
                        </MyButton>

                    </CardContent>
                </div>
            </Card>
            <br />
        </>
    );
}
