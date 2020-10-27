import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import Image from "gatsby-image/withIEPolyfill"
import getImagePosition from "../utils/functions/getImagePosition"

const FocalPointImage = props => {
  const position = getImagePosition(
    props.image.file.details.image,
    props.focalPoint
  )

  return (
    <Image
      fluid={props.image.fluid}
      alt={props.alt}
      tw="absolute h-full w-full object-cover"
      style={{ objectPosition: position }}
      objectPosition={position}
    />
  )
}

FocalPointImage.propTypes = {
  focalPoint: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
  image: PropTypes.shape({
    file: {
      details: {
        image: {
          height: PropTypes.number.isRequired,
          width: PropTypes.number.isRequired,
        },
      },
    },
    fluid: PropTypes.object.isRequired,
  }).isRequired,
  alt: PropTypes.string.isRequired,
}

export default FocalPointImage
