import { useEditor } from '@craftjs/core'
import React from 'react'

const SettingsPanel = () => {
  const { selected } = useEditor((state) => {
    const [currentNodeId] = state.events.selected
    let selected

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
      }
    }

    return {
      selected,
    }
  })

  return (
    <div className='border-l p-2.5'>
      SettingsPanel
      {selected?.settings && React.createElement(selected.settings)}
    </div>
  )
}

export default SettingsPanel
