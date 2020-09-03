import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image/withIEPolyfill"
import tw from "twin.macro"
import Overlay from "./Overlay"
import getImagePosition from "../utils/functions/getImagePosition"

const PageBanner = ({ banner, overlay }) => {
  const { image, focalPoint, title, subtitle } = banner

  const position = getImagePosition(
    image.file.details.image,
    focalPoint.focalPoint
  )

  return (
    <div css={[tw`relative overflow-hidden h-144`]}>
      <Image
        fluid={image.fluid}
        className="h-full"
        objectPosition={position}
        imgStyle={{ objectPosition: position }}
      />
      {overlay && <Overlay />}
      <div
        css={[
          tw`absolute inset-0 flex flex-col justify-end items-center p-6 text-center`,
        ]}
      >
        <h1 className="text-white text-6xl">{title}</h1>
        {subtitle && (
          <p className="text-white text-xl -mt-3 text-gray-200">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export default PageBanner

export const query = graphql`
  fragment PageBannerFragment on ContentfulPage {
    banner {
      title
      subtitle
      image {
        title
        fluid(maxWidth: 1920, quality: 100) {
          ...GatsbyContentfulFluid_withWebp
        }
        file {
          url
          fileName
          details {
            image {
              height
              width
            }
          }
        }
      }
      focalPoint {
        focalPoint {
          x
          y
        }
      }
    }
  }
`
