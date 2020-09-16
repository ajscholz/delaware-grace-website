import React from "react"
import tw, { styled } from "twin.macro"
import { useSpring, animated } from "react-spring"

const Button = ({ primary, white, green, children, ...props }) => {
  const [hover, set] = useSpring(() => ({
    transform: "scale(1)",
  }))

  const grow = () => {
    set({ transform: "scale(1.05)" })
  }

  const shrink = () => {
    set({ transform: "scale(1)" })
  }

  return (
    <AnimatedButton
      primary={primary}
      white={white}
      green={green}
      onFocus={() => grow()}
      onBlur={() => shrink()}
      onMouseEnter={() => grow()}
      onMouseLeave={() => shrink()}
      style={hover}
      {...props}
    >
      {children}
    </AnimatedButton>
  )
}

export default Button

const AnimatedButton = animated(
  styled.button(({ primary, white, green }) => [
    tw`py-3 px-5 mr-3 mt-2 border-2 border-white outline-none!`,
    primary
      ? tw`bg-dgRed-500 border-dgRed-500 text-dgRed-100`
      : white
      ? tw`bg-white text-gray-900`
      : green
      ? tw`bg-dgGreen-500 border-dgGreen-500 text-dgGreen-100`
      : tw`bg-transparent text-white`,
    tw`rounded-lg font-semibold uppercase`,
  ])
)
