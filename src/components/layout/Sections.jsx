import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ExpandingCardsSection from "./ExpandingCardsSection"
import ActionSection from "./ActionSection"

const Sections = props => {
  const sections = props.data.body.map(section => {
    if (section.__typename === "ContentfulExpandingCardsSection") {
      return <ExpandingCardsSection section={section} key={section.id} />
    } else if (section.__typename === "ContentfulActionSection") {
      return <ActionSection section={section} key={section.id} />
    } else return null
  })

  return sections.map(section => section)
}

Sections.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Sections

export const query = graphql`
  fragment SectionsFragment on ContentfulPage {
    body {
      ... on ContentfulExpandingCardsSection {
        ...ExpandingCardsSectionFragment
      }

      ... on ContentfulActionSection {
        ...ActionSectionFragment
      }
    }
  }
`
