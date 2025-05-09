import useScreenState from '@/app/stores/screen-state'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import React from 'react'

const Navbar = () => {
  const { currentScreen, setCurrentScreen } = useScreenState()
  return (
    <div className='border-b p-2.5 grid grid-cols-3'>
      <div className=''></div>
      <div className='flex justify-center items-center'>
        <Select
          defaultValue={currentScreen}
          onValueChange={(value) => {
            setCurrentScreen(value as 'desktop' | 'tablet' | 'mobile')
          }}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Screen Size' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='desktop'>Desktop</SelectItem>
            <SelectItem value='tablet'>Tablet</SelectItem>
            <SelectItem value='mobile'>Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className=''></div>
    </div>
  )
}

export default Navbar
