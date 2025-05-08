import { Element, useNode } from '@craftjs/core'
import clsx from 'clsx'
import React from 'react'
import { match } from 'ts-pattern'

interface ExternalContainerProps {
  children?: React.ReactNode
  backgroundColor?: string
  padding?: number
  className?: string
}

const Container: React.FC<ExternalContainerProps> = ({
  children,
  backgroundColor = 'white',
  padding = 0,
  className,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <div
      style={{ backgroundColor, padding }}
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      className={clsx(className)}
    >
      {children}
    </div>
  )
}

export default Container
