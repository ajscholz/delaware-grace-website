require("tailwindcss/dist/base.min.css")
require("tailwindcss/dist/components.min.css")
require("tailwindcss/dist/utilities.min.css")
require("typeface-bebas-neue")
require("typeface-montserrat")
require("./src/components/styles.css")

const modalRoot = document.createElement("div")
modalRoot.id = "modal-root"
document.body.appendChild(modalRoot)

// const transitionDelay = 500

// exports.shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   if (location.action === "PUSH") {
//     return false
//   } else {
//     const savedPosition = getSavedScrollPosition(location)
//     window.setTimeout(
//       () => window.scrollTo(...(savedPosition || [0, 0])),
//       transitionDelay
//     )
//   }
//   return false
// }
