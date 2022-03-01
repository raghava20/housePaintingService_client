import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// redux
import { useDispatch, useSelector } from "react-redux"
import { getCart, addAddress } from "../../redux/actions/dataActions"

// material ui
import { Grid, Typography, Paper, TextField, Button } from '@mui/material';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

// validation func
import * as yup from "yup"
import { useFormik } from "formik"

// component
import CartItem from '../../components/CartItem';

// helper func
import Spinner from '../../utils/spinner/spinner';
import MyButton from '../../utils/MyButton';
import { razorpay } from '../../utils/razorpay';

export default function Cart() {

    useEffect(() => {
        dispatch(getCart());
    }, []);

    const [step, setStep] = useState(1);
    const [disabled, setDisabled] = useState(true)
    const [formikValues, setFormikValues] = useState([])

    const dispatch = useDispatch()
    const { loading, cart, price } = useSelector(state => state.data)
    const { firstName, lastName, account: { email } } = useSelector(state => state.auth)

    const navigate = useNavigate()

    let taxCharge = 0;
    let cartPresent = Array.isArray(cart) && cart.length > 0;
    let cartItems = cartPresent ? cart.length : 0;

    if (price !== 0) taxCharge = 30;


    const onSubmit = (values) => {
        setDisabled(false)
        setFormikValues(values);

    }
    const handlePlaceOrder = () => {
        const userData = {
            aptName: formikValues.aptName,
            street: formikValues.street,
            locality: formikValues.locality,
            zipCode: formikValues.zipCode,
            phoneNo: formikValues.phoneNo,
        };
        dispatch(addAddress(userData, navigate));
        let totalPrice = price + taxCharge;
        razorpay(totalPrice, firstName, lastName, email, formikValues.phoneNo, dispatch)
    };

    const nextStep = () => {
        setStep(step + 1);
    };

    const prevStep = () => {
        setStep(step - 1);
    };

    const formik = useFormik({
        initialValues: {
            aptName: "",
            street: "",
            locality: "",
            zipCode: "",
            phoneNo: ""
        },
        validationSchema: yup.object({
            aptName: yup.string().required("Please enter flat/apt name"),
            street: yup.string().required("Please enter street!"),
            locality: yup.string().required("Please enter locality!"),
            zipCode: yup.string().max(6).required("Please confirm your zip code!"),
            phoneNo: yup.number().min(10, "Must be 10 characters").required("Please enter you phone no")
        }),
        onSubmit
    })
    return (
        <>
            {loading ?
                <Spinner /> :
                <>
                    <Typography variant="h5">
                        {step === 1 && `Cart (${cartItems} Items)`}
                        {step === 2 && "Delivery Details"}
                    </Typography>
                    {step === 2 && (
                        <MyButton tip="Go Back" onClick={prevStep}>
                            <KeyboardBackspaceIcon />
                        </MyButton>
                    )}
                    <Grid container direction="row" spacing={2}>
                        <Grid item sm={1} />
                        <Grid item sm={7} >
                            {cartPresent && step === 1 &&
                                cart.map((item) => <CartItem  {...item} key={item.itemId._id} />)
                            }
                            {step === 2 && (
                                <form onSubmit={formik.handleSubmit}>
                                    <Typography style={{ marginBottom: 4 }}>
                                        Address:
                                    </Typography>
                                    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                                        <TextField
                                            id="aptName"
                                            name="aptName"
                                            label="Flat/Apartment"
                                            value={formik.values.aptName}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.aptName && formik.errors.aptName ? formik.errors.aptName : ""}
                                            error={formik.touched && formik.errors.aptName ? true : false}
                                            fullwidth
                                            disabled={formik.isSubmitting}
                                        />
                                        <TextField
                                            id="locality"
                                            name="locality"
                                            label="Locality"
                                            value={formik.values.locality}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.locality && formik.errors.locality ? formik.errors.locality : ""}
                                            error={formik.touched && formik.errors.locality ? true : false}
                                            fullwidth
                                            disabled={formik.isSubmitting}
                                        />
                                        <TextField
                                            id="street"
                                            name="street"
                                            label="Street"
                                            value={formik.values.street}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.street && formik.errors.street ? formik.errors.street : ""}
                                            error={formik.touched && formik.errors.street ? true : false}
                                            fullwidth
                                            disabled={formik.isSubmitting}
                                        />
                                        <TextField
                                            id="zipCode"
                                            name="zipCode"
                                            label="ZipCode"
                                            value={formik.values.zipCode}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.zipCode && formik.errors.zipCode ? formik.errors.zipCode : ""}
                                            error={formik.touched && formik.errors.zipCode ? true : false}
                                            fullwidth
                                            disabled={formik.isSubmitting}
                                        />
                                        <TextField
                                            id="phoneNo"
                                            name="phoneNo"
                                            label="Contact No."
                                            value={formik.values.phoneNo}
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                            helperText={formik.touched.phoneNo && formik.errors.phoneNo ? formik.errors.phoneNo : ""}
                                            error={formik.touched && formik.errors.phoneNo ? true : false}
                                            fullwidth
                                            disabled={formik.isSubmitting}
                                        />

                                    </div>
                                    <Button type="submit">Done</Button>
                                </form>
                            )}
                        </Grid>

                        <Grid item sm={3}>
                            <Paper>
                                <div>
                                    <Typography gutterBottom variant="h5" nowarp="true" style={{ textAlign: 'center', marginBottom: 30 }}>
                                        {step === 1 && "Total Amount"}
                                        {step === 2 && "Order Summary"}
                                        <br />

                                    </Typography>
                                    {step === 1 && (
                                        <Typography variant="body2" color="textPrimary" >
                                            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                                <span>Initial amount</span>
                                                <span>Rs. {price}</span>
                                            </div>
                                            <br />
                                            <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                                <span>Tax Charge</span>
                                                <span>Rs. {taxCharge}</span>
                                            </div>
                                            <br />
                                        </Typography>
                                    )}
                                    {step === 2 &&
                                        cart.map(item => {

                                            return (
                                                <Typography
                                                    variant="body2"
                                                    color="textPrimary"
                                                    key={item.itemId._id}
                                                >
                                                    <div style={{ display: 'flex', justifyContent: "space-around" }}>
                                                        <span>{item.itemId.title}</span>
                                                        <span>
                                                            Rs.
                                                            {item.itemId.price}
                                                        </span>
                                                    </div>
                                                    <br />
                                                </Typography>
                                            );
                                        })
                                    }
                                    <hr />
                                    <Typography gutterBottom variant="h5" style={{ textAlign: 'center' }}>
                                        <div >
                                            <span>Grand Total</span>
                                            <span>Rs. {price + taxCharge}</span>
                                        </div>
                                        <br />
                                    </Typography>
                                    {step === 1 && (
                                        <Button
                                            fullWidth
                                            disabled={price === 0}
                                            onClick={nextStep}
                                        >
                                            Proceed to Checkout
                                        </Button>
                                    )}
                                    {step === 2 && (
                                        <Button fullWidth onClick={handlePlaceOrder} disabled={disabled}>
                                            Place Order
                                        </Button>
                                    )}
                                </div>
                            </Paper>
                        </Grid>
                        <Grid item sm={1} />
                    </Grid>

                </>
            }
        </>
    )
}