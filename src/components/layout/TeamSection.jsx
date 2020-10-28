import React from "react"
import PropTypes from "prop-types"
import "twin.macro"

import Section from "../Section"
import Container from "../Container"
import Padding from "../Padding"
import Title from "../Title"
import TeamMemberList from "../TeamMemberList"

const TeamSection = props => {
  const { section } = props
  return (
    <Section key={section.id}>
      <Container>
        <Padding tw="py-16">
          <Title
            tw="text-5xl text-gray-800 relative after:(content absolute w-full bottom-0 mb-1 left-0 h-2 bg-dgBlue-500)"
            style={{ width: "max-content" }}
          >
            {section.title}
          </Title>
          <div tw="flex flex-wrap">
            {section.teamMemberLists.map(list => (
              <TeamMemberList list={list} key={list.id} />
            ))}
          </div>
        </Padding>
      </Container>
    </Section>
  )
}

TeamSection.propTypes = {
  section: PropTypes.object.isRequired,
}

export default TeamSection

export const query = graphql`
  fragment TeamSectionFragment on ContentfulTeamSection {
    id: contentful_id
    title
    teamMemberLists {
      ...TeamMemberListFragment
    }
  }
`
