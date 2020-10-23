import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

const Container = props => {
  return (
    <div tw="w-full pt-4 flex flex-col md:flex-row justify-center">
      {props.children}
    </div>
  )
}

Container.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Container
