import tw, { styled } from "twin.macro"

const Overlay = styled.div(({ fadeUp }) => [
  tw`absolute inset-0`,
  fadeUp && tw`bg-gradient-to-t from-black via-transparent bg-opacity-10`,
  !fadeUp && tw`bg-black bg-opacity-30`,
])

export default Overlay
