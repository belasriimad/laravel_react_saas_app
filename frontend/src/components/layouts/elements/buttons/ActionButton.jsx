import React from 'react'

export default function ActionButton({children, buttonType, buttonClass, buttonAction, buttonDisabled}) {
    return (
        <button 
            type={buttonType}
            className={buttonClass}
            onClick={buttonAction}
            disabled={buttonDisabled}
        >
            { children }
        </button>
    )
}
