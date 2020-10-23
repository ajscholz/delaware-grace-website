import React from "react"
import PropTypes from "prop-types"
import { css } from "twin.macro"

import CopyButton from "./CopyButton"

import { BottomModal } from "react-spring-modal"
import {
  EmailShareButton,
  FacebookShareButton,
  TwitterShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
} from "react-share"

import { FiX } from "react-icons/fi"
import { MdTextsms } from "react-icons/md"

import { useLocation } from "@reach/router"

const shareButtonStyles = "w-1/5 flex flex-col items-center"
const iconProps = { size: 42, round: true }

const ShareModal = ({ state }) => {
  const [modalOpen, setModalOpen] = state
  const location = useLocation()

  return (
    <BottomModal
      isOpen={modalOpen}
      tw="relative bottom-0 w-full max-w-sm shadow-lg"
      onRequestClose={() => setModalOpen(false)}
    >
      <div tw="h-full w-full sm:px-5 px-2 sm:py-5 py-6 bg-gray-100 rounded-none sm:rounded-t-lg">
        <h1 tw="text-center text-2xl mb-3 text-gray-800">Share This Message</h1>
        <button
          tw="absolute top-0 right-0 mt-2 mr-2 text-gray-600"
          onClick={() => setModalOpen(false)}
          aria-label="close"
        >
          <FiX />
        </button>
        <div tw="flex items-center w-full max-w-full">
          <EmailShareButton url={location.href} className={shareButtonStyles}>
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
          <TwitterShareButton url={location.href} className={shareButtonStyles}>
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
  )
}

ShareModal.propTypes = {
  state: PropTypes.array.isRequired,
}

export default ShareModal
