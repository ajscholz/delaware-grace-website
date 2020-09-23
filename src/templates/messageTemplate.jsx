import React, { useState } from "react"
import Container from "../components/Container"
import { graphql } from "gatsby"
import SEO from "../components/SEO"
import ReactPlayer from "react-player"
import tw, { css } from "twin.macro"
import useMeasure from "../hooks/useMeasure"
import { MdShare } from "react-icons/md"
import AnimatedButton from "../components/AnimatedButton"
import { BottomModal } from "react-spring-modal"
import { useLocation } from "@reach/router"
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share"
import { MdTextsms } from "react-icons/md"
import { HiOutlineLink } from "react-icons/hi"

const iconProps = { size: 42, round: true }

const shareButtonStyles = "w-1/5 flex flex-col items-center"

const MessageTemplate = ({ data }) => {
  const { message } = data

  const [modalOpen, setModalOpen] = useState(false)
  const [bind, { width }] = useMeasure()
  const location = useLocation()

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
      <div tw="bg-gray-900 text-gray-100 py-12">
        <Container {...bind}>
          <ReactPlayer
            url={message.videoUrl}
            width={width}
            height={width * 0.5625}
          />
          <div tw="w-full pt-8 flex justify-center">
            <div>
              <h1 tw="text-5xl leading-tight">{message.title}</h1>
              <p tw="text-gray-500 font-bold">
                {message.communicator.name}
                <span tw="mx-4">|</span>
                {message.date}
              </p>
            </div>
            <div tw="ml-auto">
              <AnimatedButton
                scale="1.1"
                grow
                tw="text-sm font-bold"
                onClick={() => openModal()}
              >
                <div tw="rounded-full bg-dgGreen-700 flex flex-col items-center content-center p-4 mb-1">
                  <MdShare
                    size={24}
                    className="relative text-dgGreen-100"
                    // strokeWidth="1"
                    style={{ right: 2 }}
                  />
                </div>
                Share
              </AnimatedButton>
              <BottomModal
                isOpen={modalOpen}
                tw="bg-gray-100 sm:px-6 px-2 sm:py-8 py-6 w-full max-w-sm rounded-none sm:rounded-t-lg"
                onRequestClose={() => setModalOpen(false)}
              >
                {/* <h1>Share this message now!</h1> */}
                <div
                  tw="relative flex items-center max-w-full"
                  style={{ top: 4 }}
                >
                  {/* <div tw="flex items-center justify-between max-w-full"> */}
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
                  <button
                    className={shareButtonStyles}
                    aria-label="copy link"
                    onClick={() =>
                      navigator.clipboard.writeText("Copied Text").then(
                        () => {
                          alert("clipped")
                        },
                        () => {
                          alert("failed")
                        }
                      )
                    }
                  >
                    <div
                      tw="rounded-full bg-dgRed-600 flex justify-center items-center p-2"
                      style={{ width: "42px", height: "42px" }}
                    >
                      <HiOutlineLink tw="w-full h-full m-px text-white m-px" />
                    </div>
                    <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
                      Copy
                    </span>
                  </button>
                </div>
              </BottomModal>
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
