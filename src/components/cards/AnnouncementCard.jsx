import React, { useState, useEffect } from "react"
import tw from "twin.macro"
import ButtonLink from "../ButtonLink"
import CardBase from "./CardBase"

const showCard = () => {
  const date = new Date()
  const day = date.getDay()
  const hour = date.getHours()
  const minutes = date.getMinutes()
  return day === 0 &&
    ((hour === 9 && minutes >= 30) ||
      hour === 10 ||
      (hour === 11 && minutes <= 30))
    ? true
    : false
}

const AnnouncementCard = () => {
  // const [announcementActive, setAnnouncementActive] = useState(showCard())
  const [announcementActive, setAnnouncementActive] = useState(true)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const newShowCard = showCard()
  //     const newShowCard = showCard()
  //     if (newShowCard !== announcementActive) setAnnouncementActive(newShowCard)
  //   }, 10000)

  //   return () => {
  //     clearInterval(interval)
  //   }
  // }, [announcementActive])

  return announcementActive ? (
    <div tw="pt-3">
      <CardBase tw="h-auto bg-dgRed-500">
        <div tw="m-5 flex flex-col md:(flex-row justify-between items-center)">
          <div tw="flex-shrink md:pr-24">
            <Title>Watch From Home</Title>
            <p tw="text-dgRed-100">
              Every Sunday we are live on YouTube at 10:00am. Feel free to tune
              in and watch from home if that works best for you!
            </p>
          </div>
          <div tw="mt-4 md:(-mt-2) flex-shrink-0">
            <ButtonLink
              white
              to="https://youtube.com/c/DelawareGrace/live"
              tw="mt-0"
            >
              Watch Now
            </ButtonLink>
          </div>
        </div>
      </CardBase>
    </div>
  ) : null
}

export default AnnouncementCard

const Title = tw.h1`text-white text-5xl ml-1 my-0`
