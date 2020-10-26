import React from "react"
import tw from "twin.macro"
import { MdMap, MdPhone, MdEmail } from "react-icons/md"
import { FaFacebookSquare, FaInstagram, FaYoutube } from "react-icons/fa"

import colors from "../utils/socialColors"
import Link from "./Link"

const StyledFooter = tw.footer`w-full bg-white shadow-xl flex flex-col`

const StyledLink = tw.a`flex items-center not-last-of-type:after:(lg:content block w-1 h-1 rounded-full bg-gray-500 mx-3)`

const FooterNavHeader = tw.div`text-xs uppercase text-gray-500 font-bold`
const FooterGridSection = tw.div`w-auto`

const Footer = () => {
  return (
    <StyledFooter>
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

      <Container tw="max-w-full px-4 flex flex-col items-center">
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
      <div className="text-center text-gray-600 border-t-2 border-gray- w-full">
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
