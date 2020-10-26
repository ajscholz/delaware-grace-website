import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"

import PageBanner from "../components/PageBanner"
import Section from "../components/Section"
import Container from "../components/Container"
import Title from "../components/Title"
import Padding from "../components/Padding"

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
            <p>
              At Delaware Grace, we are passionate about making God famous and
              giving Jesus away to a hurting world, whether it is here in
              Delaware or around the world. That involves meeting physical needs
              as well as ultimate spiritual needs. We want you to be involved
              with us in what God is doing around the world.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Reaching Delaware</Title>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Reaching the world</Title>
          </Padding>
        </Container>
      </Section>
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
