import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ to, children, ...props }) => {
  const url = new URL(to)

  const internal =
    url.host === ("delaware-grace.netlify.app" || "delawaregrace.org")
      ? true
      : false

  return internal ? (
    <GatsbyLink to={url.pathname} {...props}>
      {children}
    </GatsbyLink>
  ) : (
    <a href={url.href} {...props}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Link
