import React from 'react'

export default function SubmitButton({buttonType, buttonClass, buttonLabel}) {
    return (
        <button 
            type={buttonType}
            className={buttonClass}
        >
            { buttonLabel } 
        </button>
    )
}
