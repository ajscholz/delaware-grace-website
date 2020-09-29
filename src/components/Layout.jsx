/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useRef } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import "twin.macro"

import Header from "./Header"
import Footer from "./Footer"
import { useTransition, useSpring, animated } from "react-spring"

const Layout = ({ children }) => {
  // ref to help optimize page transitions
  const key = useRef()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  const [, setY] = useSpring(() => ({ y: 0 }))

  const pageTransition = useTransition(children, children => children.key, {
    from: { position: "relative", opacity: 0, willChange: "opacity", y: 0 },
    enter: { opacity: 1, y: 0 },
    leave: { position: "absolute", opacity: 0 },
    unique: true,
    onStart: props => {
      if (typeof key.current === "undefined") {
        key.current = props.key
      } else {
        if (typeof window !== "undefined") {
          if (window.scrollY !== 0) {
            console.log("animating")
            setY({
              from: { y: window.scrollY },
              to: { y: 0 },
              reset: true,
              onFrame: props => {
                window.scroll(0, props.y)
              },
            })
          }
        }
        key.current = props.key
      }
    },
  })

  return (
    <div className="flex flex-col min-h-screen relative">
      <Header siteTitle={data.site.siteMetadata.title} />
      {pageTransition.map(({ item, props, key }) => (
        <animated.div key={key} style={{ ...props }} tw="w-full">
          <main className="mt-20 mb-auto">{item}</main>
          <Footer />
        </animated.div>
      ))}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default React.memo(Layout)
