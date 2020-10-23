import React, { useState } from "react"
import Container from "../components/Container"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import ReactPlayer from "react-player"
import "twin.macro"
import useMeasure from "../hooks/useMeasure"
import InfoContainer from "../components/messageAndSeriesInfo/Container"

import MessageCard from "../components/cards/MessageCard"

import RichText from "../components/RichText"

import Breadcrumb from "../components/Breadcrumb"
import ButtonLink from "../components/ButtonLink"
import ShareModalController from "../components/ShareModalController"
import Title from "../components/messageAndSeriesInfo/title"
import Metadata from "../components/messageAndSeriesInfo/Metadata"
import Description from "../components/messageAndSeriesInfo/Description"

const MessageTemplate = ({ data, path }) => {
  const { message, otherMessages } = data

  const [bind, { width }] = useMeasure()

  return (
    <>
      <SEO
        title={message.title}
        // replaces rich text description with a string
        description={message.description.content
          .map(({ content }) => content.map(item => item.value).join(" "))
          .join(" ")
          .replace(/ {2,}/g, " ")}
        image={message.image.url}
      />
      <div tw="bg-gray-900 text-gray-100 pt-12 pb-6 md:py-12">
        <Container {...bind}>
          {/* VIDEO */}
          <ReactPlayer
            url={message.videoUrl}
            width={width}
            height={width * 0.5625}
          />
          <div tw="mt-6 mb-2 w-full whitespace-no-wrap overflow-x-scroll">
            <Breadcrumb
              scrollable
              path={path}
              linkText={[
                "Messages",
                "Series",
                message.series.title,
                message.title,
              ]}
            />
          </div>
          {/* MESSAGE INFORMATION */}
          <InfoContainer>
            <div>
              <Title title={message.title} />

              <Metadata type={"Message"} data={message} />

              <Description>
                <RichText>{message.description.json}</RichText>
              </Description>
            </div>

            {/* SHARE BUTTON & MODAL */}
            <ShareModalController />
          </InfoContainer>
        </Container>
      </div>

      {/* MORE MESSAGES */}
      <Container tw="py-12">
        {otherMessages.all.length !== 0 && (
          <>
            <h1 tw="text-4xl md:text-5xl text-center text-gray-900">
              More From This Series
            </h1>
            <div tw="flex flex-wrap mt-6">
              {otherMessages.all.map(thisMessage => (
                <div key={thisMessage.id} tw="p-3 flex w-full md:w-1/2">
                  <MessageCard
                    message={thisMessage}
                    tw="h-24 w-2/5 self-start"
                  />
                  <div tw="w-3/5 ml-3">
                    <h1 tw="text-xl leading-none text-gray-900">
                      {thisMessage.title}
                    </h1>
                    <p tw="text-gray-600 leading-tight text-xs mt-1">
                      {thisMessage.communicator.name}
                    </p>
                    <p tw="text-gray-600 leading-tight text-xs">
                      {thisMessage.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <hr tw="my-8" />
          </>
        )}
        <div tw="w-full flex justify-center">
          <ButtonLink to="/messages" green>
            More Messages
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}

export default MessageTemplate

export const data = graphql`
  query($slug: String!, $seriesTitle: String!) {
    message: contentfulMessage(slug: { eq: $slug }) {
      title
      videoUrl
      slug
      ...MessageMetadataFragment
      description {
        json
        content {
          content {
            value
          }
        }
      }
      image: thumbnail {
        url
      }
      series {
        title
      }
    }
    otherMessages: allContentfulMessage(
      filter: { series: { title: { eq: $seriesTitle } }, slug: { ne: $slug } }
    ) {
      all: nodes {
        ...MessageCardFragment
      }
    }
  }
`
