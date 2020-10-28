import React from "react"
import tw from "twin.macro"
import { graphql, useStaticQuery } from "gatsby"

// import Link from "./Link"

import { MdMap, MdPhone, MdEmail } from "react-icons/md"
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa"

import colors from "../utils/socialColors"
const StyledFooter = tw.footer`w-full bg-white shadow-xl flex flex-col z-10`

const StyledLink = tw.a`flex items-center not-last-of-type:after:(lg:content block w-1 h-1 rounded-full bg-gray-500 mx-3)`

// const FooterNavHeader = tw.div`text-xs uppercase text-gray-500 font-bold`
// const FooterGridSection = tw.div`w-auto`

const footerNavPages = [
  "Core",
  "Get Involved",
  "Daycare",
  "Outreach",
  "Plan A Visit",
]

const Footer = () => {
  const { pages } = useStaticQuery(graphql`
    {
      pages: allContentfulPage {
        all: nodes {
          body {
            ... on ContentfulActionSection {
              title
            }
            ... on ContentfulExpandingCardsSection {
              title
            }
            # ... on ContentfulGallerySection {
            #   title
            # }
            ... on ContentfulTeamSection {
              title
            }
            ... on ContentfulTextSection {
              title
            }
          }
          title
        }
      }
    }
  `)

  // get only the pages included in the variable above
  const footerNavSections = pages.all.filter(page =>
    footerNavPages.includes(page.title)
  )

  // sort into the order of the variable above for display purposes
  const sortedFooterNavSections = footerNavPages.map(title => {
    const index = footerNavSections.findIndex(x => x.title === title)
    return footerNavSections[index]
  })

  return (
    <StyledFooter>
      <Container tw="py-10">
        <div tw="w-full grid grid-cols-5 gap-3 justify-between">
          {sortedFooterNavSections.map(page => (
            <div tw="w-48" key={page.title}>
              <div tw="text-xs font-bold text-gray-500 uppercase mr-auto mb-2">
                {page.title}
              </div>

              {page.body !== null &&
                page.body.map(section => (
                  <div tw="text-sm text-gray-800 mt-1" key={section.title}>
                    {section.title}
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Container>
      {/* <Container>
        <nav tw="py-3 grid grid-cols-2">
          <FooterGridSection>
            <FooterNavHeader>Connect</FooterNavHeader>
          </FooterGridSection>
          <FooterGridSection>
            <FooterNavHeader>Get Involved</FooterNavHeader>
          </FooterGridSection>
          <FooterGridSection>
            <FooterNavHeader>Messages</FooterNavHeader>
          </FooterGridSection>
          <FooterGridSection>
            <FooterNavHeader>Outreach</FooterNavHeader>
          </FooterGridSection>
        </nav>
      </Container> */}

      <Container tw="max-w-full px-4 flex flex-col items-center pb-8">
        <div tw="flex flex-col items-center lg:flex-row text-center">
          <StyledLink
            tw="mb-2 md:mb-0"
            href="https://goo.gl/maps/Lz5jg8nC57PRvFbP9"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MdMap tw="text-gray-700 mr-1" />
            375 Hills-Miller Rd, Delaware, OH 43015
          </StyledLink>
          <StyledLink tw="mb-2 md:mb-0" href="tel:7403633613">
            <MdPhone tw="text-gray-700 mr-1" />
            (740) 363-3613
          </StyledLink>
          <StyledLink href="mailto:questions@delawaregrace.org">
            <MdEmail tw="text-gray-700 mr-1" />
            questions@delawaregrace.org
          </StyledLink>
        </div>
        <div tw="flex mt-3 text-2xl grid gap-2 grid-cols-3">
          <FaFacebookSquare color={colors.facebook} />
          <FaYoutube color={colors.youtube} />
          <FaInstagram color={colors.instagram} />
        </div>
      </Container>
      <div className="text-center text-gray-600 border-t-2 border-gray-300 w-full">
        <Container tw="flex flex-col md:flex-row items-center">
          <div tw="flex items-center after:(md:content block w-1 h-1 rounded-full bg-gray-500 mx-3)">
            ©{new Date().getFullYear()} Delaware Grace Church
          </div>
          <div>
            Designed and developed by&nbsp;
            <a
              href="https://ajsolutions.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              AJSolutions
            </a>
          </div>
        </Container>
      </div>
    </StyledFooter>
  )
}

export default Footer

const Container = tw.div`max-w-screen-lg mx-auto py-3 px-8 h-full overflow-hidden flex justify-center`
