import React, { useState } from "react"
import tw from "twin.macro"
import { useSpring, animated } from "react-spring"
import { Link } from "gatsby"

const NavLink = ({ children, fade, ...props }) => {
  const [hoverLink, setHoverLink] = useState(false)
  const fadeText = useSpring({ opacity: hoverLink ? 1 : fade ? 0.5 : 1 })

  const AnimatedLink = animated(TailwindNavLink)
  return (
    <AnimatedLink
      onMouseEnter={() => setHoverLink(true)}
      onFocus={() => setHoverLink(true)}
      onMouseLeave={() => setHoverLink(false)}
      onBlur={() => setHoverLink(false)}
      style={fadeText}
      {...props}
    >
      {children}
    </AnimatedLink>
  )
}

export default NavLink

const TailwindNavLink = tw(Link)`
  mx-0 my-3 md:mx-3 md:my-0
`
