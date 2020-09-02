import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"

const PlanAVisitPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Plan A Visit"
        description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner
        image={page.banner.image}
        text={{ title: page.banner.title, subtitle: page.banner.subtitle }}
      />
    </>
  )
}

export default PlanAVisitPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Plan A Visit" }) {
      ...PageBannerFragment
    }
  }
`
