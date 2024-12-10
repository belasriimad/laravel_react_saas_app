import React from 'react'
import Upgrade from '../upgrade/Upgrade'
import Hearts from '../hearts/Hearts'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function RightMenu() {
    const { isLoggedIn } = useSelector(state => state.user)

    return (
        <>
            {
                isLoggedIn ?
                    <>
                        <Upgrade />
                        <Hearts />  
                    </>
                :
                <Link to="/register" className="btn btn-danger align-self-end">
                    <i className="bi bi-door-open me-2"></i>
                    <span className="fw-bold">Get started</span>
                </Link>
            }
        </>
    )
}
