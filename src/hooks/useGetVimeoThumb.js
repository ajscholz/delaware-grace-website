import { useLayoutEffect } from "react"

export default (url, update) => {
  useLayoutEffect(() => {
    fetch(`https://vimeo.com/api/oembed.json?url=${url}`)
      .then(response => response.json())
      .then(
        data => {
          const strs = data.thumbnail_url.split("_")
          update(strs[0].concat(".webp"))
        },
        [url]
      )
    return () =>
      fetch(`https://vimeo.com/api/oembed.json?url=${url}`)
        .then(response => response.json())
        .then(
          data => {
            const strs = data.thumbnail_url.split("_")
            update(strs[0].concat(".webp"))
          },
          [url]
        )
  })
}
