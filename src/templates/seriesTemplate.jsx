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
      message {
        title
      }
    }
  }
`
