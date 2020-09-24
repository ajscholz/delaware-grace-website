import { useRef, useEffect } from "react"
import { useSpring } from "react-spring"
import { theme } from "twin.macro"

const baseColor = theme`colors.gray.600`

const useHocus2 = () => {
  // const [hocusing, setHocusing] = useState(false)
  const ref = useRef(null)

  const [animation, set] = useSpring(() => ({
    color: baseColor,
  }))

  const hocus = () => set({ color: theme`colors.gray.500` })

  const blur = () => set({ color: baseColor })

  useEffect(() => {
    ref.current.addEventListener("focusin", hocus)
    ref.current.addEventListener("mouseover", hocus)
    ref.current.addEventListener("blur", blur)
    ref.current.addEventListener("mouseout", blur)
    return () => {
      ref.current.removeEventListener("focusin", hocus)
      ref.current.removeEventListener("mouseover", hocus)
      ref.current.removeEventListener("blur", blur)
      ref.current.removeEventListener("mouseout", blur)
    }
  }, [ref])

  return [{ ref }, animation]
}

export default useHocus2
