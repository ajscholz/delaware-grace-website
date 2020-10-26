import React from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
import PageBanner from "../components/PageBanner"
import Section from "../components/Section"
import Container from "../components/Container"
import Title from "../components/Title"
import Padding from "../components/Padding"

const GetInvolvedPage = ({ data }) => {
  const { page } = data
  return (
    <>
      <SEO
        title="Connect"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      <PageBanner banner={page.banner} />

      <Section>
        <Container>
          <Padding>
            {/* <Title>Why Delaware Grace?</Title> */}
            <p>
              One of our biggest aims is to move people from what we refer to as
              “rows to circles.” It’s great to come and sit in a service, we
              invite you to do that. It’s important. However, the pain, sorrow,
              joy, confusion, questions, highs and lows of life are more
              effectively lived out in smaller community. So if the Sunday
              morning gathering is your “row,” then what is your “circle?”
            </p>
            <p>
              For more information and/or to be contacted about any of the
              “circles” below, please fill out this form.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Venture Student Ministries</Title>
            <p>
              Our 6 th through 12 th graders meet every Sunday night for youth
              group. Pastor Sam and his team have relevant messages and
              conversations about what students are experiencing and how our
              faith in Christ equips us to grow and flourish in the midst of any
              circumstance.
            </p>
            <p>
              There are also small groups (circles) for both high school and
              middle school students. Aside from the weekly gatherings, there
              are various retreats, conferences, and mission trips that help
              shape students spiritual lives.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Grace Kids</Title>
            <p>
              Our babies – 5 th graders meet in age segregated classes on Sunday
              mornings. Miss Billie and her team use age-appropriate
              illustrations through the curriculum To make Bible stories come
              alive. Everything is always brought back to Jesus and the Gospel.
              Grace Kids is designed to come alongside the home to continue to
              teach and lead the next generation to follow Jesus.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Life Groups</Title>
            <p>
              Adult “circles” begin with Life Groups. These groups meet weekly
              or bi-weekly in homes at various times throughout the week. There
              is connection, prayer, scripture, encouragement, challenge. Life
              Groups are your inner-circle within the larger family. You do life
              together with them.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Men's Ministry</Title>
            <p>
              Whether it is the annual retreat, weekly Bible-studies, or special
              events designed for connection and fellowship. Men’s ministry has
              many “circles” available to choose from. There are studies and
              conversations surrounding Biblical manhood, husbands, fatherhood,
              and other topics that relate to men using their God-given
              uniqueness to love and serve Him. Men need other men to speak into
              their lives. This is a great way to make that happen.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Women's Ministry</Title>
            <p>
              There are three main ways that are women are woven together in
              “circles.” Calico meets on Tuesday mornings, Tapestry meets on
              Tuesday nights, and Common Thread meets on Wednesday nights. These
              three meetings are designed to provide encouragement and challenge
              about issues surrounding Biblical womanhood, wives, motherhood,
              and other topics that relate to women using their God-given
              uniqueness to love and serve Him.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Serve at DG</Title>
            <p>
              Circles are not only for taking. They are also for giving. Servant
              leaders are the heartbeat of our family life. Discipleship happens
              not only by learning, but by doing. It takes many people with a
              heart to serve the local church in various ways to make many of
              our ministries happen. Check out this form to see all of the ways
              in which you could give your time &amp; talent to serve the family
              of DG, whether it is an hour a month, a week, or more.
            </p>
          </Padding>
        </Container>
      </Section>

      <Section>
        <Container>
          <Padding>
            <Title>Our Leadership Team</Title>
          </Padding>
        </Container>
      </Section>
    </>
  )
}

export default GetInvolvedPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Get Involved" }) {
      ...PageBannerFragment
    }
  }
`
