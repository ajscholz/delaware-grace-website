import React, { useState } from "react"
import { VscTriangleDown } from "react-icons/vsc"
import tw from "twin.macro"
import { useSpring, animated } from "react-spring"
import Button from "./Button"

const Filter = () => {
  const [showFilters, setShowFilters] = useState(false)

  const flip = useSpring({
    transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
  })

  const open = useSpring({
    height: showFilters ? "256px" : "0px",
    opacity: showFilters ? 1 : 0,
  })

  const AnimatedIcon = animated(VscTriangleDown)

  return (
    <>
      <Button
        onClick={() => setShowFilters(!showFilters)}
        tw="flex items-center my-auto mr-0 ml-auto py-2 px-8 bg-dgBlue border-dgBlue text-blue-100 rounded-full active:outline-none focus:outline-none shadow-sm"
      >
        <span tw="mr-2">
          <AnimatedIcon style={flip} />
        </span>
        {/* {`${showFilters ? `Show` : `Hide`} Filters`} */}
        Filter Messages
      </Button>
      <animated.div
        tw="bg-red-500 h-64 col-span-2 overflow-hidden"
        style={open}
      >
        here are some filters
      </animated.div>
    </>
  )
}

export default Filter
