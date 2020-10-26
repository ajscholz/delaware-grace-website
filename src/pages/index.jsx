import React from "react"

import SEO from "../components/SEO"
import { graphql } from "gatsby"
import IndexCard from "../components/cards/IndexCard"
import tw from "twin.macro"

import Container from "../components/Container"
import InfoChip from "../components/InfoChip"
import ButtonLink from "../components/ButtonLink"
import LinkGroup from "../components/LinkGroup"

const IndexPage = ({ data }) => {
  const { page, messages } = data
  const message = messages.all[0]
  const { body } = page

  const linkGroups = []
  const allCards = []
  body.forEach(item => {
    if (item.internal.type === "ContentfulLinkGroup") {
      linkGroups.push(item)
    } else if (item.internal.type === "ContentfulCard") {
      allCards.push(item)
    }
  })

  const headerCard = allCards[0]
  const cards = [...allCards].slice(1)

  return (
    <Container tw="pb-12">
      <SEO title="Home" />

      {/* PLAN A VISIT */}
      <div className="pt-3">
        {/* <TestButton /> */}
        <IndexCard overlay large card={headerCard} alt={"calendar"}>
          <Title>{headerCard.title}</Title>
          <Subtitle>{headerCard.subtitle}</Subtitle>
          <ButtonLink green to={headerCard.button.link}>
            {headerCard.button.text}
          </ButtonLink>
        </IndexCard>
      </div>

      <FlexContainer>
        <LeftCol>
          {/* LATEST MESSAGE CARD */}
          <IndexCard card={message} message>
            <InfoChip>Latest Message</InfoChip>
            <Title>{message.title}</Title>
            {/* <div tw="flex"> */}
            <ButtonLink
              tw="mr-3"
              to={`https://delaware-grace.netlify.app/messages/series/${message.series.slug}/${message.slug}`}
              primary
            >
              Watch Message
            </ButtonLink>
            <ButtonLink to="https://delaware-grace.netlify.app/messages">
              View More Messages
            </ButtonLink>
          </IndexCard>

          {cards.map(card => (
            <IndexCard overlay key={card.id} card={card} alt={"calendar"}>
              <Title>{card.title}</Title>
              <Subtitle>{card.subtitle}</Subtitle>

              <ButtonLink to={card.button.link} white>
                {card.button.text}
              </ButtonLink>
            </IndexCard>
          ))}
        </LeftCol>

        <RightCol>
          {linkGroups.map(group => (
            <LinkGroup groupData={group} key={group.id} />
          ))}
        </RightCol>
      </FlexContainer>
    </Container>
  )
}

export default IndexPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Home" }) {
      body {
        ... on ContentfulCard {
          ...CardFragment
        }
        ... on ContentfulLinkGroup {
          ...LinkGroupFragment
        }
      }
    }
    messages: allContentfulMessage(
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      all: nodes {
        title
        slug
        thumbnail {
          image: childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
        series {
          slug
        }
      }
    }
  }
`

const FlexContainer = tw.div`flex flex-col md:flex-row`

const LeftCol = tw.div`w-full md:w-2/3`

const RightCol = tw.div`md:w-1/3 mt-5 md:ml-5`

const Title = tw.h1`text-white text-5xl ml-1`

const Subtitle = tw.p`text-gray-200 text-lg ml-1`
