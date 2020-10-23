import React, { useState } from "react"
import tw from "twin.macro"

import AnimatedButton from "./AnimatedButton"
import ShareModal from "./ShareModal"

import { MdShare } from "react-icons/md"

import useMedia from "../hooks/useMedia"

const ShareModalController = () => {
  const mediaWidth = useMedia(["(min-width:768px)"], ["md"], "sm")
  const openModal = () => setModalOpen(true)
  const [modalOpen, setModalOpen] = useState(false)

  return (
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
      <ShareModal state={[modalOpen, setModalOpen]} />
    </div>
  )
}

ShareModalController.propTypes = {}

export default ShareModalController
