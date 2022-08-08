import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import "twin.macro"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import Title from "../Title"
import CardBase from "../cards/CardBase"
import FocalPointImage from "../FocalPointImage"
import ButtonLink from "../ButtonLink"

const ActionSection = ({ section }) => {
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
          <div tw="grid grid-cols-1 sm:(grid-cols-2) gap-6 mt-6">
            <CardBase tw="h-56 mt-0 shadow-none">
              <FocalPointImage
                image={section.image}
                alt=""
                focalPoint={section.focalPoint.focalPoint}
              />
            </CardBase>
            <div tw="h-full flex flex-col items-start">
              <p tw="text-gray-700">{section.text.text}</p>
              {section.actionButton && (
                <ButtonLink tw="mt-4" primary to={section.actionButton.link}>
                  {section.actionButton.text}
                </ButtonLink>
              )}
            </div>
          </div>
        </Padding>
      </Container>
    </Section>
  )
}

ActionSection.propTypes = {
  section: PropTypes.object.isRequired,
}

export default ActionSection

export const query = graphql`
  fragment ActionSectionFragment on ContentfulActionSection {
    id: contentful_id
    title
    slug
    text {
      text
    }
    image {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      file {
        details {
          image {
            width
            height
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
    actionButton {
      text
      link
    }
  }
`
