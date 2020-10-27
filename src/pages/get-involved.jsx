import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"
import ExpandingCardsSection from "../components/layout/ExpandingCardsSection"

const GetInvolvedPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Connect"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />

      <ExpandingCardsSection data={page} />
    </>
  )
}

export default GetInvolvedPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Get Involved" }) {
      ...PageBannerFragment
      ...ExpandingCardsSectionFragment
    }
  }
`
