import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"

const PageBanner = ({ image, text }) => {
  return (
    <div className="relative -mx-8 h-72 overflow-hidden">
      <Image fluid={image.fluid} />
      <div className="absolute inset-0 flex flex-col justify-end items-center mb-6">
        <h1 className="text-white text-5xl">{text.title}</h1>
        <p className="text-white text-xl -mt-3 text-gray-200">
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
