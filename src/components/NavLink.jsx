import React from "react"
import { Link } from "gatsby"
import tw from "twin.macro"

const StyledLink = tw(
  Link
)`mx-0 my-3 md:mx-3 md:my-0 relative md:transition-colors md:duration-500 md:ease-in-out hocus:text-gray-700 outline-none`
const activeStyles = `border-b-2 border-current`

const NavLink = ({ children, click, ...props }) => {
  return (
    <StyledLink activeClassName={activeStyles} {...props}>
      {children}
    </StyledLink>
  )
}

export default NavLink
