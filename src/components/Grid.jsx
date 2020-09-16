import React, { useState, useEffect } from "react"
import { useTransition, a } from "react-spring"
// import shuffle from "lodash/shuffle"
import useMeasure from "../hooks/useMeasure"
import useMedia from "../hooks/useMedia"
// import data from "./data"
import "./styles.css"
import cardData from "../utils/data"
import Card from "./Card"

const Grid = ({ filters }) => {
  console.log(filters)
  const categories = Object.keys(filters)

  // filter only that cards that meet all the selected filters
  const cards = cardData.filter((card, i) => {
    // test each card with all the criteria
    // !categories.some is because .some returns as soon as it's truthy
    // so the card has to pass all the tests with FALSE instead of TRUE
    // That way as soon as it's truthy it exits the and excludes the card
    const includeCard = !categories.some(category => {
      // if there is not a filter applied stop checking this category
      if (filters[category].selected.length === 0) {
        return false
        // if there is a filter and it's an array, not a string
      } else if (typeof card[category] === "string") {
        // return whether the filter includes the card data
        return filters[category].selected.includes(card[category])
          ? false
          : true
      }
      // if there is a filter and it's not a string (it's an array)
      // return whether the
      return !filters[category].selected.some(item =>
        card[category].includes(item)
      )
    })

    return includeCard
  })

  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    ["(min-width: 1500px)", "(min-width: 1000px)", "(min-width: 600px)"],
    [5, 4, 3],
    2
  )
  // Hook2: Measure the width of the container element
  const [bind, { width }] = useMeasure()
  // Hook3: Hold items
  // const [items, set] = useState(cardData)
  // Hook4: shuffle data every 2 seconds
  // useEffect(() => void setInterval(() => set(shuffle), 2000), [])
  // Form a grid of stacked items using width & columns we got from hooks 1 & 2
  let heights = new Array(columns).fill(0) // Each column gets a height starting with zero
  let gridItems = cards.map((card, i) => {
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [(width / columns) * column, (heights[column] += 120) - 120] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...card, xy, width: width / columns, height: 120 }
  })
  // Hook5: Turn the static grid values into animated transitions, any addition, removal or change will be animated
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
      {transitions.map(({ item, props: { xy, ...rest }, key }) => (
        <a.div
          key={key}
          className="absolute p-2"
          style={{
            transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
            ...rest,
          }}
        >
          <Card card={item} />
        </a.div>
      ))}
    </div>
  )
}

export default Grid
