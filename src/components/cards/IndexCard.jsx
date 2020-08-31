import React from "react"
import tw from "twin.macro"
import CardBase from "./CardBase"
// import Image from "gatsby-image"
import VideoImage from "../VideoImage"

const ContentContainer = tw.div`absolute bottom-0 ml-4 mb-4 leading-tight`

const Overlay = tw.div`absolute top-0 left-0 h-full w-full bg-black bg-opacity-25`

const classes = "absolute h-full w-full object-cover"

const IndexCard = ({ video, large, data, children }, props) => {
  return (
    <CardBase large={large}>
      <Overlay />
      {video ? (
        <VideoImage
          url={data.videoUrl}
          alt="Latest message at Delaware Grace"
          className="classes"
        />
      ) : (
        <img src={data.image} alt={props.alt} className={classes} />
      )}
      <ContentContainer>{children}</ContentContainer>
    </CardBase>
  )
}

export default IndexCard
