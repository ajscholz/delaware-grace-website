import React, { useState } from "react"
import { useTransition, animated } from "react-spring"
import { MdClose, MdMenu } from "react-icons/md"
import NavLink from "./NavLink"

const SideDrawer = ({ links }) => {
  const [open, setOpen] = useState(false)

  const transitions = useTransition(open, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const slideTransitions = useTransition(open, null, {
    from: { transform: "translateX(100%)" },
    enter: { transform: "translateX(0)" },
    leave: { transform: "translateX(100%)" },
  })

  const openDrawer = () => {
    setOpen(true)
  }

  const closeDrawer = () => {
    setOpen(false)
  }

  return (
    <>
      <button className="md:hidden text-3xl" onClick={() => openDrawer()}>
        <MdMenu />
      </button>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              className="md:hidden fixed z-40 bg-black bg-opacity-75 inset-0 cursor-default"
              key={key}
              style={{ willChange: "opacity", ...props }}
              onClick={() => closeDrawer()}
              role="button"
            />
          )
      )}
      {slideTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={{ willChange: "opacity", ...props }}
              className="md:hidden fixed text-lg top-0 right-0 h-full w-2/3 p-8 flex flex-col items-end bg-white z-50"
            >
              <button
                className="relative top-0 right-0 mb-8 text-2xl"
                onClick={() => closeDrawer()}
              >
                <MdClose />
              </button>
              <nav className="flex flex-col items-end">
                {links.map(link => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => closeDrawer()}
                  >
                    {link.text}
                  </NavLink>
                ))}
              </nav>
            </animated.div>
          )
      )}
    </>
  )
}

export default SideDrawer
