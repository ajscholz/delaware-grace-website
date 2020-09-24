import React, { useState } from "react"
import Container from "../components/Container"
import { graphql, Link } from "gatsby"
import SEO from "../components/SEO"
import ReactPlayer from "react-player"
import tw, { css } from "twin.macro"
import useMeasure from "../hooks/useMeasure"
import { MdShare } from "react-icons/md"
import AnimatedButton from "../components/AnimatedButton"
import { BottomModal } from "react-spring-modal"
import { useLocation } from "@reach/router"
import MessageCard from "../components/cards/MessageCard"
import Button from "../components/Button"
import useMedia from "../hooks/useMedia"
import RichText from "../components/RichText"
import { FiX } from "react-icons/fi"
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share"
import { MdTextsms } from "react-icons/md"

import TagList from "../components/TagList"
import Breadcrumb from "../components/Breadcrumb"
import { IoMdCalendar, IoMdPerson } from "react-icons/io"
import CopyButton from "../components/CopyButton"

const iconProps = { size: 42, round: true }

const shareButtonStyles = "w-1/5 flex flex-col items-center"

const MessageTemplate = ({ data, path }) => {
  const { message, otherMessages } = data
  const [modalOpen, setModalOpen] = useState(false)
  const [bind, { width }] = useMeasure()
  const location = useLocation()
  const mediaWidth = useMedia(["(min-width:768px)"], ["md"], "sm")

  const openModal = () => setModalOpen(true)

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
          <div tw="w-full pt-4 flex flex-col md:flex-row justify-center">
            <div>
              <h1 tw="text-4xl md:text-5xl leading-tight text-gray-100">
                {message.title}
              </h1>
              <div tw="text-gray-600 text-sm md:text-base font-bold">
                <TagList tags={message.tags} icon tw="mb-px" />
                <span tw="inline-flex items-center" aria-label="communicator">
                  <IoMdPerson tw="mr-3" aria-label="communicator" />
                  {message.communicator.name}
                </span>
                <span tw="ml-6 inline-flex items-center" aria-label="date">
                  <IoMdCalendar tw="mr-3" aria-label="date" />
                  {message.date}
                </span>
              </div>
              {/* <div> */}

              {/* </div> */}
              <hr tw="w-1/5 my-6 border-gray-700" />
              <div tw="text-gray-200">
                <RichText>{message.description.json}</RichText>
              </div>
            </div>

            {/* SHARE BUTTON */}
            <div tw="mr-auto mt-4 md:(ml-auto mr-0 mt-0)">
              <AnimatedButton
                scale="1.1"
                grow
                tw="font-bold"
                onClick={() => openModal()}
              >
                <div
                  css={[
                    tw`rounded-full bg-dgGreen-500 flex flex-col items-center content-center`,
                    mediaWidth === "md" ? tw`p-4 mb-1` : tw`p-3 mb-0`,
                  ]}
                >
                  <MdShare
                    size={mediaWidth === "md" ? 24 : 18}
                    className="relative text-dgGreen-100"
                    // strokeWidth="1"
                    style={{ right: 2 }}
                  />
                </div>
                <span css={[mediaWidth === "md" ? tw`text-sm` : tw`text-xs`]}>
                  Share
                </span>
              </AnimatedButton>

              {/* SHARE MODAL */}
              <BottomModal
                isOpen={modalOpen}
                tw="relative bottom-0 w-full max-w-sm shadow-lg"
                onRequestClose={() => setModalOpen(false)}
              >
                <div tw="h-full w-full sm:px-5 px-2 sm:py-5 py-6 bg-gray-100 rounded-none sm:rounded-t-lg">
                  <h1 tw="text-center text-2xl mb-3 text-gray-800">
                    Share This Message
                  </h1>
                  <button
                    tw="absolute top-0 right-0 mt-2 mr-2 text-gray-600"
                    onClick={() => setModalOpen(false)}
                    aria-label="close"
                  >
                    <FiX />
                  </button>
                  <div tw="flex items-center w-full max-w-full">
                    <EmailShareButton
                      url={location.href}
                      className={shareButtonStyles}
                    >
                      <EmailIcon
                        {...iconProps}
                        css={[
                          css`
                            & circle {
                              fill: #718096;
                            }
                          `,
                        ]}
                      />
                      <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
                        Email
                      </span>
                    </EmailShareButton>
                    <FacebookShareButton
                      url={location.href}
                      className={shareButtonStyles}
                    >
                      <FacebookIcon {...iconProps} />
                      <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
                        Facebook
                      </span>
                    </FacebookShareButton>
                    <TwitterShareButton
                      url={location.href}
                      className={shareButtonStyles}
                    >
                      <TwitterIcon {...iconProps} />
                      <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
                        Twitter
                      </span>
                    </TwitterShareButton>
                    <a
                      className={shareButtonStyles}
                      href={`sms:?body=Check out this message from Delaware Grace Church I just listened to. ${encodeURI(
                        location.href
                      )}`}
                    >
                      <div
                        style={{ width: "42px", height: "42px" }}
                        tw="rounded-full bg-dgGreen-600 flex justify-center items-center p-2"
                      >
                        <MdTextsms tw="w-full h-full m-px text-white m-px" />
                      </div>
                      <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
                        Text
                      </span>
                    </a>
                    <CopyButton text={location.href} />
                  </div>
                </div>
              </BottomModal>
            </div>
          </div>
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
                    tw="h-auto w-2/5 self-start"
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
          <Link to="/messages">
            <Button green>More Messages</Button>
          </Link>
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
      date(formatString: "MMMM DD, YYYY")
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
      tags
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
