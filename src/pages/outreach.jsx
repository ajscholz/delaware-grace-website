import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"

const OutreachPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Outreach"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />
    </>
  )
}

export default OutreachPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Outreach" }) {
      ...PageBannerFragment
    }
  }
`
