import React from 'react'
import { BallTriangle } from 'react-loader-spinner'

export default function Spinner() {
    return (
        <div className='d-flex justify-content-center my-5'>
            <BallTriangle
                 height={80}
                 width={80}
                 radius={5}
                 color="#000"
                 ariaLabel="ball-triangle-loading"
                 visible={true}
            />
        </div>
    )
}