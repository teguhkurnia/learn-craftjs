import React from 'react'

interface UseResizeObserverProps {
  selector: string
  onResize?: (screen: 'sm' | 'md' | 'lg' | 'xl') => void
}

const useResizeObserver = ({ onResize, selector }: UseResizeObserverProps) => {
  const [screen, setScreen] = React.useState<'sm' | 'md' | 'lg' | 'xl'>('sm')

  React.useEffect(() => {
    const element = document.querySelector(selector)
    if (!element) return

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        if (width < 640) {
          setScreen('sm')
          onResize?.('sm')
        } else if (width < 768) {
          setScreen('md')
          onResize?.('md')
        } else if (width < 1024) {
          setScreen('lg')
          onResize?.('lg')
        } else {
          setScreen('xl')
          onResize?.('xl')
        }
      }
    })

    resizeObserver.observe(element)

    return () => {
      resizeObserver.disconnect()
    }
  }, [selector, onResize])

  return screen
}

export default useResizeObserver
