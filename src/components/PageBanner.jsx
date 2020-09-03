import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import tw from "twin.macro"
import Overlay from "./Overlay"

const PageBanner = ({ image, text, overlay }) => {
  return (
    <div className="relative -mx-8 overflow-hidden h-64">
      <Image fluid={image.fluid} className="h-full" />
      {overlay && <Overlay />}
      <div
        css={[
          tw`absolute inset-0 flex flex-col justify-end items-center p-4 md:mb-6 text-center`,
        ]}
      >
        <h1 className="text-white text-4xl md:text-5xl">{text.title}</h1>
        <p className="text-white md:text-xl -mt-2 md:-mt-3 text-gray-200">
          {text.subtitle}
        </p>
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
        }
      }
    }
  }
`
