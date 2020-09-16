import React from "react"
import { useTransition, a } from "react-spring"
import useMeasure from "../../hooks/useMeasure"
import useMedia from "../../hooks/useMedia"
import MessageCard from "../cards/MessageCard"
import "twin.macro"

const FilteredList = ({ filteredCards }) => {
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
  let gridItems = filteredCards.map((card, i) => {
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [(width / columns) * column, (heights[column] += 128) - 128] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return { ...card, xy, width: width / columns, height: 128 }
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
      {transitions.map(({ item, props: { xy, ...rest }, key }) => {
        return (
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
