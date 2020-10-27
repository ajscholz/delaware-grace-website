import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import ExpandingCard from "../cards/ExpandingCard"
import CardGrid from "../layout/CardGrid"
import { graphql } from "gatsby"
import Title from "../Title"

const ExpandingCardsSection = props => {
  const sections = props.data.expandingCards.filter(
    section => section.__typename === "ContentfulExpandingCardsSection"
  )

  return sections.map(section => {
    const expandingCards = section.cards.filter(
      item => item.internal.type === "ContentfulExpandingCard"
    )
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
            <CardGrid tw="mt-8">
              {expandingCards.map(card => (
                <ExpandingCard key={card.id} card={card} />
              ))}
            </CardGrid>
          </Padding>
        </Container>
      </Section>
    )
  })
}

ExpandingCardsSection.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ExpandingCardsSection

export const query = graphql`
  fragment ExpandingCardsSectionFragment on ContentfulPage {
    expandingCards: body {
      ... on ContentfulExpandingCardsSection {
        id: contentful_id
        title
        cards {
          ...ExpandingCardFragment
        }
      }
    }
  }
`
