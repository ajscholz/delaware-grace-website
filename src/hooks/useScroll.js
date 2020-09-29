import { useState, useEffect } from "react"

const useScroll = () => {
  const [position, setPosition] = useState(0)

  useEffect(() => {
    let timer = null
    window.addEventListener("scroll", e => {
      if (timer !== null) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        setPosition(window.scrollY)
      }, 100)
    })
    return () => clearTimeout(timer)
  }, [])

  return position
}

export default useScroll
