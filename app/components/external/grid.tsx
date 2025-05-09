import React, { useState } from 'react'
import Container from './container'
import { Element, useNode } from '@craftjs/core'
import Text from './text'
import { Input } from '@/components/ui/input'
import useResizeObserver from '@/app/hooks/resize-observer'
import { match } from 'ts-pattern'

interface ExternalGridProps {
  children?: React.ReactNode
  gap?: number
  columns?: {
    sm: number
    md: number
    lg: number
    xl: number
  }
  rows?: number
  justifyItems?: string
  alignItems?: string
  justifyContent?: string
  alignContent?: string
}

const GridSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props,
  }))

  return (
    <div className='flex flex-col gap-3'>
      <Input
        type='number'
        placeholder='Gap'
        defaultValue={props.gap}
        onChange={(e) => {
          setProp(
            (props: ExternalGridProps) => (props.gap = parseInt(e.target.value))
          )
        }}
        className='w-full'
      />
    </div>
  )
}

export const GridContainer: React.FC<ExternalGridProps> = ({
  children,
  ...style
}) => {
  const {
    connectors: { connect },
  } = useNode()

  const currentBreakPoint = useResizeObserver({
    selector: '#root',
  })

  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref)
      }}
      className='grid p-2 hover:outline-1 hover:outline-blue-500'
      style={{
        display: 'grid',
        gap: style.gap,
        gridTemplateColumns: `repeat(${style.columns?.[currentBreakPoint]}, 1fr)`,
        gridTemplateRows: `repeat(${style.rows}, 1fr)`,
        justifyItems: style.justifyItems,
        alignItems: style.alignItems,
        justifyContent: style.justifyContent,
        alignContent: style.alignContent,
      }}
    >
      {children ??
        Array.from({ length: style.columns?.[currentBreakPoint] ?? 1 }).map(
          (_, index) => (
            <div key={index} className='py-1.5 px-3 rounded-md bg-gray-200'>
              Grid Section
            </div>
          )
        )}
    </div>
  )
}
;(GridContainer as any).craft = {
  props: {
    gap: 4,
    columns: {
      sm: 1,
      md: 2,
      lg: 3,
      xl: 4,
    },
    rows: 1,
    justifyItems: 'stretch',
    alignItems: 'stretch',
    justifyContent: 'start',
    alignContent: 'start',
  },
  related: {
    settings: GridSettings,
  },
}

const Grid: React.FC = () => {
  return (
    <Container>
      <Element id='grid' is={GridContainer} canvas>
        <Text text='Grid Item 1' />
      </Element>
    </Container>
  )
}

export default Grid
