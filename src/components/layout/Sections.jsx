import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ExpandingCardsSection from "./ExpandingCardsSection"
import ActionSection from "./ActionSection"
import GallerySection from "./GallerySection"
import TextSection from "./TextSection"
// import TeamSection from "./TeamSection"

const Sections = props => {
  const sections = props.data.body.map(section => {
    if (section.__typename === "ContentfulExpandingCardsSection") {
      return <ExpandingCardsSection section={section} key={section.id} />
    } else if (section.__typename === "ContentfulActionSection") {
      return <ActionSection section={section} key={section.id} />
    } else if (section.__typename === "ContentfulGallerySection") {
      return <GallerySection section={section} key={section.id} />
    } else if (section.__typename === "ContentfulTextSection") {
      return <TextSection section={section} key={section.id} />
      // } else if (section.__typename === "ContentfulTeamSection") {
      //   return <TeamSection section={section} key={section.id} />
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

      ... on ContentfulGallerySection {
        ...GallerySectionFragment
      }

      ... on ContentfulTextSection {
        ...TextSectionFragment
      }

      # ... on ContentfulTeamSection {
      #   ...TeamSectionFragment
      # }
    }
  }
`
