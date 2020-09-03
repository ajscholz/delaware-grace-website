import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"

const ConnectPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Connect"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />
    </>
  )
}

export default ConnectPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Connect" }) {
      ...PageBannerFragment
    }
  }
`