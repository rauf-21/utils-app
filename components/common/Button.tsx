import type { NextPage } from 'next'
import type { ComponentProps } from 'react'
import classNames from 'classnames'

const Button: NextPage<
  ComponentProps<'button'> & {
    color: 'primary' | 'secondary'
    outline?: boolean
    mergeClassName?: boolean
  }
> = ({ color, outline, mergeClassName, className, ...props }) => {
  return (
    <button
      className={classNames('py-2 px-3 font-bold border-2 rounded', {
        'bg-white text-indigo-600 border-indigo-600':
          outline && color === 'primary',
        'bg-white text-gray-600 border-gray-600':
          outline && color === 'secondary',
        'bg-indigo-600 text-white border-indigo-600':
          !outline && color === 'primary',
        'bg-gray-600 text-white border-gray-600':
          !outline && color === 'secondary',
        [`${className}`]: mergeClassName,
      })}
      {...props}
    >
      {props.children}
    </button>
  )
}

export default Button
