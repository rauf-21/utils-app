import type { NextPage } from 'next'
import type { FormEventHandler, MouseEventHandler } from 'react'
import { useState, useEffect } from 'react'
import S from 'sanctuary'

import Textarea from '../common/Textarea'
import Button from '../common/Button'
import Input from '../common/Input'
import Label from '../common/Label'

const MAX_REPEAT_COUNT = 1000

const TextRepeater: NextPage = () => {
  const [text, setText] = useState('')
  const [repeatCount, setRepeatCount] = useState(1)
  const [separator, setSeparator] = useState('')
  const [result, setResult] = useState('')
  const [isRepeatCountLimited, setIsRepeatCountLimited] = useState(true)

  // prettier-ignore
  const repeatText = (
    text: string,
    separator: string,
    repeatCount: number
  ): string =>
    S.pipe([
      S.map(() => text), 
      S.joinWith(separator)
    ])(
      S.range(0)(repeatCount)
    )

  useEffect(() => {
    if (Math.sign(repeatCount) !== 1) {
      setRepeatCount(1)
      return
    }
    if (repeatCount > MAX_REPEAT_COUNT && isRepeatCountLimited) {
      alert(
        `Repeat count are limited to 1000 to prevent browser from crash. Uncheck 'Limit repeat count' to disable it`
      )
      setRepeatCount(MAX_REPEAT_COUNT)
      return
    }

    setRepeatCount(repeatCount)
  }, [repeatCount, isRepeatCountLimited])

  const createRepeatedTextHandler: FormEventHandler = (e) => {
    e.preventDefault()

    setResult(repeatText(text, separator, repeatCount))
  }

  const copyTextHandler: MouseEventHandler = () => {
    navigator.clipboard.writeText(result)
    alert('Text has been copied successfully')
  }

  return (
    <>
      <form className='flex flex-col gap-5'>
        <div>
          <Label htmlFor='text'>Text</Label>
          <Textarea
            id='text'
            onChange={(e) => setText(e.currentTarget.value)}
          ></Textarea>
        </div>
        <div>
          <Label htmlFor='repeat-count'>Repeat Count</Label>
          <Input
            id='repeat-count'
            type='number'
            onChange={(e) => setRepeatCount(Number(e.currentTarget.value))}
            value={repeatCount}
          />
        </div>
        <div>
          <Label htmlFor='separator'>Separator</Label>
          <Input
            id='separator'
            type='string'
            value={separator}
            onChange={(e) => setSeparator(e.currentTarget.value)}
          />
        </div>
        <div className='flex flex-col'>
          <Label htmlFor='configuration'>Configuration</Label>
          <div
            id='configuration'
            className='flex flex-row items-center'
          >
            <Label
              htmlFor='limit-repeat-count'
              className='font-normal mr-2'
            >
              Limit repeat count
            </Label>
            <input
              id='limit-repeat-count'
              type='checkbox'
              defaultChecked={isRepeatCountLimited}
              onChange={(e) => setIsRepeatCountLimited(e.currentTarget.checked)}
            />
          </div>
        </div>
        <Button
          color='primary'
          onClick={createRepeatedTextHandler}
        >
          Create
        </Button>
      </form>
      <div className='flex flex-col gap-5'>
        <Label htmlFor='result'>Result</Label>
        <Textarea
          id='result'
          value={result}
          readOnly
        ></Textarea>
        <Button
          color='secondary'
          onClick={copyTextHandler}
        >
          Copy Text
        </Button>
      </div>
    </>
  )
}

export default TextRepeater
