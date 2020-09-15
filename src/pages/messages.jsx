import React, { useState } from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// import PageBanner from "../components/PageBanner"
import MessageCard from "../components/cards/MessageCard"
import Container from "../components/Container"
import InfoChip from "../components/InfoChip"
import tw from "twin.macro"
import Filter from "../components/Filter"

const MessagesPage = ({ data }) => {
  // const { page } = data
  const messages = [...data.messages.all]
  const latestMessage = messages.shift()

  return (
    <>
      <SEO
        title="Messages"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      {/* <PageBanner banner={page.banner} /> */}
      <Container className="pt-12">
        <div className="w-full grid grid-cols-2">
          <Title tw="text-black text-6xl">Messages</Title>
          <Filter />
        </div>
        <MessageCard large message={latestMessage} overlay fadeUp>
          <div>
            <InfoChip>Latest Message</InfoChip>
            <Title>{latestMessage.title}</Title>
          </div>

          <h6 className="text-gray-200 mr-1 flex items-end mb-3 text-2xl">
            {latestMessage.date} | {latestMessage.communicator.name}
          </h6>
        </MessageCard>
        <div className="grid grid-cols-3 gap-5">
          {messages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
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
    messages: allContentfulMessage(sort: { fields: date, order: DESC }) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`

const Title = tw.h1`text-white text-5xl ml-1`
