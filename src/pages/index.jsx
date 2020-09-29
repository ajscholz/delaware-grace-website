import React from "react"

import SEO from "../components/SEO"
import { graphql } from "gatsby"
import Link from "../components/Link"
import IndexCard from "../components/cards/IndexCard"
import tw from "twin.macro"
import {
  MdFavoriteBorder,
  MdPeople,
  MdPublic,
  MdFileDownload,
} from "react-icons/md"
import {
  FaFacebookSquare,
  FaVimeoSquare,
  FaTwitterSquare,
} from "react-icons/fa"
import { RiHandHeartFill } from "react-icons/ri"

import Leave from "../components/Leave"
import Container from "../components/Container"
import InfoChip from "../components/InfoChip"
import ButtonLink from "../components/ButtonLink"
import TestButton from "../components/TestButton"

const IndexPage = ({ data }) => {
  const { page, messages } = data
  const message = messages.all[0]
  const { allCards } = page
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
          <ListBox className="bg-white rounded-lg p-4 shadow-md">
            <Row>
              <h1 className="text-3xl">Take A Step</h1>
            </Row>
            <Link
              to="https://www.kindridgiving.com/App/Form/ad729f18-81c6-4c5e-a5ff-60c6c3c50720"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Row>
                <Icon>
                  <MdFavoriteBorder />
                </Icon>
                Give Online
                <Leave />
              </Row>
            </Link>
            <Row>
              <Icon>
                <RiHandHeartFill />
              </Icon>
              Get Involved
            </Row>
            <Row>
              <Icon>
                <MdPeople />
              </Icon>
              Join A Group
            </Row>
            <Link to="https://delaware-grace.netlify.app/outreach">
              <Row>
                <Icon>
                  <MdPublic />
                </Icon>
                Serve Our City
              </Row>
            </Link>
          </ListBox>

          <ListBox>
            <Row>
              <h1 className="text-3xl">Find Us Online</h1>
            </Row>
            <Link
              to={
                ["iPad", "iPhone", "iPod", "MacIntel"].includes(
                  typeof navigator === "undefined" ? "" : navigator.platform
                )
                  ? encodeURI(
                      "https://apps.apple.com/us/app/delaware-grace/id937024336"
                    )
                  : encodeURI(
                      "https://play.google.com/store/apps/details?id=com.subsplash.thechurchapp.s_N7FK79&hl=en_US"
                    )
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <Row>
                <Icon>
                  <MdFileDownload color="#ED1F34" />
                </Icon>
                Get Our App
                <Leave />
              </Row>
            </Link>
            <Link
              to="https://www.facebook.com/delawaregrace/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Row>
                <Icon>
                  <FaFacebookSquare color="#4267B2" />
                </Icon>
                Facebook
                <Leave />
              </Row>
            </Link>
            <Link
              to="https://twitter.com/delawaregrace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Row>
                <Icon>
                  <FaTwitterSquare color="#1DA1F2" />
                </Icon>
                Twitter
                <Leave />
              </Row>
            </Link>
            <Link
              to="http://vimeo.com/delawaregrace"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Row>
                <Icon>
                  <FaVimeoSquare color="#1ab7ea" />
                </Icon>
                Vimeo
                <Leave />
              </Row>
            </Link>
          </ListBox>
        </RightCol>
      </FlexContainer>
    </Container>
  )
}

export default IndexPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Home" }) {
      allCards: body {
        ...CardFragment
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

const Row = tw.div`border-b-2 border-gray-400 py-4 flex items-center font-bold text-gray-700`

const Icon = tw.span`text-3xl mr-3 text-gray-700 ml-3`

const ListBox = tw.div`bg-white rounded-lg p-4 shadow mb-5`
