import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import Title from "../Title"
import RichText from "../RichText"

const TextSection = props => {
  const { section } = props
  return (
    <Section key={section.id}>
      <Container>
        <Padding tw="py-16">
          <Title
            tw="text-5xl text-gray-800 relative after:(content absolute w-full bottom-0 mb-1 left-0 h-2 bg-dgBlue-500)"
            style={{ width: "max-content" }}
          >
            {section.title}
          </Title>
          <div tw="mt-3">
            <RichText>{section.text.json}</RichText>
          </div>
        </Padding>
      </Container>
    </Section>
  )
}

TextSection.propTypes = {
  section: PropTypes.object.isRequired,
}

export default TextSection

export const query = graphql`
  fragment TextSectionFragment on ContentfulTextSection {
    id: contentful_id
    title
    text {
      json
    }
  }
`
