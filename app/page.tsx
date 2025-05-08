'use client'
import { Editor, Element, Frame } from '@craftjs/core'
import ComponentPicker from './components/internal/component-picker'
import Navbar from './components/internal/navbar'
import Text from './components/external/text'
import Container from './components/external/container'
import SingleColumn, {
  SingleColumnChildren,
} from './components/external/single-column'
import DoubleColumn from './components/external/double-clumn'
import SettingsPanel from './components/internal/settings-panel'

export default function Home() {
  return (
    <div className='h-screen w-screen'>
      <Navbar />
      <Editor
        resolver={{
          Text,
          Container,
          SingleColumn,
          SingleColumnChildren,
          DoubleColumn,
        }}
      >
        <div className='h-full flex'>
          <ComponentPicker />
          <div className='bg-white flex-1'>
            <Frame>
              <Element is={Container} canvas className='h-full'>
                <Text text='Hello World' fontSize={12} />
                <Text text='Hello World 2' fontSize={24} />
              </Element>
            </Frame>
          </div>

          <SettingsPanel />
        </div>
      </Editor>
    </div>
  )
}
