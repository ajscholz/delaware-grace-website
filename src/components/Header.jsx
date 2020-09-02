/** @jsx jsx */

// import { Link } from "gatsby"
// import React from "react"
import LogoNoTag from "./images/LogoNoTag"
import tw from "twin.macro"
import { Link } from "gatsby"
import NavLink from "./NavLink"
import SideDrawer from "./SideDrawer"
import { jsx, css } from "@emotion/core"

const links = [
  { text: "Connect", to: "/connect" },
  { text: "Messages", to: "/messages" },
  { text: "Daycare", to: "/daycare" },
  { text: "Outreach", to: "/outreach" },
  { text: "Plan A Visit", to: "/plan-a-visit" },
]

const navStyle = css`
  ${tw`hidden md:flex md:flex-row text-sm font-semibold transition-colors duration-200 ease-in-out text-gray-700 hover:text-gray-500 focus-within:text-gray-500`}/* :hover {
    & > a > div {
      ${tw`border-gray-500`}
    }
  } */
`

const Header = () => {
  return (
    <header className="h-20 bg-white overflow-hidden shadow-lg z-10">
      <div className="max-w-screen-lg mx-auto py-3 px-8 h-full overflow-hidden flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <LogoNoTag className="h-full" />
        </Link>
        <nav css={navStyle}>
          {links.map((link, i) => (
            <NavLink key={link.to} to={link.to}>
              {link.text}
            </NavLink>
          ))}
        </nav>

        <SideDrawer links={links} />
      </div>
    </header>
  )
}

export default Header
