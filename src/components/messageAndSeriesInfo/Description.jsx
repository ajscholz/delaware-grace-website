import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

const Description = props => {
  return (
    <>
      <hr tw="w-1/5 my-6 border-gray-700" />
      <div tw="text-gray-200">{props.children}</div>
    </>
  )
}

Description.propTypes = {
  children: PropTypes.element,
}

export default Description
