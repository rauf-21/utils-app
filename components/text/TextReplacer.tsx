import type { NextPage } from 'next'
import type { MouseEvent, MouseEventHandler } from 'react'
import { useState } from 'react'

import Portal from '../Portal'
import Modal from '../common/Modal'
import Textarea from '../common/Textarea'
import Button from '../common/Button'
import Input from '../common/Input'
import Label from '../common/Label'
import XMarkIcon from '../icons/XMarkIcon'

type WordInputPair = {
  id: number
  from: string
  to: string
}

const getEmptyWordInputPair = () => {
  return {
    id: +new Date(),
    from: '',
    to: '',
  }
}

const TextReplacer: NextPage = () => {
  const [open, setOpen] = useState(false)
  const [text, setText] = useState('')
  const [wordInputTextPairs, setWordInputTextPairs] = useState<WordInputPair[]>(
    [{ ...getEmptyWordInputPair() }]
  )
  const [result, setResult] = useState('')

  const toggleReadFullText = () => {
    setOpen((value) => !value)
  }

  const addNewWordInputPairHandler: MouseEventHandler = (e) => {
    e.preventDefault()
    setWordInputTextPairs((value) => [...value, { ...getEmptyWordInputPair() }])
  }

  const removeWordInputPairHandler = (
    e: MouseEvent<SVGSVGElement>,
    targetId: number
  ) => {
    if (wordInputTextPairs.length === 1) {
      return
    }

    setWordInputTextPairs(() =>
      wordInputTextPairs.filter(({ id }) => id !== targetId)
    )
  }

  const setFromWordInputTextHandler = (newValue: string, targetId: number) => {
    setWordInputTextPairs(() =>
      wordInputTextPairs.map((wordInputTextPair) =>
        wordInputTextPair.id === targetId
          ? { ...wordInputTextPair, from: newValue }
          : wordInputTextPair
      )
    )
  }

  const setToWordInputTextHandler = (newValue: string, targetId: number) => {
    setWordInputTextPairs(() =>
      wordInputTextPairs.map((wordInputTextPair) =>
        wordInputTextPair.id === targetId
          ? { ...wordInputTextPair, to: newValue }
          : wordInputTextPair
      )
    )
  }

  const generateNewTextHandler: MouseEventHandler = (e) => {
    e.preventDefault()

    const patternObj = Object.fromEntries(
      wordInputTextPairs.map(({ from, to }) => [from, to])
    )
    const regexString = Object.keys(patternObj)
      .map((word) => `\\b${word.toLowerCase()}\\b`)
      .join('|')
    const regexFlag = 'gmi'
    const regex = new RegExp(regexString, regexFlag)

    setResult(() =>
      text.replace(regex, (matched) => patternObj[matched.toLowerCase()])
    )
  }

  const readFullTextHandler: MouseEventHandler = (e) => {
    e.preventDefault()

    toggleReadFullText()
  }

  const copyTextHandler: MouseEventHandler = (e) => {
    e.preventDefault()

    navigator.clipboard.writeText(result)
    alert('Text has been copied successfully')
  }

  return (
    <>
      <Portal>
        <Modal
          open={open}
          text={result}
          toggle={toggleReadFullText}
        />
      </Portal>
      <form className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5'>
          <div className='flex flex-row gap-x-2'>
            <Label className='w-full font-bold grow'>From</Label>
            <Label className='w-full -ml-10 font-bold grow'>To</Label>
          </div>
          {wordInputTextPairs.map(({ id }) => (
            <div
              className='flex flex-row gap-x-2 items-center'
              key={id}
            >
              <div className='w-full grow'>
                <Input
                  id={`from-${id}}`}
                  placeholder='Bad word...'
                  onChange={(e) =>
                    setFromWordInputTextHandler(e.currentTarget.value, id)
                  }
                />
              </div>
              <div className='w-full grow'>
                <Input
                  id={`to-${id}}`}
                  placeholder='Good word...'
                  onChange={(e) =>
                    setToWordInputTextHandler(e.currentTarget.value, id)
                  }
                />
              </div>
              <div className='grow'>
                <XMarkIcon
                  className='ml-auto fill-red-500 hover:cursor-pointer'
                  onClick={(e) => removeWordInputPairHandler(e, id)}
                />
              </div>
            </div>
          ))}
          <Button
            color='primary'
            outline
            onClick={addNewWordInputPairHandler}
          >
            Add new words
          </Button>
          <div>
            <Label htmlFor='text'>Text</Label>
            <Textarea
              id='text'
              onChange={(e) => setText(e.currentTarget.value)}
            ></Textarea>
          </div>
          <Button
            color='primary'
            onClick={generateNewTextHandler}
          >
            Generate New Text
          </Button>
          <div>
            <Label htmlFor='result'>Result</Label>
            <Textarea
              id='result'
              readOnly
              value={result}
            ></Textarea>
          </div>
          <div className='flex flex-row gap-x-2'>
            <Button
              color='primary'
              outline
              className='grow'
              mergeClassName
              onClick={readFullTextHandler}
            >
              Read Full Text
            </Button>
            <Button
              color='secondary'
              className='grow'
              mergeClassName
              onClick={copyTextHandler}
            >
              Copy Text
            </Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default TextReplacer
