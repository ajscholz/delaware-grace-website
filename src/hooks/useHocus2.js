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

  useEffect(() => {
    const el = ref.current
    console.log("el", el)
    // el = ref.current
    const hocus = () => set({ color: theme`colors.gray.500` })
    const blur = () => set({ color: baseColor })

    el.addEventListener("focusin", hocus)
    el.addEventListener("mouseover", hocus)
    el.addEventListener("blur", blur)
    el.addEventListener("mouseout", blur)
    return () => {
      el.removeEventListener("focusin", hocus)
      el.removeEventListener("mouseover", hocus)
      el.removeEventListener("blur", blur)
      el.removeEventListener("mouseout", blur)
    }
  })

  return [{ ref }, animation]
}

export default useHocus2
