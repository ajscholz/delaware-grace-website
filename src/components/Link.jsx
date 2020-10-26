import React from "react"
import PropTypes from "prop-types"
import { Link as GatsbyLink } from "gatsby"

const Link = ({ to, children, ...props }) => {
  if (to.startsWith("/")) {
    return (
      <GatsbyLink to={to} {...props}>
        {children}
      </GatsbyLink>
    )
  }

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
    <a href={url.href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

Link.propTypes = {
  to: PropTypes.string.isRequired,
}

export default Link
