import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
// import tw from "twin.macro"

// const H1 = tw.h1`
//   text-6xl text-dgBlue font-display
// `

// const P = tw.p`font-body text-gray-700`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hi from home page</h1>
  </Layout>
)

export default IndexPage
