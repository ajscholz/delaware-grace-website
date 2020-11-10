import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import "twin.macro"

import PageBanner from "../components/PageBanner"
import Section from "../components/Section"
import Container from "../components/Container"
import Padding from "../components/Padding"
import Sections from "../components/layout/Sections"

const OutreachPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Outreach"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />

      <Sections data={page} />
    </>
  )
}

export default OutreachPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Outreach" }) {
      ...PageBannerFragment
      ...SectionsFragment
    }
  }
`
