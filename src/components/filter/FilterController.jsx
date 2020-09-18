import React, { useState } from "react"
import "twin.macro"
import Filter from "./Filter"
import { VscTriangleDown } from "react-icons/vsc"
import { useSpring, animated } from "react-spring"
import Button from "../Button"
import useMeasure from "../../hooks/useMeasure"

const FilterController = ({
  setFilter,
  queryData,
  filter,
  showFilters,
  setShowFilters,
}) => {
  const [bind, { height }] = useMeasure()

  const update = (filterType, newState) => {
    setFilter({
      ...filter,
      [filterType]: newState,
    })
  }

  const flip = useSpring({
    transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
  })

  const open = useSpring({
    // height is adding height of
    height: showFilters ? height + 48 : 0,
    opacity: showFilters ? 1 : 0,
    // paddingBottom: showFilters ? 24 : 12,
    paddingTop: showFilters ? 24 : 0,
    marginBottom: showFilters ? 24 : 0,
  })

  const AnimatedIcon = animated(VscTriangleDown)
  return (
    <>
      <Button
        onClick={() => setShowFilters(!showFilters)}
        tw="flex items-center row-start-2 -mt-2 mb-6 ml-0 mr-auto text-sm py-1 px-6 md:row-start-1 md:col-start-2 md:my-auto md:mr-0 md:ml-auto md:text-base md:py-2 md:px-8 bg-dgBlue-500 border-dgBlue-500 text-blue-100 rounded-full active:outline-none focus:outline-none shadow-sm"
      >
        <span tw="mr-2">
          <AnimatedIcon style={flip} />
        </span>
        Filter Messages
      </Button>
      <animated.div
        tw="col-span-2 overflow-hidden border-t-2 border-b-2 border-gray-300"
        aria-hidden={showFilters ? false : true}
        style={open}
      >
        <div
          tw="grid grid-cols-1 md:grid-cols-3 grid-rows-none gap-x-4"
          {...bind}
        >
          {Object.keys(queryData).map(item => (
            <Filter
              data={filter[item]}
              filterType={item}
              update={update}
              key={item}
            />
          ))}
        </div>
      </animated.div>
    </>
  )
}

export default FilterController
