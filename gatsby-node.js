const path = require(`path`)
const axios = require("axios")
const { createRemoteFileNode } = require("gatsby-source-filesystem")

// process vimeo thumbnails to be used by Gatsby Image
exports.onCreateNode = async ({
  node,
  actions: { createNode },
  store,
  cache,
  createNodeId,
}) => {
  if (node.internal.type === "ContentfulMessage") {
    /* -- DATA STRUCTURE --
    {
      title: "Psalm 100",
      date: "2020-09-06",
      tags: ["bible"],
      videoUrl: "https://www.youtube.com/watch?v=QEVr7kvVE0w",
      slug: "psalm-100",
      communicator___NODE: "f1317f86-be3d-5260-ba88-48236ef9fc10",
      series___NODE: "fac3c2c1-72cb-5aa2-bc84-6ec7c6cbb330",
      description___NODE: "6bd3fd3e-e693-505f-b306-278cd3be0e40",
      id: "7ba9b781-e93e-5f26-8a54-786133442e6b",
      spaceId: "y708x3mqfzxd",
      contentful_id: "QF9VL9J9g5Eh6phCioJgE",
      createdAt: "2020-09-14T20:08:19.673Z",
      updatedAt: "2020-09-14T20:12:00.747Z",
      parent: "Message",
      children: ["6bd3fd3e-e693-505f-b306-278cd3be0e40"],
      internal: {
        type: "ContentfulMessage",
        contentDigest: "fc4aeabe3e0ff84cb49f45b341ccd3e4",
        counter: 39,
        owner: "gatsby-source-contentful",
      },
      sys: { revision: 2, contentType: { sys: [Object] } },
      node_locale: "en-US",
    }
    */
    const year = new Date(node.date).getFullYear()
    node.year = year

    let url

    if (node.videoUrl.includes("vimeo")) {
      const result = await axios.get(
        `https://vimeo.com/api/oembed.json?url=${node.videoUrl}&width=1920&height=1080`
      )

      if (result.errors) {
        reporter.panicOnBuild(`Error getting video thumbnail`)
        return
      }
      url = result.data.thumbnail_url
    } else {
      url = `https://img.youtube.com/vi/${node.videoUrl.match(
        /(?<=watch\?v=)\w+(?=\W)?/
      )}/hq3.jpg`
    }

    let fileNode = await createRemoteFileNode({
      url: url, // string that points to the URL of the image
      parentNodeId: node.id, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      cache, // Gatsby's cache
      store, // Gatsby's redux store
    })
    // if the file was created, attach the new node to the parent node
    if (fileNode) {
      node.thumbnail___NODE = fileNode.id
    }
  }
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for nodes to use in creating pages.
  const result = await graphql(`
    {
      series: allContentfulMessageSeries {
        all: nodes {
          slug
        }
      }
      messages: allContentfulMessage {
        all: nodes {
          slug
          series {
            title
            slug
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(
      `Error while getting Contentful Message Series from graphql.`
    )
    return
  }

  // Create pages for each message series.
  const seriesTemplate = path.resolve(`src/templates/seriesTemplate.jsx`)

  result.data.series.all.forEach(node => {
    const path = `/messages/series/${node.slug}`
    createPage({
      path,
      component: seriesTemplate,
      context: {
        slug: node.slug,
      },
    })
  })

  // Create pages for each message.
  const messageTemplate = path.resolve(`src/templates/messageTemplate.jsx`)

  result.data.messages.all.forEach(node => {
    try {
      const path = `/messages/series/${node.series.slug}/${node.slug}`
      createPage({
        path,
        component: messageTemplate,
        context: {
          slug: node.slug,
          seriesTitle: node.series.title,
        },
      })
    } catch (err) {
      console.log(`Could not create page for ${node.title}.`, err)
    }
  })
}

// // Replacing '/' would result in empty string which is invalid
// const replacePath = path => (path === `/` ? path : path.replace(/\/$/, ``))
// // Implement the Gatsby API “onCreatePage”. This is
// // called after every page is created.

// exports.onCreatePage = ({ page, actions }) => {
//   const { createPage, deletePage } = actions
//   const oldPage = Object.assign({}, page)
//   // Remove trailing slash unless page is /
//   page.path = replacePath(page.path)
//   if (page.path !== oldPage.path) {
//     // Replace new page with old page
//     deletePage(oldPage)
//     createPage(page)
//   }
// }

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

// Define graphql types
exports.createSchemaCustomization = ({ actions, schema }) => {
  const { createTypes } = actions

  const customFields = {
    // create a "year" field to make filtering by year easier
    year: {
      type: "String!",
      resolve: source =>
        new Date(
          source.internal.type === "ContentfulMessage"
            ? source.date
            : source.startingDate
        ).getFullYear(),
    },
    // make all tags lowercase by default
    tags: {
      type: "[String!]",
      resolve: source => source.tags.map(tag => tag.toLowerCase()),
    },
  }
  const typeDefs = [
    // `type ContentfulMessage implements Node {
    //   year: String
    // }
    // `,
    // `type ContentfulResourceVideo implements Node {
    //   contentful_id: String
    //   title: String
    //   url: String
    //   slug: String
    //   tags: [String]
    //   videoUserGuide: ContentfulAsset
    //   description: contentfulResourceVideoDescriptionTextNode
    // }`,
    // `type ContentfulAsset implements Node {
    //   file: ContentfulAssetFile
    // }`,
    // `type ContentfulAssetFile {
    //   url: String
    //   fileName: String
    // }`,
    // `type contentfulResourceVideoDescriptionTextNode implements Node {
    //   childMdx: Mdx
    // }`,
    // `type Mdx implements Node {
    //   body: String!
    // }`,
    // `type ContentfulMessage implements Node {
    //   messageSeries: ContentfulMessageSeries
    // }`,

    // schema.buildObjectType({
    //   name: "ContentfulStreamingVideo",
    //   fields: {
    //     videoId: {
    //       type: "String!",
    //       resolve: source => source.videoId || "503812663636183",
    //     },
    //     dateTime: {
    //       type: "Date!",
    //       resolve: source => source.dateTime || new Date(2000, 0, 1),
    //     },
    //     length: {
    //       type: "Int!",
    //       resolve: source => source.length || 1,
    //     },
    //     videoUrl: {
    //       type: "String!",
    //       resolve: source =>
    //         // `https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2Fpathwaymarietta%2Fvideos%2F${source.videoId}%2F&width=auto`,
    //         `https://vimeo.com/${source.videoId}`,
    //     },
    //   },
    //   interfaces: ["Node"],
    // }),
    schema.buildObjectType({
      name: "ContentfulMessage",
      fields: customFields,
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "ContentfulMessageSeries",
      fields: {
        ...customFields,
        // create a "month" field to make filtering by month easier
        month: {
          type: "[String!]",
          resolve: source => {
            const startMonth = new Date(source.startingDate).getMonth()
            const endMonth = new Date(source.endingDate).getMonth()

            let seriesMonths = []
            for (let i = startMonth; i <= endMonth; i++) {
              seriesMonths.push(months[i])
            }

            return seriesMonths
          },
        },
      },
      interfaces: ["Node"],
    }),
    schema.buildObjectType({
      name: "ContentfulTeamMember",
      fields: {
        email: {
          type: "String!",
          resolve: source => source.email || "",
        },
      },
      interfaces: ["Node"],
    }),
  ]
  createTypes(typeDefs)
}
