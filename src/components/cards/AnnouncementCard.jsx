import React, { useState } from "react"
import tw from "twin.macro"
import ButtonLink from "../ButtonLink"
import CardBase from "./CardBase"
import { graphql, useStaticQuery } from "gatsby"

const getCurrentAnnouncement = announcementData => {
  // filter out future announcements
  const activeAnnouncements = announcementData.filter(
    announcement => new Date(announcement.turnOn) < new Date()
  )

  return activeAnnouncements[0]
}

const AnnouncementCard = () => {
  const data = useStaticQuery(graphql`
    query MyQuery {
      allContentfulAnnouncementBar(
        filter: { isFuture: { eq: true } }
        sort: { fields: turnOn, order: DESC }
      ) {
        nodes {
          id: contentful_id
          titleText
          body
          turnOn
          turnOff
          callToAction {
            id: contentful_id
            text
            link
          }
        }
      }
    }
  `)

  const currentAnnouncement = getCurrentAnnouncement([
    ...data.allContentfulAnnouncementBar.nodes,
  ])

  return currentAnnouncement ? (
    <div tw="pt-3">
      <CardBase tw="h-auto bg-dgRed-500">
        <div tw="m-5 flex flex-col md:(flex-row justify-between items-center)">
          <div tw="flex-shrink md:pr-24">
            <Title>{currentAnnouncement.titleText}</Title>
            <p tw="text-dgRed-100">{currentAnnouncement.body}</p>
          </div>
          {currentAnnouncement.callToAction && (
            <div tw="mt-4 md:(-mt-2) flex-shrink-0">
              <ButtonLink
                white
                to={currentAnnouncement.callToAction.link}
                tw="mt-0"
              >
                {currentAnnouncement.callToAction.text}
              </ButtonLink>
            </div>
          )}
        </div>
      </CardBase>
    </div>
  ) : null
}

export default AnnouncementCard

const Title = tw.h1`text-white text-5xl ml-1 my-0`
