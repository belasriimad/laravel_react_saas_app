import React from 'react'
import useValidations from '../../custom/useValidations'

export default function Input({fieldName, fieldLabel, fieldPlaceholder, filedValue, fieldAction, fieldType, fieldClass, fieldId, validationErrors, fieldDisabled}) {
    return (
        <div className="mb-3">
            {
                fieldLabel && <label htmlFor={fieldName} className="form-label">{fieldLabel}</label>
            }
            <input 
                type={fieldType}
                className={fieldClass}
                id={fieldId}
                value={filedValue}
                onChange={fieldAction}
                placeholder={fieldPlaceholder}
                disabled={fieldDisabled}
            />
            {
                validationErrors && useValidations(validationErrors, fieldName)
            }
        </div>
    )
}
