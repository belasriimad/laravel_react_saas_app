import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import SubscriptionForm from './SubscriptionForm'

const stripePromise = loadStripe('pk_test_51C19VNGin0JfRTbQRUeiPNReF1ABN7BlFn3pedliW25YQ07YsxOLZTYev0I0753jOzQJIaLRR1qx82gj9jfvRJVI00qVAzVB8R')

const SubscriptionPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <SubscriptionForm />
        </Elements>
    )
}

export default SubscriptionPage
