import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"

const EventsPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Events"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner
        image={page.banner.image}
        text={{ title: page.banner.title, subtitle: page.banner.subtitle }}
        overlay
      />
    </>
  )
}

export default EventsPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Events" }) {
      ...PageBannerFragment
    }
  }
`
