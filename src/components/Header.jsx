import React, { useState, useEffect } from "react"
// import { Link } from "gatsby"
import LogoNoTag from "./images/LogoNoTag"
import tw from "twin.macro"
import { Link } from "gatsby"
import { MdClose, MdMenu } from "react-icons/md"
import { useSpring, useTransition, animated, config } from "react-spring"
import NavLink from "./NavLink"

const links = [
  { text: "Connect", to: "/connect" },
  { text: "Messages", to: "/messages" },
  { text: "Daycare", to: "/daycare" },
  { text: "Outreach", to: "/outreach" },
  { text: "Plan A Visit", to: "/plan-a-visit" },
]

const Overlay = tw.div`
  md:hidden fixed z-40 bg-black bg-opacity-75 inset-0 
`

const Navigation = tw.nav`
  hidden md:block text-sm font-semibold text-gray-700
`

const MobileNav = tw.nav`
  md:hidden fixed text-lg top-0 right-0 h-full w-3/5 p-8 flex flex-col items-end bg-white z-50
`

const CloseButton = tw.button`relative top-0 right-0 mb-8 text-2xl`
const MenuButton = tw.button`md:hidden text-3xl`

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [hoverNav, setHoverNav] = useState(false)

  // const fadeText = useSpring({
  //   opacity: hoverNav ? 0.5 : 1,
  //   config: config.wobbly,
  // })

  // const props = useSpring({ opacity: mobileOpen ? 1 : 0 })
  const transitions = useTransition(mobileOpen, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const slideTransitions = useTransition(mobileOpen, null, {
    from: { position: "absolute", transform: "translateX(100%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(100%)" },
  })

  useEffect(() => {
    const body = document.getElementsByTagName("body")[0]
    if (mobileOpen === true) body.setAttribute("class", "overflow-y-hidden")
    if (mobileOpen === false) body.removeAttribute("class")
  }, [mobileOpen])

  const hover = () => setHoverNav(true)
  const fade = () => setHoverNav(false)

  const AnimatedOverlay = animated(Overlay)
  const AnimatedMobileNav = animated(MobileNav)
  // const AnimatedNavLink = animated(NavLink)

  return (
    <header className="h-20 bg-white overflow-hidden shadow-lg z-10">
      <div className="max-w-screen-lg mx-auto py-3 px-8 h-full overflow-hidden flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <LogoNoTag className="h-full" />
        </Link>
        <Navigation
          onMouseOver={() => hover()}
          onMouseLeave={() => fade()}
          onFocus={() => hover()}
          onBlur={() => fade()}
        >
          {links.map(link => (
            <NavLink key={link.to} to={link.to} fade={hoverNav}>
              {link.text}
            </NavLink>
          ))}
        </Navigation>
        <MenuButton onClick={() => setMobileOpen(true)}>
          <MdMenu />
        </MenuButton>
        {/* {mobileOpen && (
          <> */}
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <AnimatedOverlay
                key={key}
                style={props}
                onClick={() => setMobileOpen(false)}
                role="button"
              />
            )
        )}
        {/* <AnimatedOverlay style={props} /> */}
        {slideTransitions.map(
          ({ item, key, props }) =>
            item && (
              <AnimatedMobileNav key={key} style={props}>
                <CloseButton onClick={() => setMobileOpen(!mobileOpen)}>
                  <MdClose />
                </CloseButton>
                <div
                  className="flex flex-col items-end"
                  onMouseOver={() => hover()}
                  onMouseLeave={() => fade()}
                  onFocus={() => hover()}
                  onBlur={() => fade()}
                >
                  {links.map(link => (
                    <NavLink
                      fade={hoverNav}
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.text}
                    </NavLink>
                  ))}
                </div>
              </AnimatedMobileNav>
            )
        )}
        {/* <AnimatedMobileNav>
          
        </MobileNav> */}
        {/* </>
        )} */}
      </div>
    </header>
  )
}

export default Header
