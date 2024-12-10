import React, { useEffect, useState } from 'react'
import { axiosRequest } from "../../helpers/config"
import { Link, useNavigate } from 'react-router-dom'
import Spinner from '../layouts/elements/Spinner'
import CardWrapper from '../layouts/elements/cards/CardWrapper'
import CardBody from '../layouts/elements/cards/CardBody'
import CardHeader from '../layouts/elements/cards/CardHeader'
import CardFooter from '../layouts/elements/cards/CardFooter'
import ActionButton from '../layouts/elements/buttons/ActionButton'
import StripeSubscription from '../subscription/StripeSubscription'
import { setChosenPlan } from '../../redux/slices/userSlice'
import { useDispatch, useSelector } from 'react-redux'

export default function Plan() {
    const [plans, setPlans] = useState([])
    const [loading, setLoading] = useState(false)
    const { chosenPlan, isLoggedIn, user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        //define the get plans function
        const getPlans = async () => {
            setLoading(true)
            try {
                const response = await axiosRequest.get("/plans")
                setPlans(response.data.plans)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        if(user?.number_of_hearts > 0) {
            navigate('/')
        }else {
            getPlans()
        }
    },[])

    return (
        <CardWrapper
            cardClass="card main__card border border-dark border-3 bg-white my-5 rounded-0 shadow">
            <CardBody
                cardBodyClass="card-body">
                <div className="row my-5">
                    <div className="col-md-12">
                        <Link to="/" className="btn btn-link text-dark text-decoration-none">
                            <i className="bi bi-arrow-left h3"></i>
                        </Link>
                        <div className="row mt-5">
                            {
                                loading ? 
                                    <Spinner />
                                :
                                plans?.map(plan => (
                                    <div className="col-md-4" key={plan.id}>
                                        <CardWrapper 
                                            cardClass="card border border-dark border-2 b-white shadow">
                                            <CardHeader 
                                                cardHeaderClass="card-header border-bottom border-dark border-2 bg-white fw-bold text-center">
                                                { plan.name }
                                            </CardHeader>
                                            <CardBody 
                                                cardBodyClass="card-body">
                                                <div className="d-flex flex-column justify-content-center align-items-center">
                                                    <div className="d-flex justify-content-center align-items-center">
                                                        <span className="fw-bold">$</span>
                                                        <h1>{ plan.price }</h1>
                                                        <span className="text-danger fw-bold mx-1">/</span>
                                                        Month
                                                    </div>
                                                    <div>
                                                        <span className="fw-bold">
                                                            { plan.number_of_hearts } <i className="text-danger bi bi-heart-fill"></i>
                                                        </span>
                                                    </div>
                                                </div>
                                            </CardBody>
                                            <CardFooter 
                                                cardFooterClass="card-footer border-top border-dark border-2 bg-white text-center">
                                                {
                                                    isLoggedIn ?
                                                        <ActionButton 
                                                            buttonClass="btn btn-danger rounded-0"
                                                            buttonType="button"
                                                            buttonDisabled={false}
                                                            buttonAction={() => dispatch(setChosenPlan(plan))}    
                                                        >
                                                            <i className="bi bi-check2-circle me-1"></i>
                                                            Choose plan
                                                        </ActionButton>
                                                    :
                                                    <Link to="/login" className='btn btn-danger rounded-0'>
                                                        <i className="bi bi-check2-circle me-1"></i>
                                                        Choose plan
                                                    </Link>
                                                }
                                            </CardFooter>
                                        </CardWrapper>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                {
                    chosenPlan && <div className="row mt-5">
                        <div className="col-md-6 mx-auto">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <StripeSubscription />
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </CardBody>
        </CardWrapper>
    )
}
