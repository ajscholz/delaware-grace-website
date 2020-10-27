import React from "react"
import "twin.macro"

const CardGrid = ({ children }) => {
  return <div tw="grid grid-cols-2 gap-10">{children}</div>
}

export default CardGrid
