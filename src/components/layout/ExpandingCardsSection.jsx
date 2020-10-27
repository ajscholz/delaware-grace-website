import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import ExpandingCard from "../cards/ExpandingCard"
import CardGrid from "../layout/CardGrid"
import { graphql } from "gatsby"

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
          <Padding>
            <CardGrid>
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
        cards {
          ...ExpandingCardFragment
        }
      }
    }
  }
`
