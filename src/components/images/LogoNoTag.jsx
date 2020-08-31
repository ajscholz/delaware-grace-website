import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"

const LogoNoTag = props => {
  const { logo } = useStaticQuery(graphql`
    {
      logo: contentfulAsset(contentful_id: { eq: "4tGxBB3bdVDAXEeMMHPQ6E" }) {
        fixed(quality: 80, height: 50) {
          ...GatsbyContentfulFixed_withWebp
        }
      }
    }
  `)

  return <Img {...props} fixed={logo.fixed} alt="Delaware Grace logo" />
}

export default LogoNoTag
