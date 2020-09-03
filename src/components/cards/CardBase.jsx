import tw, { styled } from "twin.macro"

const CardBase = styled.div(({ large }) => [
  tw`relative rounded-lg shadow overflow-hidden w-full mt-5`,
  large === true ? tw`h-132 md:h-144` : tw`h-108`,
])

export default CardBase
