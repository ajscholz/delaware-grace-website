import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"

import TagList from "../TagList"

import { IoMdCalendar, IoMdPerson } from "react-icons/io"
import { AiOutlineColumnWidth } from "react-icons/ai"

const Metadata = props => {
  const { type, data } = props
  const { tags, communicator, date, month, year, length } = data

  const dispDate =
    type === "Message"
      ? date
      : month.length === 1
      ? month[0]
      : `${month[0]} - ${month[month.length - 1]} ${year}`

  return (
    <div tw="text-gray-600 text-sm md:text-base font-bold">
      <TagList tags={tags} icon tw="mb-px" />
      <span
        tw="inline-flex items-center"
        aria-label={type === "Message" ? "communicator" : "length"}
      >
        {type === "Message" ? (
          <>
            <IoMdPerson tw="mr-3" aria-label="communicator" />
            {communicator.name}
          </>
        ) : (
          <>
            <AiOutlineColumnWidth tw="mr-3" aria-label="length" />
            {`${length.length} Message${length.length === 1 ? "" : "s"}`}
          </>
        )}
      </span>
      <span tw="ml-6 inline-flex items-center" aria-label="date">
        <IoMdCalendar tw="mr-3" aria-label="date" />
        {dispDate}
      </span>
    </div>
  )
}

Metadata.propTypes = {
  type: PropTypes.oneOf(["Message", "Series"]).isRequired,
  data: PropTypes.object.isRequired,
}

export default Metadata

export const query = graphql`
  fragment MessageMetadataFragment on ContentfulMessage {
    tags
    communicator {
      name
    }
    date(formatString: "MMMM DD, YYYY")
  }

  fragment SeriesMetadataFragment on ContentfulMessageSeries {
    tags
    month
    year
    length: message {
      contentful_id
    }
  }
`
