import React from "react"
import tw from "twin.macro"
import { useSpring, animated } from "react-spring"
import Link from "./Link"

const ButtonLink = ({ primary, white, green, blue, children, ...props }) => {
  const [hover, set] = useSpring(() => ({
    transform: "scale(1)",
  }))

  const grow = () => {
    set({ transform: "scale(1.05)" })
  }

  const shrink = () => {
    set({ transform: "scale(1)" })
  }

  // const AnimatedLink = animated(Link)

  return (
    <Link
      {...props}
      tw="inline-block"
      onFocus={() => grow()}
      onBlur={() => shrink()}
      onMouseEnter={() => grow()}
      onMouseLeave={() => shrink()}
    >
      <animated.div
        primary={primary}
        white={white}
        green={green}
        blue={blue}
        css={[
          tw`py-3 px-5 mr-3 mt-2 border-2 border-white outline-none! rounded-lg font-semibold uppercase`,
          primary
            ? tw`bg-dgRed-500 border-dgRed-500 text-dgRed-100`
            : white
            ? tw`bg-white text-gray-900`
            : green
            ? tw`bg-dgGreen-500 border-dgGreen-500 text-dgGreen-100`
            : blue
            ? tw`bg-dgBlue-500 border-dgBlue-500 text-dgBlue-100`
            : tw`bg-transparent text-white`,
        ]}
        style={{ willChange: "transform", ...hover }}
      >
        {children}
      </animated.div>
    </Link>
  )
}

export default ButtonLink
