import React, { useState } from "react"
// import { Link } from "gatsby"
import LogoNoTag from "./images/LogoNoTag"
import tw from "twin.macro"
import { Link } from "gatsby"
import { MdClose, MdMenu } from "react-icons/md"

const links = [
  { text: "Connect", to: "/connect" },
  { text: "Messages", to: "/messages" },
  { text: "Daycare", to: "/daycare" },
  { text: "Outreach", to: "/outreach" },
  { text: "Plan A Visit", to: "/plan-a-visit" },
]

const Navigation = tw.nav`
  hidden md:block text-sm font-semibold text-gray-700
`

const MobileNav = tw.div`
  md:hidden fixed text-lg top-0 right-0 h-full w-3/4 p-8 flex flex-col items-end bg-white z-50 shadow-lg
`

const CloseButton = tw.button`relative top-0 right-0 mb-8 text-2xl`
const MenuButton = tw.button`md:hidden text-3xl`

const NavLink = tw(Link)`
  mx-0 my-3 md:mx-3 md:my-0
`

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)

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
        <MenuButton>
          <MdMenu onClick={() => setMobileOpen(true)} />
        </MenuButton>
        {mobileOpen && (
          <MobileNav>
            <CloseButton onClick={() => setMobileOpen(false)}>
              <MdClose />
            </CloseButton>
            {links.map(link => (
              <NavLink key={link.to} to="link.to">
                {link.text}
              </NavLink>
            ))}
          </MobileNav>
        )}
      </div>
    </header>
  )
}

export default Header
