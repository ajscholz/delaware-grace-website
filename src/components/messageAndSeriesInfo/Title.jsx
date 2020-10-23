import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

const Title = props => {
  return (
    <h1 tw="text-4xl md:text-5xl leading-tight text-gray-100">{props.title}</h1>
  )
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Title
