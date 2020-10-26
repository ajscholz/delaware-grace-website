import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"

import tw from "twin.macro"
import ContentfulIcon from "./ContentfulIcon"
import Link from "./Link"

const ListBox = tw.div`bg-white rounded-lg p-4 shadow-md mb-5`
const Row = tw.div`border-b-2 border-gray-400 py-4 flex items-center font-bold text-gray-700`

const LinkGroup = props => {
  return (
    <ListBox>
      <Row>
        <h1 className="text-3xl">{props.groupData.title}</h1>
      </Row>
      {props.groupData.links.map(link => {
        return (
          <Link key={link.id} to={link.url}>
            <Row>
              <ContentfulIcon icon={link.icon} />
              {link.displayText}
            </Row>
          </Link>
        )
      })}
    </ListBox>
  )
}

LinkGroup.propTypes = {
  groupData: PropTypes.object.isRequired,
}

export default LinkGroup

export const query = graphql`
  fragment LinkGroupFragment on ContentfulLinkGroup {
    id: contentful_id
    title
    links {
      id: contentful_id
      displayText
      url
      ...ContentfulIconFragment
    }
    internal {
      type
    }
  }
`
