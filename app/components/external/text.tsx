import { useNode } from '@craftjs/core'
import clsx from 'clsx'
import React from 'react'
import ContentEditable from 'react-contenteditable'

interface ExternalTextProps {
  text: string
  fontSize?: number | string
  padding?: number | string
}

const Text: React.FC<ExternalTextProps> = ({
  fontSize = 12,
  text,
  padding = '0.5rem',
}) => {
  const {
    connectors: { drag, connect },
    actions: { setProp },
  } = useNode()
  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      className='relative group p-2 hover:outline-1 focus:outline-1 focus:outline-blue-500 hover:outline-blue-500 cursor-grab active:cursor-grabbing'
      style={{
        padding,
      }}
    >
      <div className='absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 z-0 pointer-events-none'></div>
      {/* <p>{text}</p> */}
      <ContentEditable
        html={text}
        onChange={(e) => {
          setProp(
            (props: ExternalTextProps) =>
              (props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, ''))
          )
        }}
        tagName='p'
        style={{ fontSize }}
        className={clsx(
          'relative z-50 bg-white cursor-text focus:outline-none active:cursor-grabbing'
        )}
      />
    </div>
  )
}

export default Text
