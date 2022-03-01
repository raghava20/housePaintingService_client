import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

import { useDispatch } from "react-redux";
import { addToCart, deleteCartItem } from '../redux/actions/dataActions';

export default function Items({ existItems, item }) {


    const [changeBtn, setChangeBtn] = useState(false)
    const dispatch = useDispatch()

    const handleAddCart = (id) => {
        const itemData = {
            itemId: id,
        };
        dispatch(addToCart(itemData));
        setChangeBtn(true)
    };
    const handleRemoveCart = (id) => {
        const itemData = {
            itemId: id
        }
        dispatch(deleteCartItem(itemData));
        setChangeBtn(false)
    }
    return (
        <Card sx={{ width: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ₹ {item.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {changeBtn || existItems.find(parent => parent.itemId === item.id) ?
                    <Button size="small" sx={{ color: 'error.main' }} onClick={(e) => handleRemoveCart(item.id)}>
                        Remove from Cart
                    </Button> :
                    <Button size="small" color="primary" onClick={(e) => handleAddCart(item.id)}>
                        Add to Cart
                    </Button>}
            </CardActions>
        </Card>
    )
}