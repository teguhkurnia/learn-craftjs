import { create } from 'zustand'

interface ScreenState {
  currentScreen: 'desktop' | 'tablet' | 'mobile'
  setCurrentScreen: (screen: ScreenState['currentScreen']) => void
}

const useScreenState = create<ScreenState>((set) => ({
  currentScreen: 'mobile',
  setCurrentScreen: (screen) => set({ currentScreen: screen }),
}))

export default useScreenState
