import { Element, Frame, useNode } from '@craftjs/core'
import React from 'react'
import Container from './container'
import Text from './text'

interface ExternalSingleColumnProps {
  children?: React.ReactNode
}

export const SingleColumnChildren: React.FC<ExternalSingleColumnProps> = ({
  children,
}) => {
  const {
    connectors: { connect },
  } = useNode()
  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref)
      }}
      className='w-full'
    >
      {children ?? <div className='m-2 bg-gray-200 p-2'>Single Column</div>}
    </div>
  )
}

const SingleColumn: React.FC = ({}) => {
  const {
    connectors: { connect },
  } = useNode()
  return (
    <Container>
      <Element id='single-column' is={SingleColumnChildren} canvas></Element>
    </Container>
  )
}

export default SingleColumn
