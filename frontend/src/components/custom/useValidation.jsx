import React from 'react'

export default function useValidation(errors, field) {
    const renderErrors = () => (
        errors?.[field]?.map((error,index) => (
            <div key={index} className="text-white my-2 rounded p-2 bg-danger">
                { error }
            </div>
        ))
    )

    return renderErrors()
}
