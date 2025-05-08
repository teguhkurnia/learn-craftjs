'use client'
import { Editor, Element, Frame, useEditor } from '@craftjs/core'
import ComponentPicker from './components/internal/component-picker'
import Navbar from './components/internal/navbar'
import Text from './components/external/text'
import Container from './components/external/container'
import SingleColumn, {
  SingleColumnChildren,
} from './components/external/single-column'
import DoubleColumn from './components/external/double-clumn'
import SettingsPanel from './components/internal/settings-panel'
import { Zoom } from '@react-zoom/react-zoom-in-out'
import { useEffect, useRef } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'

export default function Home() {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <Navbar />
      <Editor
        resolver={{
          Text,
          Container,
          SingleColumn,
          SingleColumnChildren,
          DoubleColumn,
        }}
        onNodesChange={(q) => {
          console.log('Nodes changed', q.serialize())
        }}
      >
        <div className='h-full flex'>
          <ComponentPicker />
          {/* 
          <TransformWrapper initialScale={0.9} centerOnInit minScale={0.4}>
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            > */}
          <div className='bg-white flex-1 relative overflow-auto container'>
            <Frame
              data={`{"ROOT":{"type":{"resolvedName":"Container"},"isCanvas":true,"props":{"className":"h-full"},"displayName":"Container","custom":{},"hidden":false,"nodes":["PynkEc82DB","0bjGLVnUAO"],"linkedNodes":{}},"PynkEc82DB":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Hello World","fontSize":12},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}},"0bjGLVnUAO":{"type":{"resolvedName":"Text"},"isCanvas":false,"props":{"text":"Hello World 2","fontSize":24},"displayName":"Text","custom":{},"parent":"ROOT","hidden":false,"nodes":[],"linkedNodes":{}}}`}
            >
              {/* <Element is={Container} canvas className='h-full'>
                <Text text='Hello World' fontSize={12} />
                <Text text='Hello World 2' fontSize={24} />
              </Element> */}
            </Frame>
          </div>
          {/* </TransformComponent>
          </TransformWrapper> */}

          <SettingsPanel />
        </div>
      </Editor>
    </div>
  )
}
