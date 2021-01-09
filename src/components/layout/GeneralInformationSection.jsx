import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import Title from "../Title"

const GeneralInformationSection = ({ section }) => {
  return (
    <Section key={section.id} id={section.slug}>
      <Container>
        <Padding tw="py-16">
          <Title
            tw="text-5xl text-gray-800 relative after:(content absolute w-full bottom-0 mb-1 left-0 h-2 bg-dgBlue-500)"
            style={{ width: "max-content" }}
          >
            {section.title}
          </Title>
        </Padding>
      </Container>
    </Section>
  )
}

GeneralInformationSection.propTypes = {
  section: PropTypes.object.isRequired,
}

export default GeneralInformationSection

export const query = graphql`
  fragment GeneralInformationSectionFragment on ContentfulGeneralInformationSection {
    id: contentful_id
    title
    slug
  }
`
