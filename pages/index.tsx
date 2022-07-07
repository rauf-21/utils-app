import type { NextPage } from 'next'

import type Menu from '../types/menu'
import MenuList from '../components/home/MenuList'

const HomePage: NextPage = () => {
  const list: Menu[] = [
    {
      name: 'Text',
      list: [
        {
          name: 'Text Repeater',
          link: '/text-repeater',
        },
        {
          name: 'Text Replacer',
          link: '/text-replacer',
        },
      ],
    },
  ]

  return (
    <div className='w-full h-screen mt-10 px-2 md:my-0 md:px-0 flex flex-col md:justify-center md:items-center gap-y-5'>
      <h1 className='text-3xl font-bold'>Utils App</h1>
      <MenuList list={list} />
    </div>
  )
}

export default HomePage
