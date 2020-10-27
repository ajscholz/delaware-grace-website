import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"
import { useSpring, animated } from "react-spring"
import Link from "./Link"

const ButtonLink = props => {
  const { primary, white, green, blue, children, ...rest } = props
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
      {...rest}
      tw="inline-block"
      onFocus={() => grow()}
      onBlur={() => shrink()}
      onMouseEnter={() => grow()}
      onMouseLeave={() => shrink()}
    >
      <animated.div
        css={[
          tw`py-3 px-5 mt-2 border-2 border-white outline-none! rounded-lg font-semibold uppercase`,
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

ButtonLink.propTypes = {
  primary: PropTypes.bool,
  white: PropTypes.bool,
  green: PropTypes.bool,
  blue: PropTypes.bool,
}

ButtonLink.defaultProps = {
  primary: false,
  white: false,
  green: false,
  blue: false,
}

export default ButtonLink
