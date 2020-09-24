import React from "react"
import PropTypes from "prop-types"
import tw from "twin.macro"
import { useTransition, animated, config } from "react-spring"

const AlertChip = ({ show, copied, setCopied, children }) => {
  const chipTransition = useTransition(show, null, {
    from: { zIndex: -10, bottom: "50%" },
    enter: { bottom: "100%" },
    leave: { bottom: "50%" },
    onDestroyed: () => {
      if (show === false) setCopied({ show: false, copied: false })
    },
    config: { ...config.wobbly, clamp: true },
  })

  return chipTransition.map(
    ({ item, props, key }) =>
      item && (
        <animated.div
          key={key}
          role="alert"
          css={[
            tw`absolute rounded-t-md text-xs w-auto py-2 w-4/5 flex justify-center shadow-lg`,
            tw`focus:(outline-none) active:outline-none`,
            copied !== false
              ? tw`bg-dgGreen-500 text-dgGreen-100`
              : `bg-dgRed-500 text-dgRed-100`,
          ]}
          style={{
            left: "50%",
            bottom: "100%",
            transform: "translateX(-50%)",
            ...props,
          }}
        >
          {children}
        </animated.div>
      )
  )
}

AlertChip.propTypes = {
  copied: PropTypes.oneOf([true, false, null]).isRequired,
  show: PropTypes.bool.isRequired,
}

export default AlertChip
