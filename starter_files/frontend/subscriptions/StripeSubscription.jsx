import React from 'react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import SubscriptionForm from './SubscriptionForm'

const stripePromise = loadStripe('YOUR STRIPE PUBLISHABLE KEY')

const SubscriptionPage = () => {
    return (
        <Elements stripe={stripePromise}>
            <SubscriptionForm />
        </Elements>
    )
}

export default SubscriptionPage
