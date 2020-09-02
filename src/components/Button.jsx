import React, { useState } from "react"
import tw, { styled } from "twin.macro"
import { useSpring, animated } from "react-spring"

const Button = ({ primary, white, children }, props) => {
  const [state, setState] = useState(false)
  const scale = useSpring({
    transform: state ? "scale(1.05)" : "scale(1)",
  })

  // const AnimatedButtonBase = animated(ButtonBase)

  return (
    <AnimatedButton
      primary={primary}
      white={white}
      onFocus={() => setState(true)}
      onBlur={() => setState(false)}
      onMouseOver={() => setState(true)}
      onMouseOut={() => setState(false)}
      style={scale}
      {...props}
    >
      {children}
    </AnimatedButton>
  )
}

export default Button

const AnimatedButton = animated(
  styled.button(({ primary, white }) => [
    tw`py-3 px-5 mr-3 mt-2 border-2 border-white outline-none!`,
    primary
      ? tw`bg-dgRed border-dgRed text-red-100`
      : white
      ? tw`bg-white text-gray-900`
      : tw`bg-transparent text-white`,
    tw`rounded-lg font-semibold uppercase`,
  ])
)