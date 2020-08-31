import React from "react"
// import { Link } from "gatsby"
import LogoNoTag from "./images/LogoNoTag"
import tw from "twin.macro"
import { Link } from "gatsby"

const links = [
  { text: "Connect", to: "/connect" },
  { text: "Messages", to: "/messages" },
  { text: "Daycare", to: "/daycare" },
  { text: "Outreach", to: "/outreach" },
  { text: "Plan A Visit", to: "/plan-a-visit" },
]

const Navigation = tw.nav`
 text-sm font-semibold text-gray-700
`

const NavLink = tw(Link)`
  mx-3
`

const Header = () => {
  return (
    <header className="h-20 bg-white overflow-hidden shadow-lg z-10">
      <div className="max-w-screen-lg mx-auto py-3 px-8 h-full overflow-hidden flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <LogoNoTag className="h-full" />
        </Link>
        <Navigation>
          {links.map(link => (
            <NavLink key={link.to} to="link.to">
              {link.text}
            </NavLink>
          ))}
        </Navigation>
      </div>
    </header>
  )
}

export default Header
