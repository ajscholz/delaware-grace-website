import React from "react"

const FilterClearButton = ({ children, click }) => {
  return (
    <button
      className="absolute top-0 right-0"
      onClick={() => click()}
    >{`${children}`}</button>
  )
}

export default FilterClearButton
