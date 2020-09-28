import React from "react"
import useRipple from "../hooks/useRipple"
import "twin.macro"

const TestButton = () => {
  const [ref1, ref2, clickSpring, animated] = useRipple()
  return (
    <button
      tw="relative bg-dgBlue-500 px-8 py-3 rounded-lg text-xl font-semibold text-dgBlue-100 active:outline-none focus:outline-none overflow-hidden"
      {...ref1}
    >
      Click Me!
      <animated.span
        tw="absolute bg-dgBlue-100 rounded-full"
        style={{ ...clickSpring }}
        ref={ref2}
      />
    </button>
  )
}

export default TestButton
