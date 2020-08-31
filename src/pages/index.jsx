import React from "react"

import SEO from "../components/SEO"
import { graphql } from "gatsby"
import IndexCard from "../components/cards/IndexCard"
import tw, { styled } from "twin.macro"

const IndexPage = ({ data }) => (
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
    </FlexContainer>
  </>
)

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
  flex
`

const LeftCol = tw.div`
  w-full md:w-2/3
`

const InfoChip = tw.div`inline-block bg-dgBlue rounded-full mb-1 px-2 py-1 text-xs text-blue-100 w-auto
`
const Title = tw.h1`text-white text-5xl ml-1`

const Subtitle = tw.p`text-white text-xl ml-1`

const Button = styled.button(({ primary, white }) => [
  tw`py-3 px-5 mr-3 mt-2 border-2 border-white`,
  primary
    ? tw`bg-dgRed border-dgRed text-red-100`
    : white
    ? tw`bg-white text-gray-900`
    : tw`bg-transparent text-white`,
  tw`rounded-lg font-semibold uppercase transition duration-200 ease-in-out transform hover:scale-105`,
])
