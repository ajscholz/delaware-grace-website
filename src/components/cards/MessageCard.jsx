import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import CardBase from "./CardBase"
import { useSpring, animated, config } from "react-spring"
import tw from "twin.macro"
import Overlay from "../Overlay"

const ContentContainer = tw.div`absolute w-full bottom-0 p-4 leading-tight flex justify-between text-white`

const MessageCard = ({
  message,
  children,
  fadeUp,
  overlay,
  list,
  ...props
}) => {
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
      tw="mt-0 h-32"
      style={hover}
      onMouseEnter={() => grow()}
      onMouseLeave={() => shrink()}
      onFocus={() => grow()}
      onBlur={() => shrink()}
      {...props}
    >
      <Link to={`/messages/series/${message.series.slug}/${message.slug}`}>
        {/* <CardBase {...props}> */}
        <div tw="relative h-0" style={{ paddingBottom: "56.25%" }}>
          <Image
            tw="h-full w-full absolute! inset-0"
            fluid={message.thumbnail.image.fluid}
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
  MessageCard,
  (prevProps, nextProps) => prevProps.message === nextProps.message
)

export const query = graphql`
  fragment MessageCardFragment on ContentfulMessage {
    id: contentful_id
    title
    date(formatString: "MMM D, YYYY")
    communicator {
      name
    }
    slug
    series {
      slug
    }
    thumbnail {
      image: childImageSharp {
        fluid(webpQuality: 100, maxWidth: 960) {
          ...GatsbyImageSharpFluid_withWebp
        }
      }
    }
    topics: tags
  }
`
