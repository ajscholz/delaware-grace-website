import React from "react"
import PropTypes from "prop-types"
import { animated } from "react-spring"
import { useHocus } from "../hooks/useHocus"

const AnimatedButton = ({
  style,
  hocusStyles,
  children,
  grow,
  scale,
  ...rest
}) => {
  const [hocus, styles] = useHocus(hocusStyles, grow, scale)

  return (
    <animated.button
      tw="hocus:outline-none"
      onFocus={() => hocus(true)}
      onBlur={() => hocus(false)}
      onMouseEnter={() => hocus(true)}
      onMouseLeave={() => hocus(false)}
      style={{
        willChange: "border, transform",
        left: "-2px",
        ...style,
        ...styles,
      }}
      {...rest}
    >
      {children}
    </animated.button>
  )
}

AnimatedButton.propTypes = {
  style: PropTypes.object,
  hocusStyles: PropTypes.object,
  children: PropTypes.node.isRequired,
  grow: PropTypes.bool.isRequired,
  scale: PropTypes.string.isRequired,
}

AnimatedButton.defaultProps = {
  grow: true,
  scale: "1.2",
}

export default AnimatedButton
