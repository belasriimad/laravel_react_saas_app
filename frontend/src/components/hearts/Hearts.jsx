import React from 'react'
import { useSelector } from 'react-redux'

export default function Hearts() {
    const { user } = useSelector(state => state.user)

    return (
        <div>
            <span>
                <i className="bi bi-heart-fill text-danger h3"></i>
            </span>
            <span className="fw-bold">
                <i>x { user?.number_of_hearts }</i>
            </span>
        </div>
    )
}
