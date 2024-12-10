import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'


const SubscriptionForm = () => {
    const stripe = useStripe()
    const elements = useElements()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    
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

        //send request here
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
