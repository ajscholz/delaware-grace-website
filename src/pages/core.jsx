import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"

import Sections from "../components/layout/Sections"

const CorePage = ({ data }) => {
  const { page } = data

  return (
    <>
      <SEO
        title="Core"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />

      <Sections data={page} />
    </>
  )
}

export default CorePage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Core" }) {
      ...PageBannerFragment
      ...SectionsFragment
    }
  }
`
