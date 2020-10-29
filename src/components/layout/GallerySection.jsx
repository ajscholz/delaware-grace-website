import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
// import Title from "../Title"
import ImageWithFocalPoint from "../ImageWithFocalPoint"
import CardBase from "../cards/CardBase"

const Gallery = ({ images }) => {
  return (
    <div tw="flex flex-wrap -mx-4">
      {images.map(image => (
        <div tw="w-full sm:w-1/2 md:w-1/3 px-4" key={image.id}>
          <CardBase tw="h-56">
            <ImageWithFocalPoint image={image} />
          </CardBase>
        </div>
      ))}
    </div>
  )
}

const GallerySection = props => {
  const { section } = props
  return (
    <Section key={section.id}>
      <Container>
        <Padding tw="py-16">
          {/* <Title
            tw="text-5xl text-gray-800 relative after:(content absolute w-full bottom-0 mb-1 left-0 h-2 bg-dgBlue-500)"
            style={{ width: "max-content" }}
          >
            {section.title}
          </Title> */}
          <Gallery images={section.images} />
        </Padding>
      </Container>
    </Section>
  )
}

GallerySection.propTypes = { section: PropTypes.object.isRequired }

export default GallerySection

export const query = graphql`
  fragment GallerySectionFragment on ContentfulGallerySection {
    id: contentful_id
    title
    images {
      ...ImageWithFocalPointFragment
    }
  }
`
