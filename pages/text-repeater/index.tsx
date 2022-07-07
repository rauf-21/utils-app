import type { NextPage } from 'next'

import MenuPageLayout from '../../components/layouts/MenuPageLayout'
import TextRepeater from '../../components/text/TextRepeater'

const TextRepeaterPage: NextPage = () => {
  return (
    <MenuPageLayout>
      <TextRepeater />
    </MenuPageLayout>
  )
}

export default TextRepeaterPage
