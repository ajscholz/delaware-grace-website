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

      <Section>
        <Container>
          <Padding>
            {/* <Title>Why Delaware Grace?</Title> */}
            <p tw="text-center">
              At Delaware Grace, we are passionate about making God famous and
              giving Jesus away to a hurting world, whether it is here in
              Delaware or around the world. That involves meeting physical needs
              as well as ultimate spiritual needs. We want you to be involved
              with us in what God is doing around the world.
            </p>
          </Padding>
        </Container>
      </Section>

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
