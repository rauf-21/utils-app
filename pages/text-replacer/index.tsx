import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import MenuPageLayout from '../../components/layouts/MenuPageLayout'

const TextReplacer = dynamic(
  () => import('../../components/text/TextReplacer'),
  {
    ssr: false,
  }
)

const TextReplacerPage: NextPage = () => {
  return (
    <MenuPageLayout>
      <TextReplacer />
    </MenuPageLayout>
  )
}

export default TextReplacerPage
