import React, { useState, useRef } from "react"
import tw from "twin.macro"

import { MdChevronRight, MdChevronLeft } from "react-icons/md"

import { useTransition, animated, config } from "react-spring"
import Link from "../Link"
import MessageCard from "./MessageCard"

// THIS DOES NOT WORK WITH THREE OR LESS ITENS
// IN THAT CASE ALWAYS USE THE FINITE CARD LIST

const perc = 105

const CardCarousel = ({ cards }) => {
  const [currentCards, setCurrentCards] = useState(cards)
  const direction = useRef(null)

  const getCurrentCards = cards => [cards[cards.length - 1], cards[0], cards[1]]
  const reducedCards = getCurrentCards(currentCards)

  const transitions = useTransition(reducedCards, card => card.id, {
    // config: { ...config.molasses, clamp: true },
    initial: item => {
      const ind = reducedCards.indexOf(item)
      const trans = (ind - 1) * perc
      return { transform: `translateX(${trans}%)` }
    },
    update: item => {
      const ind = reducedCards.indexOf(item)
      const trans = (ind - 1) * perc
      return { transform: `translateX(${trans}%)` }
    },

    leave: () => {
      let trans
      if (direction.current === "r") trans = -2 * perc
      if (direction.current === "l") trans = 2 * perc

      return { transform: `translateX(${trans}%)` }
    },
    from: () => {
      let trans
      if (direction.current === "r") trans = 2 * perc
      if (direction.current === "l") trans = -2 * perc

      return { transform: `translateX(${trans}%)` }
    },
    // enter: () => {
    //   let trans
    //   if (direction.current === "r") trans = 2 * perc

    //   if (direction.current === "l") trans = -2 * perc
    //   return { transform: `translateX(${trans}%)` }
    // },
    // enter: () => {
    //   let trans
    //   if (direction.current === "r") trans = 2 * perc
    //   if (direction.current === "l") trans = -2 * perc
    //   if (direction.curret === null)

    //   return { transform: `translateX(${trans}%)` }
    // },
  })

  // updates state array based on click direction
  const handleClick = dir => {
    const newCards = [...currentCards]
    if (dir === "left") {
      direction.current = "l"
      newCards.unshift(newCards.pop())
    }
    if (dir === "right") {
      direction.current = "r"
      newCards.push(newCards.shift())
    }
    setCurrentCards(newCards)
  }

  return (
    <div tw="relative flex justify-center items-center overflow-x-hidden ">
      <div tw="flex h-64 w-full md:w-1/3">
        {transitions.map(({ item, props, key }) => {
          return (
            <animated.div
              key={key}
              tw="absolute flex flex-col justify-center items-center px-8 md:px-5 py-2 h-full w-full md:w-1/3 flex-shrink-0"
              style={props}
            >
              <MessageCard
                message={item}
                tw="h-full w-full self-start rounded-md"
              />
              <div tw="mt-3 self-start">
                <h1 tw="text-xl leading-none text-gray-800">
                  <Link
                    to={`/messages/series/${item.series.slug}/${item.slug}`}
                  >
                    {item.title}
                  </Link>
                </h1>
                <p tw="text-gray-600 leading-tight text-xs mt-1">
                  {item.communicator.name}
                </p>
                <p tw="text-gray-600 leading-tight text-xs">{item.date}</p>
              </div>
            </animated.div>
          )
        })}
      </div>
      <Arrow style={{ left: "8px" }} onClick={() => handleClick("left")}>
        <MdChevronLeft tw="h-6 w-6 text-gray-700" />
      </Arrow>
      <Arrow style={{ right: "8px" }} onClick={() => handleClick("right")}>
        <MdChevronRight tw="h-6 w-6 text-gray-700" />
      </Arrow>
    </div>
  )
}

export default CardCarousel

const Arrow = tw.button`absolute h-10 w-10 mb-12 md:(h-12 w-12 mb-0) flex justify-center items-center rounded-full z-20 bg-gray-200 shadow-md border-none focus:(outline-none shadow-outline border-dgBlue-500)`
