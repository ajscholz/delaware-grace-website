import React from "react"
import tw from "twin.macro"

const StyledFooter = tw.footer`w-full p-10 mt-8 bg-white shadow-xl`

const Footer = () => {
  return (
    <StyledFooter>
      <Container>
        <div className="text-center text-sm">
          <p>© {new Date().getFullYear()} Delaware Grace Church</p>{" "}
          <p>
            Designed and developed by
            {` `}
            <a
              href="https://ajsolutions.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              AJSolutions
            </a>
          </p>
        </div>
      </Container>
    </StyledFooter>
  )
}

export default Footer

const Container = tw.div`max-w-screen-lg mx-auto py-3 px-8 h-full overflow-hidden flex justify-center`
