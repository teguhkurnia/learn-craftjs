import React from 'react'
import Container from './container'
import { Element } from '@craftjs/core'
import { SingleColumnChildren } from './single-column'

const DoubleColumn = () => {
  return (
    <Container>
      <div className='flex'>
        <Element id='single-column1' is={SingleColumnChildren} canvas></Element>
        <Element id='single-column2' is={SingleColumnChildren} canvas></Element>
      </div>
    </Container>
  )
}

export default DoubleColumn
