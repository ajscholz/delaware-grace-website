// import React from "react"
import React from "react"
import tw, { styled, css, theme } from "twin.macro"

const Item = styled.li(() => [
  tw`text-dgBlue-600 font-semibold text-xs flex items-center before:(mx-2 bg-dgBlue-600 rounded-full mt-px)`,
  css`
    &:not(:first-child)::before {
      display: block;
      content: "";
      height: 3px;
      width: 3px;
    }
  `,
])

const TagList = ({ tags, ...rest }) => {
  return (
    <ul tw="flex list-none" {...rest}>
      {tags.map(tag => (
        <Item key={tag}>{tag}</Item>
      ))}
    </ul>
  )
}

export default TagList
