import React from 'react'

export default function DocLayout({children} : {
    children : React.ReactNode
}) {
  return (
    <div className='h-full justify-center'>
        {children}
    </div>
  )
}
