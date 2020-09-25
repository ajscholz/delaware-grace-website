import React from "react"
import "twin.macro"
import { useTransition, a } from "react-spring"

import useMeasure from "../../hooks/useMeasure"
import useMedia from "../../hooks/useMedia"
import getSeriesDate from "../../utils/functions/getSeriesDate"

import MessageCard from "../cards/MessageCard"
// import Title from "../Title"
import InfoChip from "../InfoChip"
import SeriesCard from "../cards/SeriesCard"

const FilteredList = ({ filteredCards, showFilters, kind }) => {
  // Hook1: Tie media queries to the number of columns
  const columns = useMedia(
    // Media queries
    ["(min-width: 820px)", "(min-width: 580px)"],
    // Column counts (relates to above media queries by array index)
    [3, 2],
    // Default column count
    1
  )

  const height = columns === 1 ? 110 : columns.length === 2 ? 100 : 110
  // Hook2: Measure the width of the container element
  const [widthRef, { width: measuredWidth }] = useMeasure()
  // const [cardHeightRef, { height: cardHeight }] = useMeasure()
  // const [imageRef, { height }] = useMeasure()
  // console.log(height)
  const width = measuredWidth + 24
  // console.log(cardHeight)

  // const latestHeight = cardWidth * 0.5625
  // console.log("latest height", cardHeight)
  // Form a grid of stacked items using width & columns we got from hooks 1 & 2
  let heights = new Array(columns).fill(0) // Each column gets a height starting with zero

  // console.log("heights", heights)
  let gridItems = filteredCards.map((card, i) => {
    // if (i === 1 && showFilters === false) {
    //   heights = heights.map(() => latestHeight)
    // }
    const column = heights.indexOf(Math.min(...heights)) // Basic masonry-grid placing, puts tile into the smallest column using Math.min
    const xy = [
      (width / columns) * column,
      (heights[column] += height) - height,
    ] // X = container width / number of columns * column index, Y = it's just the height of the current column
    return {
      ...card,
      xy,
      width: width / columns,
      height: height,
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

  // const shrinkCard = useSpring({ width: showFilters ? "40%" : "100%" })
  // Render the grid
  return (
    <div
      {...widthRef}
      className="relative h-full w-full -mx-3"
      style={{ height: Math.max(...heights) }}
    >
      {transitions.map(({ item, props: { xy, ...rest }, key }, index) => {
        // return index === 0 ? (
        //   <a.div
        //     key={key}
        //     className="absolute p-3 flex"
        //     style={{
        //       transform: xy.interpolate(
        //         (x, y) => `translate3d(${x}px,${y}px,0)`
        //       ),
        //       ...rest,
        //       maxHeight: "100px",
        //       willChange: "transform, width, height, opacity",
        //     }}
        //   >
        //     {kind === "series" ? null : (
        //       // <>
        //       //   <a.div
        //       //     style={{
        //       //       ...shrinkCard,
        //       //       willChange: "transform, width, height, opacity",
        //       //     }}
        //       //     tw="flex h-auto self-start max-h-full"
        //       //   >
        //       //     <SeriesCard
        //       //       overlay
        //       //       fadeUp
        //       //       series={item}
        //       //       tw="h-auto max-h-full self-start"
        //       //     >
        //       //       {!showFilters && (
        //       //         <>
        //       //           <div>
        //       //             <InfoChip>Latest Series</InfoChip>
        //       //             <Title>{item.title}</Title>
        //       //           </div>

        //       //           <h6 className="text-gray-200 mr-1 flex items-end mb-3 text-2xl">
        //       //             {getSeriesDate(item.startMo, item.endMo, item.year)}
        //       //           </h6>
        //       //         </>
        //       //       )}
        //       //     </SeriesCard>
        //       //   </a.div>
        //       //   {showFilters && (
        //       //     <div tw="w-3/5 ml-3">
        //       //       <h1 tw="text-xl leading-none text-gray-900">
        //       //         {item.title}
        //       //       </h1>
        //       //       <p tw="text-gray-600 leading-tight text-xs">
        //       //         {getSeriesDate(item.startMo, item.endMo, item.year)}
        //       //       </p>
        //       //     </div>
        //       //   )}
        //       // </>
        //       <>
        //         <a.div
        //           style={{
        //             ...shrinkCard,
        //             willChange: "transform, width, height, opacity",
        //           }}
        //           tw="flex h-auto self-start max-h-full"
        //         >
        //           <MessageCard
        //             overlay
        //             fadeUp
        //             message={item}
        //             tw="h-auto max-h-full self-start"
        //           >
        //             {!showFilters && (
        //               <>
        //                 <div>
        //                   <InfoChip>Latest Message</InfoChip>
        //                   <Title>{item.title}</Title>
        //                 </div>

        //                 <h6 className="text-gray-200 mr-1 flex items-end mb-3 text-2xl">
        //                   {item.date}
        //                   {item.communicator &&
        //                     `  |  ${item.communicator.name}`}
        //                 </h6>
        //               </>
        //             )}
        //           </MessageCard>
        //         </a.div>
        //         {showFilters && (
        //           <div tw="w-3/5 ml-3">
        //             <h1 tw="text-xl leading-none text-gray-900">
        //               {item.title}
        //             </h1>
        //             {item.communicator && (
        //               <p tw="text-gray-600 leading-tight text-xs mt-1">
        //                 {item.communicator.name}
        //               </p>
        //             )}
        //             <p tw="text-gray-600 leading-tight text-xs">{item.date}</p>
        //           </div>
        //         )}
        //       </>
        //     )}
        //   </a.div>
        // ) : (
        return (
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
            {kind === "series" ? (
              <>
                <SeriesCard
                  series={item}
                  tw="h-full w-2/5 md:w-1/2 self-start rounded-md"
                />
                <div tw="w-3/5 md:w-1/2 ml-3">
                  <h1 tw="text-xl leading-none text-gray-900">{item.title}</h1>
                  <p tw="text-gray-600 leading-tight text-xs">
                    {getSeriesDate(item.startMo, item.endMo, item.year)}
                  </p>
                </div>
              </>
            ) : (
              <>
                <MessageCard
                  message={item}
                  tw="h-full w-2/5 md:w-1/2 self-start rounded-md"
                />
                <div tw="w-3/5 md:w-1/2 ml-3">
                  <h1 tw="text-xl leading-none text-gray-900">{item.title}</h1>
                  <p tw="text-gray-600 leading-tight text-xs mt-1">
                    {item.communicator.name}
                  </p>
                  <p tw="text-gray-600 leading-tight text-xs">{item.date}</p>
                </div>
              </>
            )}
          </a.div>
        )
        // )
      })}
    </div>
  )
}

export default FilteredList
