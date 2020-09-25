import React, { useState, useMemo } from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// import PageBanner from "../components/PageBanner"
// import MessageCard from "../components/cards/MessageCard"
import Container from "../components/Container"
import "twin.macro"
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

  return (
    <>
      <SEO
        title="Messages"
        description="Listen to Sunday messages from Delaware Grace Church."
      />
      <PageBanner banner={page.banner} />
      <div tw="flex flex-col lg:(flex-row)">
        <Container tw="py-12 flex flex-col items-center lg:(w-1/2 ml-auto mb-0 items-end)">
          <MessageCard
            message={message}
            overlay
            fadeUp
            tw="w-full sm:(max-w-lg h-72) md:(h-96 max-w-2xl) lg:(h-64)"
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
        </Container>
        <Container tw="bg-gray-900 py-12 flex flex-col items-center justify-start lg:(w-1/2 mr-auto mb-0 bg-transparent items-start)">
          <SeriesCard
            series={series}
            overlay
            fadeUp
            tw="w-full sm:(max-w-lg h-72) md:(h-96 max-w-2xl) lg:(h-64)"
          >
            <div tw="pl-3">
              <InfoChip>Latest Series</InfoChip>
              <Title>{series.title}</Title>
            </div>
          </SeriesCard>
          <ButtonLink to="/messages/series" green tw="mt-6 self-center">
            View All Series
          </ButtonLink>
        </Container>
      </div>
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
