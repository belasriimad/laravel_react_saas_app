import React, { useState } from 'react'
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { axiosRequest, getConfig } from '../../helpers/config'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setChosenPlan } from '../../redux/slices/userSlice'

const SubscriptionForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const { user } = useSelector(state => state)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    //handle subscription
    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) return

        setError(null)
        setLoading(true)
        
        const cardElement = elements.getElement(CardElement)

        // Create a PaymentMethod with the CardElement
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        })

        if (paymentMethodError) {
            setError(paymentMethodError.message)
            setLoading(false)
            return
        }

        try {
            const response = await axiosRequest.post('subscribe', {
                payment_method: paymentMethod.id,
                plan_id: user.chosenPlan.id,
                price_id: user.chosenPlan.price_id, // Replace with your price ID from Stripe
            }, getConfig(user.token))

            dispatch(setChosenPlan(null))
            setLoading(false)
            toast.success(response.data.message)
            navigate('/')
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            {error && <div className='text-danger my-2'> {error} </div>}
            <button className="btn btn-sm btn-dark mt-4" type="submit" disabled={loading || !stripe}>Subscribe</button>
        </form>
    )
}

export default SubscriptionForm
