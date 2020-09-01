import React, { useState } from "react"

import SEO from "../components/SEO"
import { graphql } from "gatsby"
import IndexCard from "../components/cards/IndexCard"
import tw from "twin.macro"
import { MdFavoriteBorder, MdPeople, MdPublic } from "react-icons/md"

import Button from "../components/Button"

const IndexPage = ({ data }) => {
  return (
    <>
      <SEO title="Home" />

      <IndexCard large video data={data.message}>
        <InfoChip>Latest Message</InfoChip>
        <Title>{data.message.title}</Title>
        <Button primary>Watch Message</Button>
        <Button>View More Messages</Button>
      </IndexCard>

      <FlexContainer>
        <LeftCol>
          {/* PLAN A VISIT */}
          <IndexCard
            data={{
              image:
                "https://images.unsplash.com/photo-1545379537-5d1275c630fe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2466&q=80",
            }}
            alt={"calendar"}
          >
            <Title>No Perfect People Allowed</Title>
            <Subtitle>Wherever you've been you matter to God</Subtitle>
            <Button white>Plan A Visit</Button>
          </IndexCard>

          {/* EVENTS CARD */}
          <IndexCard
            data={{
              image:
                "https://images.unsplash.com/photo-1506784365847-bbad939e9335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2696&q=80",
            }}
            alt={"calendar"}
          >
            <Title>What's Ahead</Title>
            <Subtitle>Learn how to plug in and be involved</Subtitle>
            <Button white>View Events</Button>
          </IndexCard>

          {/* NEXT STEPS CARD */}
          <IndexCard
            data={{
              image:
                "https://images.unsplash.com/40/OSASuBX1SGu4kb3ozvne_IMG_1088.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2700&q=80",
            }}
            alt={"next steps"}
          >
            <Title>Take Your Next Step</Title>
            <Subtitle>Check out the next Discover Grace class</Subtitle>
            <Button white>Learn More</Button>
          </IndexCard>
        </LeftCol>
        <RightCol>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <Row>
              <h1 className="text-2xl">Take A Step</h1>
            </Row>
            <Row>
              <Icon>
                <MdFavoriteBorder />
              </Icon>
              Giving
            </Row>
            <Row>
              <Icon>
                <MdPeople />
              </Icon>
              Groups
            </Row>
            <Row>
              <Icon>
                <MdPublic />
              </Icon>
              Outreach
            </Row>
          </div>
        </RightCol>
      </FlexContainer>
    </>
  )
}

export default IndexPage

export const data = graphql`
  {
    message: contentfulMessage {
      title
      videoUrl
    }
  }
`

const FlexContainer = tw.div`
  flex flex-col md:flex-row
`

const LeftCol = tw.div`
  w-full md:w-2/3
`

const RightCol = tw.div`
  md:w-1/3 mt-5 md:ml-5
`

const InfoChip = tw.div`inline-block bg-dgBlue rounded-full mb-1 px-2 py-1 text-xs text-blue-100 w-auto
`
const Title = tw.h1`text-white text-5xl ml-1`

const Subtitle = tw.p`text-white text-xl ml-1`

const Row = tw.div`border-b-2 border-gray-400 py-4 flex items-center font-bold`

const Icon = tw.span`text-3xl mr-3 text-gray-700 ml-3`
