import React from "react"
import Container from "../components/Container"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import ReactPlayer from "react-player"
import "twin.macro"
import useMeasure from "../hooks/useMeasure"
import { MdShare } from "react-icons/md"
import AnimatedButton from "../components/AnimatedButton"

const MessageTemplate = ({ data }) => {
  const { message } = data

  const [bind, { width }] = useMeasure()
  console.log("message", message)
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
      <div tw="bg-gray-900 text-gray-100 py-12">
        <Container {...bind}>
          <ReactPlayer
            url={message.videoUrl}
            width={width}
            height={width * 0.5625}

            // light={message.image.url}
          />
          <div tw="w-full pt-8 flex content-between">
            <div>
              <h1 tw="text-5xl leading-tight">{message.title}</h1>
              <p tw="text-gray-500 font-bold">
                {message.communicator.name}
                <span tw="mx-4">|</span>
                {message.date}
              </p>
            </div>
            <div tw="ml-auto">
              <AnimatedButton scale="1.1" grow tw="text-sm font-bold">
                <div tw="rounded-full bg-dgGreen-700 flex flex-col items-center content-center p-4 mb-1">
                  <MdShare
                    size={24}
                    tw="relative text-dgGreen-100"
                    // strokeWidth="1"
                    style={{ right: 2 }}
                  />
                </div>
                Share
              </AnimatedButton>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default MessageTemplate

export const data = graphql`
  query($slug: String!) {
    message: contentfulMessage(slug: { eq: $slug }) {
      title
      videoUrl
      slug
      date
      communicator {
        name
      }
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
    }
  }
`
