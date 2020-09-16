import { useSpring } from "react-spring"

export const useHocus = additionalStyles => {
  const [styles, set] = useSpring(() => ({
    transform: "scale(1)",
    ...(additionalStyles && additionalStyles.from),
  }))

  const hocus = () => {
    set({
      transform: "scale(1.2)",
      ...(additionalStyles && additionalStyles.to),
    })
  }

  const blur = () => {
    set({
      transform: "scale(1)",
      ...(additionalStyles && additionalStyles.from),
    })
  }

  return [hocus, blur, styles]
}
