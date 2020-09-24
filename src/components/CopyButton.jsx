import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { HiOutlineLink } from "react-icons/hi"
import "twin.macro"
import AlertChip from "./AlertChip"

const shareButtonStyles = "w-1/5 flex flex-col items-center"

const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState({ show: false, copied: false })

  useEffect(() => {
    const timeout = setTimeout(() => {
      setCopied({ show: false, copied: copied.copied === true ? true : false })
    }, 2000)
    return () => clearTimeout(timeout)
  }, [copied])

  return (
    <>
      <button
        className={shareButtonStyles}
        aria-label="copy link"
        onClick={() =>
          navigator.clipboard.writeText(text).then(
            () => {
              setCopied({ show: true, copied: true })
            },
            () => {
              setCopied({ show: true, copied: false })
            }
          )
        }
      >
        <div
          tw="rounded-full bg-dgRed-600 flex justify-center items-center p-2"
          style={{ width: "42px", height: "42px" }}
        >
          <HiOutlineLink tw="w-full h-full m-px text-white m-px" />
        </div>
        <span tw="text-xs leading-none text-gray-600 font-semibold mt-2">
          Copy
        </span>
      </button>
      <AlertChip
        show={copied.show}
        copied={copied.copied}
        setCopied={setCopied}
      >
        {copied.copied !== false ? "Link copied" : "Please try again"}
      </AlertChip>
    </>
  )
}

CopyButton.propTypes = {
  text: PropTypes.string.isRequired,
}
export default CopyButton
