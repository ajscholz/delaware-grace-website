import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"
import Sections from "../components/layout/Sections"

const PlanAVisitPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Plan A Visit"
        description="Plan a visit today to Delaware Grace. We would love to meet you."
      />

      <PageBanner banner={page.banner} overlay />

      <Sections data={page} />

      {/* <Section>
        <Container>
          <Padding>
            <Title>Why Delaware Grace?</Title>
            <p>
              We want you to come experience a service at Delaware Grace.
              Visiting our family and meeting people is the best way to see if
              it is the place for you.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>{`Service Times & Location`}</Title>
            <p>Sundays at 10am</p>
            <p>375 Hills-Miller Rd.</p>
          </Padding>
        </Container>
      </Section>
      <Section>
        <Container>
          <Padding>
            <Title>What To Expect</Title>
            <p>
              You should expect a casual atmosphere, warm, inviting atmosphere.
              Please come as you are as there is no expectation of formal
              attire, but if formal attire is your thing, by all means, be our
              guest.
            </p>
            <p>
              You should expect the service to be in the 70-75 minute ballpark.
            </p>
            <p>
              You should expect to be led in some contemporary music, mixed with
              some hymns here and there, either by a full band or sometimes an
              acoustic set.
            </p>
            <p>
              You should expect to hear a message from God’s word, so please
              bring your Bibles. If you don’t have one, no worries at all. Most
              of the text will be on the front screens, and we also have a Bible
              for you to take home as well.
            </p>
          </Padding>
        </Container>
      </Section> */}
    </>
  )
}

export default PlanAVisitPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Plan A Visit" }) {
      ...PageBannerFragment
      ...SectionsFragment
    }
  }
`
