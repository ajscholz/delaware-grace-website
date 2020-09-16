import React from "react"
import tw from "twin.macro"
import CardBase from "./CardBase"
// import Image from "gatsby-image"
// import VideoImage from "../VideoImage"
import { graphql } from "gatsby"
import Overlay from "../Overlay"
import Image from "gatsby-image/withIEPolyfill"
import getImagePosition from "../../utils/functions/getImagePosition"

const ContentContainer = tw.div`absolute bottom-0 p-4 leading-tight`

const classes = "absolute h-full w-full object-cover"

const IndexCard = ({ card, message, large, children, overlay }, props) => {
  const position = !message
    ? getImagePosition(
        card.image.file.details.image,
        card.focalPoint.focalPoint
      )
    : undefined

  return (
    <CardBase large={large}>
      <Image
        fluid={message ? card.thumbnail.image.fluid : card.image.fluid}
        alt={props.alt}
        className={classes}
        style={{ objectPosition: position }}
        objectPosition={position}
      />

      {overlay && <Overlay />}
      <ContentContainer>{children}</ContentContainer>
    </CardBase>
  )
}

export default IndexCard

export const query = graphql`
  fragment CardFragment on ContentfulCard {
    id: contentful_id
    title
    subtitle
    image {
      fluid(maxWidth: 1024, quality: 80) {
        ...GatsbyContentfulFluid_withWebp
      }
      file {
        details {
          image {
            height
            width
          }
        }
      }
    }
    focalPoint: imageFocalPoint {
      focalPoint {
        x
        y
      }
    }
    button {
      text
      link
    }
  }
`
