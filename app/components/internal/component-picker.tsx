import { Button } from '@/components/ui/button'
import { Nodes, useEditor } from '@craftjs/core'
import { Columns2, Square, Type } from 'lucide-react'
import { useEffect } from 'react'
import DoubleColumn from '../external/double-clumn'
import ExternalSingleColumn from '../external/single-column'
import ExternalText from '../external/text'

type TreeNode = {
  [key: string]: any
  children: TreeNode[]
}

function buildTree(flatNodes: Nodes, nodeId = 'ROOT'): TreeNode {
  const node = { ...flatNodes[nodeId] }

  if (!node.dom) {
    return {
      ...node,
      children: [],
    }
  }

  let children: TreeNode[] = []

  if (node.data?.linkedNodes) {
    const childIds = Object.values(node.data.linkedNodes)
    console.log('childIds', childIds)
    if (childIds.length > 0) {
      children = Object.values(node.data.linkedNodes).map((childId) => {
        return buildTree(flatNodes, childId)
      })
    }
  }

  if (node.data?.nodes) {
    if (node.data.nodes.length > 0) {
      children = Array.isArray(node.data.nodes)
        ? node.data.nodes.map((childId) => {
            return buildTree(flatNodes, childId)
          })
        : []
    }
  }

  // if (node.data?.linkedNodes) {
  //   const childIds = Object.values(node.data.linkedNodes)
  //   if (childIds.length > 0) {
  //     children = Object.values(node.data.linkedNodes).map((childId) => {
  //       return buildTree(flatNodes, childId)
  //     })
  //   }
  // }

  return {
    ...node,
    children,
  }
}

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
  const { connectors, query, store, state } = useEditor((state) => ({
    state,
  }))

  useEffect(() => {
    console.log('State:', state.nodes)
    console.log(buildTree(state.nodes))

    return () => {}
  }, [state])

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

      <p>Nodes</p>
      <div className='flex flex-col gap-2'>
        {/* {buildTree(state.nodes)}} */}
      </div>
    </div>
  )
}

export default ComponentPicker
