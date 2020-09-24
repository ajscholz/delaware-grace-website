import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"
import tw, { css } from "twin.macro"
import { animated } from "react-spring"
import useHocus2 from "../hooks/useHocus2"
import useHorizontalScroll from "../hooks/useHorizontalScroll"

const BreadcrumbText = ({ crumb, children }) => {
  const [bind, animation] = useHocus2()

  console.log("bind", bind)

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
  const scrollRef = useHorizontalScroll()

  const crumbs = path
    .split("/")
    .filter(item => item !== "")
    .map(item => `/${item}`)

  return (
    <nav
      {...scrollRef}
      css={[
        tw`relative overflow-x-scroll pb-2`,
        // tw`after:(absolute top-0 bottom-0 w-20 bg-gradient-to-l from-gray-900 via-gray-900)`,
        // css`
        //   &::after {
        //     content: "";
        //     right: -20px;
        //   }
        // `,
      ]}
    >
      <ul tw="flex text-gray-500 font-semibold text-xs">
        {crumbs.map((crumb, i) =>
          i + 1 === crumbs.length ? (
            <li
              key={crumb}
              css={[
                css`
                  &:not(:first-of-type)::before {
                    content: "/";
                  }
                `,
                tw`before:(mx-2 md:mx-3 font-light) cursor-default`,
              ]}
            >
              <span tw="underline">{linkText[i]}</span>
            </li>
          ) : (
            <li
              key={crumb}
              css={[
                css`
                  &:not(:first-of-type)::before {
                    content: "/";
                  }
                `,
                tw`before:(mx-2 md:mx-3 font-light)`,
              ]}
            >
              <BreadcrumbText crumb={crumb}>{linkText[i]}</BreadcrumbText>
            </li>
          )
        )}
      </ul>
    </nav>
  )
}

Breadcrumb.propTypes = {
  path: PropTypes.string.isRequired,
  linkText: PropTypes.arrayOf(PropTypes.string).isRequired,
}

Breadcrumb.defaultProps = {
  linkText: ["Messages", "Series", "Current Series", "Current Message"],
}

export default Breadcrumb
