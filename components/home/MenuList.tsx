import type { NextPage } from 'next'
import Link from 'next/link'

import type Menu from '../../types/menu'

const MenuList: NextPage<{
  list: Menu[]
}> = (props) => {
  const { list } = props

  if (list.length <= 0) {
    return (
      <p>There is no menu yet.</p>
    )
  }

  return (
    <>
      {
        list.map((menu, index) => (
          <details open className='md:w-1/2' key={`${menu.name}${index}`}>
            <summary className='py-2 px-5 bg-gray-300 rounded font-bold hover:cursor-pointer'>{menu.name}</summary>
            <div className='py-2 px-5 w-full bg-gray-100'>
              <ul className='mx-5 list-disc'>
                {
                  menu.list.length <= 0 && (
                    <p>There is no menu yet</p>
                  )
                }
                {
                  menu.list.length > 0 && (
                    menu.list.map((subMenu, index) => (
                      <li key={`${subMenu.name}${index}`}>
                        <Link href={subMenu.link}>
                          <a className='text-blue-600 font-semibold hover:underline hover:decoration-solid'>{subMenu.name}</a>
                        </Link>
                      </li>
                    ))
                  )
                }
              </ul>
            </div>
          </details>
        ))
      }
    </>
  )
}

export default MenuList
