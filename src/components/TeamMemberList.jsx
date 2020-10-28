import React from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"

const Heading = ({ children }) => (
  <h2 tw="text-2xl mt-3 text-gray-700">{children}</h2>
)

const AdminList = ({ list }) => (
  <div tw="w-full lg:w-1/2">
    <Heading>{list.description}</Heading>
    {list.teamMembers.map(person => (
      <div key={person.id}>
        {person.name}
        <span tw="mx-2">•</span>
        <span tw="text-sm text-gray-500 font-bold uppercase">
          {person.position}
        </span>
      </div>
    ))}
  </div>
)

const TeachersList = ({ list }) => (
  <div tw="w-full lg:w-1/2">
    <Heading>{list.description}</Heading>
    {list.teamMembers.map(person => (
      <div tw="" key={person.id}>
        {person.name}
        <span tw="mx-2">•</span>
        <span tw="text-sm text-gray-500 font-bold uppercase">
          {person.position}
        </span>
      </div>
    ))}
  </div>
)

const GenericList = ({ list }) =>
  list.teamMembers.map(person => <div key={person.id}>{person.name}</div>)

const TeamMemberList = ({ list }) =>
  list.id === "kgbOqXpJKhQo2cckxp7VQ" ? (
    <AdminList list={list} />
  ) : list.id === "7FcXMpOLVqlqaTNJ2xhBJK" ? (
    <TeachersList list={list} />
  ) : (
    <GenericList list={list} />
  )

TeamMemberList.propTypes = {
  list: PropTypes.object.isRequired,
}

export default TeamMemberList

export const query = graphql`
  fragment TeamMemberListFragment on ContentfulTeamMemberList {
    id: contentful_id
    description
    teamMembers {
      id: contentful_id
      name
      position
      email
    }
  }
`
