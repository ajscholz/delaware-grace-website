import React from "react"
import "twin.macro"

const CardGrid = ({ children }) => {
  return (
    <div tw="px-2 sm:px-24 md:px-0 grid grid-cols-1 md:grid-cols-2 gap-10">
      {children}
    </div>
  )
}

export default CardGrid
