import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { axiosRequest } from '../../helpers/config'
import Spinner from '../layouts/elements/Spinner'
import Input from '../layouts/elements/Input'
import { setCurrentUser, setToken, setLoggedInOut } from '../../redux/slices/userSlice'
import SubmitButton from '../layouts/elements/buttons/SubmitButton'
import CardWrapper from '../layouts/elements/cards/CardWrapper'
import CardHeader from '../layouts/elements/cards/CardHeader'
import CardBody from '../layouts/elements/cards/CardBody'
import CardFooter from '../layouts/elements/cards/CardFooter'

export default function Login() {
    const { isLoggedIn } = useSelector(state => state.user)
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [validationErrors, setValidationErrors] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(isLoggedIn) navigate('/')
    },[isLoggedIn])

    const loginUser = async (e) => {
        e.preventDefault()
        setValidationErrors([])
        setLoading(true)
        try {
            const response = await axiosRequest.post('user/login', user)
            setLoading(false)
            if(response.data.error){
                toast.error(response.data.error)
            }else {
                dispatch(setCurrentUser(response.data.user))
                dispatch(setToken(response.data.access_token))
                dispatch(setLoggedInOut(true))
                toast.success(response.data.message)
                navigate('/')
            }
        } catch (error) {
            if(error?.response?.status === 422) {
                setValidationErrors(error.response.data.errors)
            }
            console.log(error)
            setLoading(false)
        }
    }

    return (
        <CardWrapper 
            cardClass="card main__card border border-dark border-3 bg-white my-5 rounded-0 shadow">
            <CardBody 
                cardBodyClass="card-body">
                <div className="row my-5">
                    <div className="col-md-12">
                        <div className='row my-5'>
                            <div className="col-md-6 mx-auto">
                                <CardWrapper 
                                    cardClass="card border border-dark border-2 shadow-sm">
                                    <CardHeader 
                                        cardHeaderClass="card-header border-bottom border-dark border-2 bg-white">
                                        <h5 className="text-center mt-2">
                                            Login
                                        </h5>
                                    </CardHeader>
                                    <CardBody 
                                        cardBodyClass="card-body">
                                        <form className="mt-3" onSubmit={(e) => loginUser(e)}>
                                            <Input 
                                                fieldName="email"
                                                fieldLabel="Email address*"
                                                fieldType="email"
                                                fieldValue={user.email}
                                                fieldAction={(e) => setUser({
                                                    ...user, email: e.target.value
                                                })}
                                                fieldClass="form-control p-2 border border-dark border-3 rounded-0" 
                                                fieldId="email"
                                                validationErrors={validationErrors}
                                                fieldPlaceholder="Email"
                                                fieldDisabled={false}
                                            />
                                            <Input 
                                                fieldName="password"
                                                fieldLabel="Password*"
                                                fieldType="password"
                                                fieldValue={user.password}
                                                fieldAction={(e) => setUser({
                                                    ...user, password: e.target.value
                                                })}
                                                fieldClass="form-control p-2 border border-dark border-3 rounded-0" 
                                                fieldId="password"
                                                validationErrors={validationErrors}
                                                fieldPlaceholder="Password"
                                                fieldDisabled={false}
                                            />
                                            {
                                                loading ?
                                                    <Spinner />
                                                :
                                                <>
                                                    <SubmitButton
                                                        buttonType="submit" 
                                                        buttonClass="btn btn-dark btn-sm"
                                                        buttonLabel="Submit"
                                                    />
                                                    <Link to="/" className="btn btn-warning btn-sm ms-1">
                                                        <span className="fw-bold">Cancel</span>
                                                    </Link>
                                                </>
                                            }
                                        </form>
                                    </CardBody>
                                    <CardFooter 
                                        cardFooterClass="card-footer border-top border-dark border-2 bg-white text-center">
                                        <Link to="/register" className="btn btn-link">
                                            <span className="fw-bold">I do not have an account</span>
                                        </Link>
                                    </CardFooter>
                                </CardWrapper>
                            </div>
                        </div>
                    </div>
                </div>
            </CardBody>
        </CardWrapper>
    )
}