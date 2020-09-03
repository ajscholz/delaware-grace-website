export default (imgDimensions, focalPoint) => {
  const xPerc = Math.round((focalPoint.x / imgDimensions.width) * 100)
  const yPerc = Math.round((focalPoint.y / imgDimensions.height) * 100)

  return `${xPerc}% ${yPerc}%`
}
