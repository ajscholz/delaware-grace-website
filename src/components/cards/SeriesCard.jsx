import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import CardBase from "./CardBase"
import { useSpring, animated, config } from "react-spring"
import tw from "twin.macro"
import Overlay from "../Overlay"

const ContentContainer = tw.div`absolute w-full bottom-0 p-4 leading-tight flex justify-between text-white`

const SeriesCard = ({ series, children, fadeUp, overlay, list, ...props }) => {
  const [hover, set] = useSpring(() => ({
    transform: "scale(1)",
    config: config.wobbly,
  }))

  const grow = () => {
    set({ transform: "scale(1.05)" })
  }

  const shrink = () => {
    set({ transform: "scale(1)" })
  }

  const AnimatedCardBase = animated(CardBase)
  return (
    <AnimatedCardBase
      tw="mt-0"
      style={{ ...hover, willChange: "transform, height, width" }}
      onMouseEnter={() => grow()}
      onMouseLeave={() => shrink()}
      onFocus={() => grow()}
      onBlur={() => shrink()}
      {...props}
    >
      <Link to={`/messages/series/${series.slug}`}>
        {/* <CardBase {...props}> */}
        <div
          tw="relative h-0 text-gray-900 h-full"
          // style={{ paddingBottom: "56.25%" }}
        >
          <Image
            tw="h-full w-full absolute! inset-0"
            fluid={series.graphic.fluid}
          />
          {overlay && <Overlay fadeUp={fadeUp} />}
          <ContentContainer>{children}</ContentContainer>
        </div>
        {/* </CardBase> */}
      </Link>
    </AnimatedCardBase>
  )
}

export default React.memo(
  SeriesCard,
  (prevProps, nextProps) => prevProps.message === nextProps.message
)

export const query = graphql`
  fragment SeriesCardFragment on ContentfulMessageSeries {
    id: contentful_id
    title
    startMo: startingDate(formatString: "MMM")
    endMo: endingDate(formatString: "MMM")
    month
    topics: tags
    year
    slug
    graphic {
      fluid(maxWidth: 300, quality: 50) {
        ...GatsbyContentfulFluid_withWebp
      }
    }
  }
`
