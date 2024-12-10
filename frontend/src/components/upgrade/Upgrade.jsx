import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Upgrade() {
    const { user } = useSelector(state => state.user)

    return (
        <div>
            {
                user?.number_of_hearts === 0 &&  
                    <div>
                        <span className="fw-bold me-2">
                            No more hearts
                        </span>
                        <Link to="/plans" className="btn btn-warning">
                            Upgrade
                        </Link>
                    </div>
            }   
        </div>
    )
}
