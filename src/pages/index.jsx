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

import Button from "../components/Button"
import Leave from "../components/Leave"
import Container from "../components/Container"

const IndexPage = ({ data }) => {
  const { page, message } = data
  const { allCards } = page
  const headerCard = allCards[0]
  const cards = allCards.slice(1)

  return (
    <Container>
      <SEO title="Home" />

      {/* PLAN A VISIT */}
      <div className="pt-3">
        <IndexCard overlay large card={headerCard} alt={"calendar"}>
          <Title>{headerCard.title}</Title>
          <Subtitle>{headerCard.subtitle}</Subtitle>
          <Button green>
            <Link to={headerCard.button.link}>{headerCard.button.text}</Link>
          </Button>
        </IndexCard>
      </div>

      <FlexContainer>
        <LeftCol>
          {/* {cards.map((card, i) => (
        
      ))} */}
          <IndexCard video={message.videoUrl}>
            <InfoChip>Latest Message</InfoChip>
            <Title>{message.title}</Title>
            <Button primary>Watch Message</Button>
            <Button>
              <Link to="https://delaware-grace.netlify.app/messages">
                View More Messages
              </Link>
            </Button>
          </IndexCard>

          {cards.map(card => (
            <IndexCard overlay key={card.id} card={card} alt={"calendar"}>
              <Title>{card.title}</Title>
              <Subtitle>{card.subtitle}</Subtitle>
              <Button white>
                <Link to={card.button.link}>{card.button.text}</Link>
              </Button>
            </IndexCard>
          ))}
          {/* EVENTS CARD */}

          {/* NEXT STEPS CARD */}
          {/* <IndexCard
            data={{
              image:
                "https://images.unsplash.com/40/OSASuBX1SGu4kb3ozvne_IMG_1088.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
            }}
            alt={"next steps"}
          >
            <Title>Take Your Next Step</Title>
            <Subtitle>Check out the next Discover Grace class</Subtitle>
            <Button white>Learn More</Button>
          </IndexCard> */}
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
    message: contentfulMessage {
      title
      videoUrl
    }
  }
`

const FlexContainer = tw.div`flex flex-col md:flex-row`

const LeftCol = tw.div`w-full md:w-2/3`

const RightCol = tw.div`md:w-1/3 mt-5 md:ml-5`

const InfoChip = tw.div`inline-block bg-dgBlue rounded-full mb-1 px-2 py-1 text-xs text-blue-100 w-auto
`
const Title = tw.h1`text-white text-5xl ml-1`

const Subtitle = tw.p`text-gray-200 text-lg ml-1`

const Row = tw.div`border-b-2 border-gray-400 py-4 flex items-center font-bold text-gray-700`

const Icon = tw.span`text-3xl mr-3 text-gray-700 ml-3`

const ListBox = tw.div`bg-white rounded-lg p-4 shadow mb-5`
