import React from "react"

import SEO from "../components/SEO"
import { graphql } from "gatsby"
import IndexCard from "../components/cards/IndexCard"

const IndexPage = ({ data }) => (
  <>
    <SEO title="Home" />
    <IndexCard video data={data.message} />
  </>
)

export default IndexPage

export const data = graphql`
  {
    message: contentfulMessage {
      title
      videoUrl
    }
  }
`
