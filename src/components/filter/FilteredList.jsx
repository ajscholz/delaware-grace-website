import React from "react"
import { useTransition, a } from "react-spring"
import useMeasure from "../../hooks/useMeasure"
import useMedia from "../../hooks/useMedia"
import MessageCard from "../cards/MessageCard"
import "twin.macro"

const latestHeight = 256
const otherHeights = 128

const FilteredList = ({ filteredCards, showFilters }) => {
  console.log(showFilters)
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    // Media queries
    [
      "(min-width: 1200px)",
      "(min-width: 900px)",
      "(min-width: 600px)",
      "(min-width: 476px)",
    ],
    // Column counts (relates to above media queries by array index)
    [5, 4, 3, 2],
    // Default column count
    1
  )
  // Hook2: Measure the width of the container element
  const [bind, { width }] = useMeasure()
  // Form a grid of stacked items using width & columns we got from hooks 1 & 2
  let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
  let gridItems = filteredCards.map((card, i) => {
    if (i === 1 && showFilters === false) {
      heights = heights.map(() => latestHeight)
    }
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy =
      i === 0 && showFilters === false
        ? [
            (width / columns) * column,
            (heights[column] += latestHeight) - latestHeight,
          ]
        : [
            (width / columns) * column,
            (heights[column] += otherHeights) - otherHeights,
          ] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...card,
      xy,
      width: i === 0 && showFilters === false ? width : width / columns,
      height: i === 0 && showFilters === false ? latestHeight : otherHeights,
    }
  })
  // Hook3: Turn the static grid values into animated transitions, any addition, removal or change will be animated
  const transitions = useTransition(gridItems, item => item.title, {
    from: ({ xy, width, height }) => ({ xy, width, height, opacity: 0 }),
    enter: ({ xy, width, height }) => ({ xy, width, height, opacity: 1 }),
    update: ({ xy, width, height }) => ({ xy, width, height }),
    leave: { height: 0, opacity: 0 },
    config: { mass: 5, tension: 500, friction: 100 },
    trail: 25,
  })

  // Render the grid
  return (
    <div
      {...bind}
      className="relative h-full w-full"
      style={{ height: Math.max(...heights) }}
    >
      {transitions.map(({ item, props: { xy, ...rest }, key }, index) => {
        return index === 0 ? (
          <a.div
            key={key}
            className="absolute p-2"
            style={{
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
            }}
          >
            <MessageCard message={item} tw="h-full" />
          </a.div>
        ) : (
          <a.div
            key={key}
            className="absolute p-2"
            style={{
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
            }}
          >
            <MessageCard message={item} tw="h-full" />
          </a.div>
        )
      })}
    </div>
  )
}

export default FilteredList
