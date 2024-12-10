import React from 'react'

export default function CardBody({cardBodyClass, children}) {
  return (
    <div className={cardBodyClass}>
        { children }
    </div>
  )
}