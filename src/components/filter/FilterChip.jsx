import React, { useRef } from "react"
import { useSpring, useChain, animated } from "react-spring"
import resolveConfig from "tailwindcss/resolveConfig"
import tailwindConfig from "../../../tailwind.config"
import { useHocus } from "../../hooks/useHocus"

const {
  theme: { colors },
} = resolveConfig(tailwindConfig)

// const springConfig = {
//   tension: 425,
//   friction: 25,
//   clamp: true,
// }

const FilterChip = ({ children, className, click, active }) => {
  // const [focused, setFocused] = useState(false)

  const buttonSpring = useSpring({
    // config: springConfig,
    // borderWidth: focused ? "2px " : "0px",
    background: active ? colors.dgGreen[500] : colors.gray[300],
    color: active ? colors.dgGreen[900] : colors.gray[800],
  })
  const shiftRef = useRef()
  const shiftSpring = useSpring({
    // config: springConfig,
    ref: shiftRef,
    marginLeft: active ? "16px" : "0px",
  })

  const checkRef = useRef()
  const checkSpring = useSpring({
    // config: springConfig,
    ref: checkRef,
    from: { offset: 24 },
    offset: active ? 0 : 24,
  })
  useChain(active ? [shiftRef, checkRef] : [checkRef, shiftRef], [0, 0.2])

  const [hocus, hocusStyles] = useHocus(
    {
      from: {
        border: active
          ? `2px solid rgba(74, 93, 32, 0)`
          : `2px solid rgba(113, 128, 150, 0)`,
      },
      to: {
        border: active
          ? `2px solid rgba(74, 93, 32, 1)`
          : `2px solid rgba(113, 128, 150, 1)`,
      },
    },
    false
  )

  return (
    <>
      <animated.button
        className="h-6 text-xs rounded-full py-0 px-3 m-1 shadow-inner focus:outline-none"
        onClick={() => {
          click()
          // hocus("reverse")
        }}
        style={{
          willChange: "background, color, border",
          ...buttonSpring,
          ...hocusStyles,
        }}
        onFocus={() => hocus(true)}
        onBlur={() => hocus(false)}
      >
        <div style={{ position: "relative" }}>
          <span
            style={{
              position: "absolute",
              display: "flex",
              alignItems: "center",
              top: "2px",
            }}
          >
            <animated.svg
              xmlns="http://www.w3.org/2000/svg"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={24}
              strokeDashoffset={checkSpring.offset}
              style={{ willChange: "offset" }}
              // className="feather-check"
            >
              <polyline points="4 12 9 17 20 6" />
            </animated.svg>
          </span>
          <animated.span style={{ willChange: "margin", ...shiftSpring }}>
            {children}
          </animated.span>
        </div>
      </animated.button>
    </>
  )
}

export default FilterChip
