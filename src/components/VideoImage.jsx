import React, { useState } from "react"
import useGetVimeoThumb from "../hooks/useGetVimeoThumb"
import ReactPlayer from "react-player"

const classes = "absolute h-full w-full object-cover"

const PlayIcon = () => null

const VideoImage = ({ url, alt }, props) => {
  const [image, setImage] = useState("")

  useGetVimeoThumb(url, setImage)
  return (
    <>
      {image === "" ? (
        <ReactPlayer
          url={url}
          light
          width="100%"
          height={480}
          className="absolute top-0 left-0"
          playIcon={<PlayIcon />}
          {...props}
        />
      ) : (
        <img src={image} alt={alt} {...props} className={classes} />
      )}
    </>
  )
}

export default VideoImage
