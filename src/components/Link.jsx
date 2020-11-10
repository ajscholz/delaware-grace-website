import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { Link as GatsbyLink, navigate } from "gatsby"

// let base = "https://delawaregrace.org"

// if (typeof "window" !== undefined) {
//   // console.log(new URL(window.location))
//   const location = new URL(window.location)
//   base = location.origin
// }

const Link = ({ to, children, ...props }) => {
  // const navigate = (e, element) => {
  //   if (indexPage === true) {
  //     e.preventDefault()
  //     scrollToSection(e, element)
  //   }
  //   closeMenu()
  // }

  // const scrollToSection = (e, element) => {
  //   e.preventDefault()

  //   if (typeof element === "number") {
  //     window.scrollBy({ left: 0, top: -element })
  //     return
  //   }

  //   const node = document.getElementById(element)
  //   const scrollTo = node.getBoundingClientRect().top - navHeight.current
  //   if (typeof "window" !== undefined) {
  //     window.scrollBy({ left: 0, top: scrollTo, behavior: "smooth" })
  //   }
  // }

  if (to.startsWith("/")) {
    if (to.includes("#")) {
      return (
        <a
          href={to}
          {...props}
          onClick={e => {
            e.preventDefault()
            navigate(to)
          }}
        >
          {children}
        </a>
      )
    } else {
      return (
        <GatsbyLink to={to} {...props}>
          {children}
        </GatsbyLink>
      )
    }
  }

  const url = new URL(to)
  const internal =
    url.host === ("delaware-grace.netlify.app" || "delawaregrace.org")
      ? true
      : false

  return internal ? (
    <GatsbyLink
      to={url.pathname}
      {...props}
      tw="focus:(outline-none shadow-outline border-dgBlue-500)"
    >
      {children}
    </GatsbyLink>
  ) : (
    <a
      href={url.href}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
      tw="focus:(outline-none shadow-outline border-dgBlue-500)"
    >
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Link
