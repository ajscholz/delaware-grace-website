import React from "react"
import { useTransition, a, useSpring } from "react-spring"
import useMeasure from "../../hooks/useMeasure"
import useMedia from "../../hooks/useMedia"
import MessageCard from "../cards/MessageCard"
import Title from "../Title"
import InfoChip from "../InfoChip"
import "twin.macro"

const height = 425
const otherHeights = 100

const FilteredList = ({ filteredCards, showFilters }) => {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    // Media queries
    [
      // "(min-width: 1200px)",
      "(min-width: 1200px)",
      "(min-width: 600px)",
      // "(min-width: 476px)",
    ],
    // Column counts (relates to above media queries by array index)
    [4, 3],
    // Default column count
    1
  )
  // Hook2: Measure the width of the container element
  const [bind, { width: measuredWidth }] = useMeasure()
  // const [imageRef, { height }] = useMeasure()
  // console.log(height)
  const width = measuredWidth + 24

  const latestHeight = width * 0.57
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

  const shrinkCard = useSpring({ width: showFilters ? "40%" : "100%" })
  // Render the grid
  return (
    <div
      {...bind}
      className="relative h-full w-full -mx-3"
      style={{ height: Math.max(...heights) }}
    >
      {transitions.map(({ item, props: { xy, ...rest }, key }, index) => {
        return index === 0 ? (
          <a.div
            key={key}
            className="absolute p-3 flex"
            style={{
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
              maxHeight: "100px",
              willChange: "transform, width, height, opacity",
            }}
          >
            <a.div
              style={{
                ...shrinkCard,
                willChange: "transform, width, height, opacity",
              }}
              tw="flex h-auto self-start max-h-full"
            >
              <MessageCard
                overlay
                fadeUp
                message={item}
                tw="h-auto max-h-full self-start"
              >
                {!showFilters && (
                  <>
                    <div>
                      <InfoChip>Latest Message</InfoChip>
                      <Title>{item.title}</Title>
                    </div>

                    <h6 className="text-gray-200 mr-1 flex items-end mb-3 text-2xl">
                      {item.date} | {item.communicator.name}
                    </h6>
                  </>
                )}
              </MessageCard>
            </a.div>
            {showFilters && (
              <div tw="w-3/5 ml-3">
                <h1 tw="text-xl leading-none text-gray-900">{item.title}</h1>
                <p tw="text-gray-600 leading-tight text-xs mt-1">
                  {item.communicator.name}
                </p>
                <p tw="text-gray-600 leading-tight text-xs">{item.date}</p>
              </div>
            )}
          </a.div>
        ) : (
          <a.div
            key={key}
            className="absolute p-3 flex"
            style={{
              transform: xy.interpolate(
                (x, y) => `translate3d(${x}px,${y}px,0)`
              ),
              ...rest,
              willChange: "transform, width, height, opacity",
            }}
          >
            <MessageCard message={item} tw="h-auto w-2/5 self-start" />
            <div tw="w-3/5 ml-3">
              <h1 tw="text-xl leading-none text-gray-900">{item.title}</h1>
              <p tw="text-gray-600 leading-tight text-xs mt-1">
                {item.communicator.name}
              </p>
              <p tw="text-gray-600 leading-tight text-xs">{item.date}</p>
            </div>
          </a.div>
        )
      })}
    </div>
  )
}

export default FilteredList
