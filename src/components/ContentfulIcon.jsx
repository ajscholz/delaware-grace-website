import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import IconWrapper from "./Icons/IconWrapper"

import colors from "../utils/socialColors"

const getColor = icon => {
  if (icon.includes("Facebook")) return colors.facebook
  if (icon.includes("Twitter")) return colors.twitter
  if (icon.includes("Instagram")) return colors.instagram
  if (icon.includes("Vimeo")) return colors.vimeo
  if (icon.includes("Youtube")) return colors.youtube
  else return ""
}

const ContentfulIcon = props => {
  const color = getColor(props.icon)

  const Icon = require("react-icons/all")[props.icon]
  return (
    <IconWrapper>
      <Icon color={color} />
    </IconWrapper>
  )
}

ContentfulIcon.propTypes = {
  iconName: PropTypes.string.isRequired,
}

export default ContentfulIcon

export const query = graphql`
  fragment ContentfulIconFragment on ContentfulLink {
    icon
  }
`
