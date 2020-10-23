import React from "react"
import Container from "../components/Container"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import Image from "gatsby-image"
import "twin.macro"

import Breadcrumb from "../components/Breadcrumb"

import InfoContainer from "../components/messageAndSeriesInfo/Container"

// import MessageCard from "../components/cards/MessageCard"

import RichText from "../components/RichText"

import ShareModalController from "../components/ShareModalController"
import Title from "../components/messageAndSeriesInfo/title"
import Metadata from "../components/messageAndSeriesInfo/Metadata"
import Description from "../components/messageAndSeriesInfo/Description"
import MessageCard from "../components/cards/MessageCard"
import ButtonLink from "../components/ButtonLink"

const SeriesTemplate = ({ data, path }) => {
  const { series } = data

  return (
    <>
      <SEO
        title={series.title}
        description={series.description.description}
        image={series.graphic.file.url}
      />
      <div tw="bg-gray-900 text-gray-100 pt-12 pb-6 md:py-12">
        <Container>
          {/* GRAPHIC */}
          <Image fluid={series.graphic.fluid} />
          <div tw="mt-6 mb-2 w-full whitespace-no-wrap overflow-x-scroll">
            <Breadcrumb
              scrollable
              path={path}
              linkText={["Messages", "Series", series.title]}
            />
          </div>

          <InfoContainer>
            <div>
              <Title title={series.title} />

              <Metadata type={"Series"} data={series} />

              <Description>
                <RichText>{series.description.json}</RichText>
              </Description>
            </div>

            {/* SHARE BUTTON & MODAL */}
            <ShareModalController />
          </InfoContainer>
        </Container>
      </div>

      <Container tw="py-12">
        <h1 tw="text-4xl md:text-5xl text-center text-gray-900">
          Messages In This Series
        </h1>
        <div tw="flex flex-wrap mt-6">
          {series.allMessages.map(thisMessage => (
            <div key={thisMessage.id} tw="p-3 flex w-full md:w-1/2">
              <MessageCard message={thisMessage} tw="h-24 w-2/5 self-start" />
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

        <div tw="w-full flex justify-center">
          <ButtonLink to="/messages/series" green>
            Other Series
          </ButtonLink>
        </div>
      </Container>
    </>
  )
}

export default SeriesTemplate

export const data = graphql`
  query($slug: String!) {
    series: contentfulMessageSeries(slug: { eq: $slug }) {
      title
      slug
      startingDate
      endingDate
      ...SeriesMetadataFragment
      graphic {
        file {
          url
        }
        fluid {
          ...GatsbyContentfulFluid_withWebp
        }
      }

      description {
        json
      }
      allMessages: message {
        ...MessageCardFragment
      }
    }
  }
`
