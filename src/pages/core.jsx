import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"
import Section from "../components/Section"
import Container from "../components/Container"
import Padding from "../components/Padding"
import ExpandingCard from "../components/cards/ExpandingCard"
import CardGrid from "../components/layout/CardGrid"

const CorePage = ({ data }) => {
  const { page } = data

  const expandingCards = page.body.filter(
    item => item.internal.type === "ContentfulExpandingCard"
  )

  return (
    <>
      <SEO
        title="Core"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />

      <Section>
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
    </>
  )
}

export default CorePage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Core" }) {
      ...PageBannerFragment
      body {
        ... on ContentfulExpandingCard {
          ...ExpandingCardFragment
        }
      }
    }
  }
`
