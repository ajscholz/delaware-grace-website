import React from "react"
import "twin.macro"

const FilterClearButton = ({ children, click }) => {
  return (
    <button
      tw="absolute top-0 right-0 divide-x-0"
      onClick={() => click()}
    >{`${children}`}</button>
  )
}

export default FilterClearButton
