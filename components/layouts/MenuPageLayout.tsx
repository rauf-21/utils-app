import type { NextPage } from 'next'
import Link from 'next/link'

import Button from '../common/Button'

const MenuPageLayout: NextPage<{
  children: React.ReactNode
}> = (props) => {
  const { children } = props

  return (
    <div className='my-4 mx-2 md:w-1/2 min-h-screen md:mx-auto flex flex-col justify-center items-center gap-y-5'>
      <>
        <div className='self-start'>
          <Link href='/'>
            <a>
              <Button
                color='primary'
                outline
              >
                Back to home
              </Button>
            </a>
          </Link>
        </div>
        <div className='w-full h-full flex flex-col justify-center gap-5'>
          {children}
        </div>
      </>
    </div>
  )
}

export default MenuPageLayout
