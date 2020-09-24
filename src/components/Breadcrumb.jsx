import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import tw, { css } from "twin.macro"
import { animated } from "react-spring"
import useHocus2 from "../hooks/useHocus2"

const BreadcrumbText = ({ crumb, children }) => {
  const [bind, animation] = useHocus2()

  const AnimatedLink = animated(Link)
  return (
    <AnimatedLink
      to={crumb}
      key={crumb}
      {...bind}
      style={animation}
      tw="hocus:(outline-none)"
    >
      {children}
    </AnimatedLink>
  )
}

const Breadcrumb = ({ path, linkText }) => {
  const crumbs = path.split("/").map(item => `/${item}`)

  return (
    <nav tw="w-full">
      <ul tw="flex text-gray-500 font-semibold text-xs">
        {crumbs.map((crumb, i) => (
          <li
            css={[
              css`
                &:not(:first-of-type)::before {
                  content: "/";
                }
              `,
              tw`before:(mx-3 font-light)`,
            ]}
          >
            <BreadcrumbText key={crumb} crumb={crumb}>
              {linkText[i]}
            </BreadcrumbText>
          </li>
        ))}
      </ul>
    </nav>
  )
}

Breadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  linkText: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Breadcrumb.defaultProps = {
  linkText: ["Home", "Messages", "Series", "Current Series", "Current Message"],
}

export default Breadcrumb
