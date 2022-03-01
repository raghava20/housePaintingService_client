import { Button, Card, CardContent, Typography } from '@mui/material'
import React from 'react'

export default function OrderCard({ order }) {
    const { user: { address }, items, status, date } = order
    return (
        <Card variant="outlined">
            <div >
                <CardContent style={{ display: 'flex', justifyContent: "space-between" }}>
                    <div>
                        <Typography component="h4" variant="h4">Status: {status}</Typography>
                        <Typography component="h5" variant="h5">
                            {items.map(item => <div>{item.title}</div>)}
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Rs.{items.map(item => <div>{item.price}</div>)}
                        </Typography>
                        <Typography variant="subtitle2" color="text">
                            Booked Address: {address.aptName + address.street + address.locality + address.zip + address.phoneNo}
                            Date:{date}
                        </Typography>
                        <Button variant="outlined" sx={{ color: 'error.main' }}>Cancel</Button>
                    </div>
                </CardContent>
            </div>
        </Card>
    )
}
