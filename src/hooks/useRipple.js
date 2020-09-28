import { useRef, useEffect } from "react"
import { useSpring, animated, config as rsConfig } from "react-spring"

// bind ref to an element
// set up click listener for that element
// get position of the element
// get position of click inside element
// animate from that click
// stop everything on unmount

const config = { config: { ...rsConfig.gentle, clamp: true } }

const useRipple = () => {
  const ref = useRef()
  const ref2 = useRef()

  const [clickSpring, set, stop] = useSpring(() => ({
    from: {
      opacity: 0.6,
      height: "10px",
      width: "10px",
      transform: "scale(0)",
    },
    reset: true,
    onRest: () => {
      ref2.current.style.transform = "scale(0)"
    },
    ...config,
  }))

  useEffect(() => {
    const el = ref.current
    const el2 = ref2.current

    const click = e => {
      el2.style.top = `${e.offsetY}px`

      el2.style.left = `${e.offsetX}px`

      // el.getBoundingClientRect()
      set({
        to: [
          {
            opacity: 0,
            transform: "scale(30)",
          },
        ],
      })
    }

    el.addEventListener("mousedown", click)

    return () => {
      stop()
      el.removeEventListener("mousedown", click)
    }
  }, [ref, set, stop])

  return [{ ref }, ref2, clickSpring, animated]
}

export default useRipple
