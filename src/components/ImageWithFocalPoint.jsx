// NEED TO ADD THIS IS A TYPE IN GATSBY-NODE BEFORE RE-IMPLEMENTING

import React from "react"
import "twin.macro"
import { graphql } from "gatsby"
import Image from "gatsby-image/withIEPolyfill"
import getImagePosition from "../utils/functions/getImagePosition"

const ImageWithFocalPoint = props => {
  // const image = {...props}
  // const position = getImagePosition(
  //   image.image.file.details.image,
  //   image.focalPoint.focalPoint
  // )

  return null

  // return (
  //   <Image
  //     fluid={image.image.fluid}
  //     tw="absolute h-full w-full object-cover"
  //     style={{ objectPosition: position }}
  //     objectPosition={position}
  //   />
  // )
}

export default ImageWithFocalPoint

// export const query = graphql`
//   fragment ImageWithFocalPointFragment on ContentfulImageWithFocalPoint {
//     id: contentful_id
//     image {
//       fluid {
//         src
//       }
//       file {
//         details {
//           image {
//             width
//             height
//           }
//         }
//       }
//     }
//     focalPoint {
//       focalPoint {
//         x
//         y
//       }
//     }
//   }
//`
