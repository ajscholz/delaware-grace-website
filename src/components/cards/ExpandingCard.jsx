import React, { useRef } from "react"
import PropTypes from "prop-types"
import "twin.macro"
import { graphql } from "gatsby"
import { useSpring, animated } from "react-spring"

import CardBase from "./CardBase"
import FocalPointImage from "../FocalPointImage"

import { VscTriangleDown } from "react-icons/vsc"

import useMeasure from "../../hooks/useMeasure"
import RichText from "../RichText"

const ExpandingCard = props => {
  const { card } = props

  const isOpen = useRef(false)
  const [bind, { height }] = useMeasure()
  const [open, setOpen] = useSpring(() => ({
    height: 0,
    opacity: 0.25,
    transform: "rotate(0deg)",
  }))

  const handleClick = () => {
    if (isOpen.current) {
      setOpen({ height: 0, opacity: 0.25, transform: "rotate(0deg)" })
    } else {
      setOpen({ height: height, opacity: 1, transform: "rotate(180deg)" })
    }
    isOpen.current = !isOpen.current
  }

  const AnimatedIcon = animated(VscTriangleDown)

  return (
    <div tw="">
      <CardBase tw="h-72 shadow-none">
        <FocalPointImage
          image={card.image}
          alt=""
          focalPoint={card.focalPoint.focalPoint}
        />
      </CardBase>
      <div tw="mt-3">
        <h2 tw="text-3xl text-gray-800">{card.title}</h2>
        <p tw="text-gray-700">{card.previewText.previewText}</p>
        <button
          tw="flex items-center bg-none outline-none shadow-none text-dgBlue-500 mt-2 font-bold text-sm uppercase mb-2 pr-1 rounded-lg focus:(outline-none shadow-outline border-dgBlue-500)"
          onClick={() => handleClick()}
        >
          <AnimatedIcon tw="mr-2" style={{ transform: open.transform }} />
          See More
        </button>
        <animated.div
          tw="overflow-hidden text-gray-600"
          style={{ height: open.height, opacity: open.opacity }}
        >
          <div {...bind}>
            {card.expandedContent.map(
              item =>
                item.internal.type === "ContentfulTextBox" && (
                  <RichText key={item.id}>{item.text.json}</RichText>
                )
            )}
          </div>
        </animated.div>
      </div>
    </div>
  )
}

ExpandingCard.propTypes = {
  card: PropTypes.object.isRequired,
}

export default ExpandingCard

export const query = graphql`
  fragment ExpandingCardFragment on ContentfulExpandingCard {
    id: contentful_id
    title
    previewText {
      previewText
    }
    image {
      fluid {
        ...GatsbyContentfulFluid_withWebp
      }
      file {
        details {
          image {
            width
            height
          }
        }
      }
    }
    focalPoint {
      focalPoint {
        x
        y
      }
    }
    expandedContent {
      id: contentful_id
      text {
        json
      }
      internal {
        type
      }
    }
    internal {
      type
    }
  }
`
