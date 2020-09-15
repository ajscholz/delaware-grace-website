import React, { useState } from "react"
import { VscTriangleDown } from "react-icons/vsc"
import tw from "twin.macro"
import { useSpring, animated } from "react-spring"
import Button from "./Button"
import SingleFilter from "./filter/Filter"
import { filterData } from "../utils/data"
import FilterClearButton from "./filter/FilterClearButton"

const initialState = Object.fromEntries(
  Object.keys(filterData).map(key => {
    return [key, { selected: [], unselected: filterData[key] }]
  })
)

const Filter = () => {
  const [showFilters, setShowFilters] = useState(false)

  const [filter, setFilter] = useState(initialState)

  const clearFilters = () => setFilter(initialState)

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
        tw="h-64 col-span-2 overflow-hidden grid grid-cols-4 border-t-2 border-gray-300 pt-6"
        style={open}
      >
        {Object.keys(filter).some(key => filter[key].selected.length !== 0) && (
          <FilterClearButton click={clearFilters}>Clear All</FilterClearButton>
        )}

        {Object.keys(filterData).map(item => (
          <SingleFilter
            data={filter[item]}
            filterType={item}
            update={update}
            key={item}
          />
        ))}
      </animated.div>
    </>
  )
}

export default Filter
