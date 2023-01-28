import { useState } from "react"

export const useToggle = (init: boolean): [boolean, (val?: boolean) => void] => {
  const [state, setState] = useState(init)
  const toggle = (val?: boolean) => {
    if(val){
      setState(val)
    }else{
      setState(s => !s)
    }
  }

  return [state, toggle]
}
