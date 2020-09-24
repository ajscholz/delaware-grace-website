import { useRef, useEffect } from "react"
import { useSpring } from "react-spring"

const useHorizontalScroll = () => {
  const ref = useRef(null)

  const [, setX] = useSpring(() => ({
    config: { mass: 320, tension: 150, friction: 10, clamp: true },
  }))

  useEffect(() => {
    const scroll = coord => {
      setX({
        x: coord,
        reset: true,
        from: { x: 0 },
        delay: 1000,
        onFrame: props => ref.current.scroll(props.x, 0),
      })
    }

    const scrollWidth = ref.current.scrollWidth
    const clientWidth = ref.current.clientWidth
    if (scrollWidth > clientWidth) scroll(scrollWidth)
  }, [ref, setX])

  return { ref }
}

export default useHorizontalScroll
