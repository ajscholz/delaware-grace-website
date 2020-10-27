import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// import PageBanner from "../components/PageBanner"
// import MessageCard from "../components/cards/MessageCard"
import Container from "../components/Container"
import tw from "twin.macro"
import ButtonLink from "../components/ButtonLink"
import MessageCard from "../components/cards/MessageCard"
import SeriesCard from "../components/cards/SeriesCard"
import PageBanner from "../components/PageBanner"
import InfoChip from "../components/InfoChip"
import Title from "../components/Title"

const MessagesPage = ({ data }) => {
  const { page, currentMessage, currentSeries } = data

  const message = currentMessage.message[0]
  const series = currentSeries.series[0]

  const CardContainer = tw(
    Container
  )`justify-self-stretch flex flex-col items-center lg:(mb-0 items-end) px-0! mx-0 `

  return (
    <>
      <SEO
        title="Messages"
        description="Listen to Sunday messages from Delaware Grace Church."
      />
      <PageBanner banner={page.banner} />
      <Container>
        <div tw="grid grid-cols-1 gap-16 lg:gap-10 lg:grid-cols-2 py-12 px-0 sm:px-12 md:px-24 lg:px-0">
          <CardContainer>
            <MessageCard
              message={message}
              overlay
              fadeUp
              tw="w-full p-0 mx-0 h-64 sm:(h-84) md:(h-84) lg:(h-64)"
            >
              <div tw="pl-3">
                <InfoChip>Latest Message</InfoChip>
                <Title>{message.title}</Title>
              </div>
            </MessageCard>
            <ButtonLink
              to="/messages/message-archive"
              green
              tw="mt-6 self-center"
            >
              View All Messages
            </ButtonLink>
          </CardContainer>

          <CardContainer>
            <SeriesCard
              series={series}
              overlay
              fadeUp
              tw="w-full p-0 mx-0 h-64 sm:(h-84) md:(h-84) lg:(h-64)"
            >
              <div tw="pl-3">
                <InfoChip>Latest Series</InfoChip>
                <Title>{series.title}</Title>
              </div>
            </SeriesCard>
            <ButtonLink to="/messages/series" green tw="mt-6 self-center">
              View All Series
            </ButtonLink>
          </CardContainer>
        </div>
      </Container>
    </>
  )
}

export default MessagesPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Messages" }) {
      ...PageBannerFragment
    }
    currentMessage: allContentfulMessage(
      sort: { fields: date, order: DESC }
      limit: 1
    ) {
      message: nodes {
        ...MessageCardFragment
      }
    }
    currentSeries: allContentfulMessageSeries(
      sort: { fields: startingDate, order: DESC }
      limit: 1
    ) {
      series: nodes {
        ...SeriesCardFragment
      }
    }
  }
`
