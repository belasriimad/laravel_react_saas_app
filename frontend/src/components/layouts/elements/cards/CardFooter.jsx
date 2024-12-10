import React from 'react'

export default function CardFooter({cardFooterClass, children}) {
  return (
    <div className={cardFooterClass}>
        { children }
    </div>
  )
}