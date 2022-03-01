import image from "../images/logo.jpg"
import axios from "axios"
import { placeOrder } from "../redux/actions/dataActions"


function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement('script')
        script.src = src
        script.onload = () => {
            resolve(true)
        }
        script.onerror = () => {
            resolve(false)
        }
        document.body.appendChild(script)
    })
}


export const razorpay = async (totalPrice, firstName, lastName, email, mobile, dispatch) => {


    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

    if (!res) {
        alert('Razorpay SDK failed to load. Are you online?')
        return
    }
    const response = await axios.post("https://house-painting-service.herokuapp.com/razorpay", { price: totalPrice })

    const data = response.data;
    const options = {
        key: 'rzp_test_8esi5HFkjW0AdE',
        currency: data.currency,
        amount: data.amount.toString(),
        order_id: data.id,
        name: 'House Painting Service',
        description: 'Your order has been created',
        image: image,
        handler: function (response) {                                      //run after the successfull payment
            alert("Your payment Id: ", response.razorpay_payment_id)
            alert("Your order Id: ", response.razorpay_order_id)
            alert("Your receipt: ", response.razorpay_signature)
            dispatch(placeOrder());
        },
        prefill: {
            name: firstName + ' ' + lastName,
            email: email,
            phone_number: mobile
        }
    }
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
}
