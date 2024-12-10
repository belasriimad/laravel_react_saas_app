import React from 'react'

export default function CardWrapper({cardClass, children}) {
  return (
    <div className={cardClass}>
      { children }
    </div>
  )
}
