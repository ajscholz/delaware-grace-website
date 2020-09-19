import React from "react"
import FilterChip from "./FilterChip"
import "twin.macro"
import { useTransition, animated } from "react-spring"
import { FiX } from "react-icons/fi"

import { useHocus } from "../../hooks/useHocus"

// helper functions to add or remove from an array - don't need
// instantiated on every render

const addTodata = (arr, item) => arr.concat([item]).sort()
const removeFromdata = (arr, item) =>
  arr.filter(el => {
    return el !== item
  })

const Filter = ({ data, filterType, update }) => {
  const noFilters = data.selected.length === 0

  // close button transition
  const showButton = useTransition(!noFilters, null, {
    from: {
      position: "relative",
      opacity: 0,
      width: "0px",
      marginRight: "0px",
    },
    enter: {
      opacity: 1,
      width: "18px",
      marginRight: "4px",
    },
    leave: {
      opacity: 0,
      width: "0px",
      marginRight: "0px",
    },
  })
  const rotate = useTransition(!noFilters, null, {
    from: { transform: "rotate(-180deg)" },
    enter: { transform: "rotate(0deg)" },
    leave: { transform: "rotate(-180deg)" },
  })
  //

  const [hocus, styles] = useHocus({
    from: { border: `2px solid rgba(248, 165, 174, 0)` },
    to: { border: `2px solid rgba(248, 165, 174, 1)` },
  })

  // create a new array with key/value pairs based on whether the item is selected or not
  const dataArr = noFilters
    ? // if there are no filters just create a new array with every key/falue pair set to false
      data.unselected.map(i => [i, false])
    : data.selected
        // create a new array for all the selected items
        .map(i => [i, true])
        // concat with new array for all the unselected items
        .concat(data.unselected.map(i => [i, false]))
        // sort the concatted array to alphabetize
        .sort()

  const AnimatedClose = animated(FiX)

  return (
    <div tw="relative text-left mb-6 md:(mb-0) last-of-type:(mb-0)">
      <div tw="flex items-center">
        {showButton.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{
                  willChange: "position, opacity, width, margin",
                  ...props,
                }}
                tw="self-center"
              >
                <animated.button
                  onFocus={() => hocus(true)}
                  onBlur={() => hocus(false)}
                  onMouseEnter={() => hocus(true)}
                  onMouseLeave={() => hocus(false)}
                  style={{
                    willChange: "border, transform",
                    left: "-2px",
                    ...styles,
                  }}
                  aria-label={`Clear ${filterType} Filter`}
                  tw="relative box-content text-dgRed-100 rounded-full p-xs border-solid bg-dgRed-500 focus:outline-none bg-clip-padding"
                  onClick={() =>
                    update(filterType, {
                      selected: [],
                      unselected: data.unselected.concat(data.selected).sort(),
                    })
                  }
                >
                  {rotate.map(
                    ({ item, key, props }) =>
                      item && (
                        <AnimatedClose
                          tw="text-xs"
                          key={key}
                          // style={{ height: "12px", width: "12px" }}
                          style={{ willChange: "transform", ...props }}
                        />
                      )
                  )}
                </animated.button>
              </animated.div>
            )
        )}

        <h3 className="text-2xl leading-none">{filterType}</h3>
      </div>
      <div className="-mx-1">
        {dataArr.map(item => {
          return (
            <FilterChip
              className={`filter-chip ${item[1] ? "active" : ""}`}
              active={item[1]}
              click={() => {
                update(filterType, {
                  selected: item[1]
                    ? removeFromdata(data.selected, item[0])
                    : addTodata(data.selected, item[0]),
                  unselected: item[1]
                    ? addTodata(data.unselected, item[0])
                    : removeFromdata(data.unselected, item[0]),
                })
              }}
              key={item[0].replace(/ /g, "")}
            >
              {item[0]}
            </FilterChip>
          )
        })}
      </div>
    </div>
  )
}

export default Filter
