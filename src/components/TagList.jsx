// import React from "react"
import React from "react"
import PropTypes from "prop-types"
import tw, { styled, css } from "twin.macro"
import { IoMdPricetags } from "react-icons/io"

const Item = styled.li(() => [
  tw`flex items-center before:(mx-2 mt-px)`,
  css`
    &:not(:first-of-type)::before {
      display: block;
      content: "•";
      /* content: ""; */
    }
  `,
])

const TagList = ({ tags, icon, ...rest }) => {
  return (
    <ul tw="flex list-none items-center" {...rest}>
      {icon !== false && (
        <span aria-label="tags" tw="mr-3">
          <IoMdPricetags />
        </span>
      )}
      {tags.map(tag => (
        <Item key={tag}>{tag}</Item>
      ))}
    </ul>
  )
}

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.bool,
}

TagList.defaultProps = {
  icon: false,
}

export default TagList
