import React from 'react'

export default function layout({children} : {
    children : React.ReactNode
}) {
  return (
    <div className='h-full flex items-center justify-center mt-24'>
        {children}
    </div>
  )
}
