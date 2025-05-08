import { Input } from '@/components/ui/input'
import { useNode } from '@craftjs/core'
import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
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
    hasSelectedNode,
    hasDraggedNode,
  } = useNode((state) => ({
    hasSelectedNode: state.events.selected,
    hasDraggedNode: state.events.dragged,
  }))

  const [editable, setEditable] = useState(false)

  useEffect(() => {
    if (hasDraggedNode) {
      setEditable(false)
    }

    return () => {}
  }, [hasDraggedNode])

  return (
    <div
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      className='relative group p-2 hover:outline-1 focus:outline-1 focus:outline-blue-500 hover:outline-blue-500 cursor-grab active:cursor-grabbing'
      style={{
        padding,
      }}
      onClick={(e) => {
        e.stopPropagation()
        if (!hasDraggedNode) {
          setEditable(true)
        }
      }}
    >
      <div className='absolute inset-0 bg-blue-100 opacity-0 group-hover:opacity-100 z-0 pointer-events-none'></div>
      {/* <p>{text}</p> */}
      <ContentEditable
        disabled={!editable}
        html={text}
        onChange={(e) => {
          setProp((props: ExternalTextProps) => {
            props.text = e.target.value
          })
        }}
        tagName='p'
        style={{ fontSize }}
        className={clsx(
          'relative z-50 bg-white focus:outline-none active:cursor-grabbing whitespace-pre-wrap',
          editable && 'cursor-text'
        )}
      />
    </div>
  )
}

const TextSettings = () => {
  const {
    actions: { setProp },
    fontSize,
  } = useNode((node) => ({
    fontSize: node.data.props.fontSize,
  }))

  return (
    <div className=''>
      <Input
        value={fontSize}
        type='number'
        placeholder='Font Size'
        onInput={(e) => {
          console.log(e.currentTarget.value)
          setProp((props: ExternalTextProps) => {
            props.fontSize = Math.max(+e.currentTarget.value, 7)
          })
        }}
      />
    </div>
  )
}

;(Text as any).craft = {
  props: {
    text: 'Hello World',
    fontSize: 12,
    padding: '0.5rem',
  },
  related: {
    settings: TextSettings,
  },
}

export default Text
