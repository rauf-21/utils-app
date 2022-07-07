import type { NextPage } from 'next'
import type { ComponentProps } from 'react'

const Input: NextPage<ComponentProps<'input'>> = (props) => {
  return (
    <input
      className='w-full py-3 px-5 bg-gray-200 border rounded'
      {...props}
    />
  )
}

export default Input
