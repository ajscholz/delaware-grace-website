import React from "react"
import tw from "twin.macro"
import CardBase from "./CardBase"
// import Image from "gatsby-image"
import VideoImage from "../VideoImage"
import { graphql } from "gatsby"
import Overlay from "../Overlay"
import Image from "gatsby-image"

const ContentContainer = tw.div`absolute bottom-0 ml-4 mb-4 leading-tight`

const classes = "absolute h-full w-full object-cover"

const IndexCard = ({ video, large, image, children, overlay }, props) => {
  return (
    <CardBase large={large}>
      {video ? (
        <VideoImage
          url={video}
          alt="Latest message at Delaware Grace"
          className="classes"
        />
      ) : (
        <Image fluid={image.fluid} alt={props.alt} className={classes} />
      )}
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
    imageFocalPoint {
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
