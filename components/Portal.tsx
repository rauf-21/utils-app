import type { NextPage } from 'next'
import type { ReactNode } from 'react'
import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const Portal: NextPage<{
  children: ReactNode
}> = ({ children }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    return () => setMounted(false)
  }, [])

  return mounted
    ? createPortal(
        children,
        document.querySelector('#portal') as HTMLDivElement
      )
    : null
}

export default Portal
