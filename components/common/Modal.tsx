import type { NextPage } from 'next'

import XMarkIcon from '../icons/XMarkIcon'

const Modal: NextPage<{
  open?: boolean
  text?: string
  toggle?: () => void
}> = (props) => {
  return (
    <>
      {props.open && (
        <div className='w-full h-full fixed inset-0 bg-gray-600/50 flex flex-col items-center justify-center p-5'>
          <dialog
            open={props.open}
            className='w-full h-3/4 my-5 bg-white  md:w-1/2 rounded overflow-y-scroll'
          >
            <form
              method='dialog'
              className='flex flex-col gap-5'
            >
              <div className='self-end'>
                <button
                  value='w-full cancel'
                  onClick={props.toggle}
                >
                  <XMarkIcon className='fill-red-500 hover:cursor-pointer' />
                </button>
              </div>
              <div>
                <div className='whitespace-pre-line'>
                  {props.text?.trim() === '' ? 'No Text' : props.text}
                </div>
              </div>
            </form>
          </dialog>
        </div>
      )}
    </>
  )
}

export default Modal
