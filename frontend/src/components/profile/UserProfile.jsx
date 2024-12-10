import React, { useEffect } from 'react'
import CardWrapper from '../layouts/elements/cards/CardWrapper'
import CardBody from '../layouts/elements/cards/CardBody'
import CardFooter from '../layouts/elements/cards/CardFooter'
import MenuItems from '../layouts/MenuItems'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosRequest, getConfig } from '../../helpers/config'
import { setCurrentUser } from '../../redux/slices/userSlice'
import ActionButton from '../layouts/elements/buttons/ActionButton'

export default function UserProfile() {
    const { user, isLoggedIn, token } = useSelector(state => state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(!isLoggedIn) navigate('/')
    }, [isLoggedIn])

    //unsubscribe user from a plan
    const unsubscribe = async (stripe_subscription_id) => {
        try {
            const response = await axiosRequest.post('cancel',
            {
                stripe_subscription_id
            }
            , getConfig(token))
            if(response.data.error){
                toast.error(response.data.error)
            }else {
                dispatch(setCurrentUser(response.data.user))
                toast.success(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <CardWrapper          
            cardClass="card main__card border border-dark border-3 bg-white my-5 rounded-0 shadow">
            <CardBody
                cardBodyClass="card-body">
                <div className="row">
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item border border-dark border-2 text-center mb-2">
                                <i className="bi bi-person"></i> { user?.name }
                            </li>
                            <li className="list-group-item border border-dark border-2 text-center mb-2">
                                <i className="bi bi-envelope"></i> { user?.email }
                            </li>
                            <li className="list-group-item border border-dark border-2 text-center mb-2">
                                <i className="bi bi-heart-fill"></i> { user?.number_of_hearts }
                            </li>
                        </ul>
                    </div>
                    {
                        user?.subscriptions?.length > 0 &&
                            <div className="col-md-8 d-flex justify-content-between align-items-center">
                                <h5>
                                    You are subscribed to 
                                    {" "}
                                    {
                                        user?.subscriptions?.length > 1 ? 'plans' : 'plan'
                                    }
                                </h5>
                                <div className="d-flex flex-column">
                                    {
                                        user.subscriptions.map(subscription => (
                                            <div key={subscription.id}>
                                                <span className="badge bg-dark p-2 mx-2 mb-2">
                                                    { subscription.plan.name } ends on { subscription.current_period_end}
                                                </span>
                                                <ActionButton
                                                    buttonType="button"
                                                    buttonClass="btn bt-sm btn-danger rounded-0 me-1 mb-1" 
                                                    buttonDisabled={false}
                                                    buttonAction={() => unsubscribe(subscription.stripe_subscription_id)}
                                                >
                                                    <i className="bi bi-x-circle"></i> Unsubscribe
                                                </ActionButton>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                    }
                </div>
            </CardBody>
            <CardFooter
                cardFooterClass="card-footer bg-white">
                <MenuItems />
            </CardFooter>
        </CardWrapper>
    )
}
