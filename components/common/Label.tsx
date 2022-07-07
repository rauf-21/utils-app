import type { NextPage } from 'next'
import type { ComponentProps } from 'react'
import React from 'react'

const Label: NextPage<ComponentProps<'label'>> = ({ children, ...props }) => {
  return (
    <label
      className='font-bold'
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
