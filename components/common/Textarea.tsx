import type { NextPage } from 'next'
import type { ComponentProps } from 'react'

const Textarea: NextPage<ComponentProps<'textarea'>> = ({
  children,
  ...props
}) => {
  return (
    <textarea
      className='w-full py-3 px-5 bg-gray-200 border rounded'
      {...props}
    >
      {children}
    </textarea>
  )
}

export default Textarea
