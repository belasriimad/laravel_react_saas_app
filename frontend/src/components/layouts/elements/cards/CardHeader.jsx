import React from 'react'

export default function CardHeader({cardHeaderClass, children}) {
  return (
    <div className={cardHeaderClass}>
      { children }
    </div>
  )
}
