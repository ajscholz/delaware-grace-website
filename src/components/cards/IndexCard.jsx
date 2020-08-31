import React, { useState } from "react"
import tw, { styled } from "twin.macro"
import ReactPlayer from "react-player/vimeo"
import CardBase from "./CardBase"
import useGetVimeoThumb from "../../hooks/useGetVimeoThumb"

const ContentContainer = tw.div`absolute bottom-0 ml-4 mb-4`

const InfoChip = tw.div`inline-block bg-dgBlue rounded-full px-2 py-1 text-xs text-blue-100 w-auto
`
const Title = tw.h1`text-white text-5xl ml-1`

const Button = styled.button(({ primary }) => [
  tw`py-3 px-5 mr-3 border-2`,
  primary
    ? tw`bg-dgRed border-dgRed text-red-100`
    : tw`bg-transparent border-white text-white`,
  tw`rounded-lg font-semibold uppercase transition duration-200 ease-in-out transform hover:scale-105`,
])

const IndexCard = ({ data }) => {
  const [image, setImage] = useState("")
  useGetVimeoThumb(data.videoUrl, setImage)

  return (
    <CardBase>
      {image === "" ? (
        <ReactPlayer
          url={data.videoUrl}
          light
          width="100%"
          height={480}
          className="absolute top-0 left-0"
        />
      ) : (
        <img
          className="absolute h-full w-full object-cover"
          src={image}
          alt="Latest message at Delaware Grace"
        />
      )}
      <ContentContainer>
        <InfoChip>Latest Message</InfoChip>
        <Title>{data.title}</Title>
        <Button primary>Watch Message</Button>
        <Button>View More Messages</Button>
      </ContentContainer>
    </CardBase>
  )
}

export default IndexCard
