'use client'
import { Editor, Element, Frame } from '@craftjs/core'
import Container from './components/external/container'
import DoubleColumn from './components/external/double-clumn'
import Grid, { GridContainer } from './components/external/grid'
import SingleColumn, {
  SingleColumnChildren,
} from './components/external/single-column'
import Text from './components/external/text'
import ComponentPicker from './components/internal/component-picker'
import Navbar from './components/internal/navbar'
import SettingsPanel from './components/internal/settings-panel'
import useScreenState from './stores/screen-state'
import { match } from 'ts-pattern'

export default function Home() {
  const { currentScreen } = useScreenState()
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
          Grid,
          GridContainer,
        }}
        onNodesChange={(q) => {
          console.log('Nodes changed', q.getNodes())
        }}
      >
        <div className='h-full flex'>
          <ComponentPicker />

          <div className='flex-1 flex justify-center overflow-auto'>
            <div
              id='root'
              className='bg-white relative transition-all duration-300 border'
              style={{
                height: 720,
                width: match(currentScreen)
                  .with('desktop', () => 1440)
                  .with('tablet', () => 768)
                  .with('mobile', () => 375)
                  .exhaustive(),
                scale: 0.95,
              }}
            >
              <div className='absolute -top-[25px] left-0 px-3 py-1 text-xs border rounded-t-lg'>
                Page 1
              </div>
              <Frame>
                <Element is={Container} canvas className='h-full'>
                  <Text text='Hello World' fontSize={12} />
                  <Text text='Hello World 2' fontSize={24} />
                  <Grid></Grid>
                </Element>
              </Frame>
            </div>
          </div>

          <SettingsPanel />
        </div>
      </Editor>
    </div>
  )
}
