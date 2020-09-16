import React, { useState } from "react"
import { VscTriangleDown } from "react-icons/vsc"
import "twin.macro"
import { useSpring, animated } from "react-spring"
import Button from "./Button"
import SingleFilter from "./filter/Filter"
import { filterData } from "../utils/data"
// import FilterClearButton from "./filter/FilterClearButton"
import { graphql, useStaticQuery } from "gatsby"

const Filter = () => {
  const queryData = useStaticQuery(graphql`
    {
      communicator: allContentfulMessage {
        unselected: distinct(field: communicator___name)
      }
      tags: allContentfulMessage {
        unselected: distinct(field: tags)
      }
      year: allContentfulMessage {
        unselected: distinct(field: year)
      }
    }
  `)
  Object.keys(queryData).forEach(key => (queryData[key].selected = []))
  const initialState = { ...queryData }

  const [showFilters, setShowFilters] = useState(false)
  const [filter, setFilter] = useState(initialState)

  // const clearFilters = () => setFilter(initialState)

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
        tw="flex items-center my-auto mr-0 ml-auto py-2 px-8 bg-dgBlue-500 border-dgBlue-500 text-blue-100 rounded-full active:outline-none focus:outline-none shadow-sm"
      >
        <span tw="mr-2">
          <AnimatedIcon style={flip} />
        </span>
        {/* {`${showFilters ? `Show` : `Hide`} Filters`} */}
        Filter Messages
      </Button>
      <animated.div
        tw="h-64 col-span-2 overflow-hidden border-t-2 border-gray-300 pt-6"
        style={open}
      >
        {/* {Object.keys(filter).some(key => filter[key].selected.length !== 0) && (
          <FilterClearButton click={clearFilters}>Clear All</FilterClearButton>
        )} */}
        <div tw="grid grid-cols-3 grid-rows-none gap-x-4">
          {Object.keys(filterData).map(item => (
            <SingleFilter
              data={filter[item]}
              filterType={item}
              update={update}
              key={item}
            />
          ))}
        </div>

        {/* <div tw="flex mt-6">
          <button
            tw="mx-auto text-sm bg-dgRed-200 text-dgRed-100 py-1 px-6"
            onClick={() => clearFilters()}
          >
            Clear All
          </button>
        </div> */}
      </animated.div>
    </>
  )
}

export default Filter
