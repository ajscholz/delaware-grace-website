import { useSpring } from "react-spring"

export const useHocus = (additionalStyles, grow, scale = "1.2") => {
  const transformProps =
    grow === false
      ? { from: {}, to: {} }
      : {
          from: { transform: "scale(1)" },
          to: { transform: `scale(${scale})` },
        }
  const [styles, set] = useSpring(() => ({
    ...transformProps.from,
    ...(additionalStyles && additionalStyles.from),
  }))

  const hocus = hocus => {
    switch (hocus) {
      case true:
        set({
          ...transformProps.to,
          ...(additionalStyles && additionalStyles.to),
        })
        break
      case false:
        set({
          ...transformProps.from,
          ...(additionalStyles && additionalStyles.from),
        })
        break
      case "activeTrue":
        set({
          ...transformProps.to,
          ...(additionalStyles && additionalStyles.to),
        })
        break
      default:
        throw new Error("Hocus called with invalid argument.")
    }
  }

  return [hocus, styles]
}
