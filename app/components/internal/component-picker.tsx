import { Button } from '@/components/ui/button'
import React from 'react'
import { Columns2, Square, Type } from 'lucide-react'
import { Element, useEditor } from '@craftjs/core'
import ExternalText from '../external/text'
import ExternalContainer from '../external/container'
import ExternalSingleColumn from '../external/single-column'
import DoubleColumn from '../external/double-clumn'

const components = [
  {
    name: 'Text',
    icon: <Type />,
    component: <ExternalText text='Type Here' fontSize={12} />,
  },
  {
    name: '1 Column',
    icon: <Square />,
    component: <ExternalSingleColumn />,
  },
  {
    name: '2 Columns',
    icon: <Columns2 />,
    component: <DoubleColumn />,
  },
]

const ComponentPicker = () => {
  const { connectors, query } = useEditor()
  return (
    <div className='border-r p-2.5 flex flex-col gap-2'>
      {components.map((component) => (
        <Button
          key={component.name}
          variant='outline'
          ref={(ref) => {
            if (ref) connectors.create(ref, component.component)
          }}
        >
          {component.icon}
        </Button>
      ))}
    </div>
  )
}

export default ComponentPicker
