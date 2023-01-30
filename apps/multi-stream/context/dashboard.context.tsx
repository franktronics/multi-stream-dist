import { useColorMode } from "@chakra-ui/react"
import { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from "react"

export type ThemeType = 'light' | 'dark'
export type DashboardContextType = {
  theme: ThemeType,
  state: string,
  setState: (st: string) => void,
  toggleTheme: (t?: ThemeType | undefined) => void
}
const contextDefaultValue: DashboardContextType = {
  theme: 'light',
  state: 'sec2.child1',
  setState: () => {},
  toggleTheme: () => {}
}

export const DashboardContext = createContext<DashboardContextType>(contextDefaultValue)
export const useDashboard = () => useContext(DashboardContext)
export const DashboardProvider = ({children}: PropsWithChildren) => {
  const { toggleColorMode, colorMode } = useColorMode()
  const [state, setState] = useState(contextDefaultValue.state)

  const value = useMemo(() => ({
    theme: colorMode,
    state: state,
    setState: (st: string) => setState(st),
    toggleTheme: (t?: ThemeType | undefined) => {
      if(t === 'dark' || t === 'light'){
        if(colorMode !== t) toggleColorMode()
      }else{
        toggleColorMode()
      }
    }
  }), [colorMode, state])
  return <DashboardContext.Provider value={value}>
    {children}
  </DashboardContext.Provider>
}
