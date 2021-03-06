import React from "react"
import { BLOCKS, MARKS, INLINES } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import "twin.macro"
import Link from "./Link"
import ButtonLink from "./ButtonLink"

const Bold = ({ children }) => <span tw="font-bold">{children}</span>
const Italic = ({ children }) => <span tw="italic">{children}</span>
const Underline = ({ children }) => <span tw="underline">{children}</span>
const Text = ({ children, ...props }) => (
  <p tw="not-first-of-type:mt-3" {...props}>
    {children}
  </p>
)
const H1 = ({ children, ...props }) => <h1 {...props}>{children}</h1>
const H2 = ({ children, ...props }) => <h2 {...props}>{children}</h2>
const H3 = ({ children, ...props }) => <h3 {...props}>{children}</h3>
const H4 = ({ children, ...props }) => <h4 {...props}>{children}</h4>
const H5 = ({ children, ...props }) => <h5 {...props}>{children}</h5>
const H6 = ({ children, ...props }) => <h6 {...props}>{children}</h6>
const Hyperlink = ({ children, ...props }) => (
  <Link tw="text-dgBlue-600" {...props}>
    {children}
  </Link>
)
const Button = ({ children, ...props }) => (
  <ButtonLink tw="mt-4" {...props}>
    {children}
  </ButtonLink>
)

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <Bold>{text}</Bold>,
    [MARKS.ITALIC]: text => <Italic>{text}</Italic>,
    [MARKS.UNDERLINE]: text => <Underline>{text}</Underline>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children, ...props) => (
      <Text {...props}>{children}</Text>
    ),
    [BLOCKS.HEADING_1]: (node, children, ...props) => (
      <H1 {...props}>{children}</H1>
    ),
    [BLOCKS.HEADING_2]: (node, children, ...props) => (
      <H2 {...props}>{children}</H2>
    ),
    [BLOCKS.HEADING_3]: (node, children, ...props) => (
      <H3 {...props}>{children}</H3>
    ),
    [BLOCKS.HEADING_4]: (node, children, ...props) => (
      <H4 {...props}>{children}</H4>
    ),
    [BLOCKS.HEADING_5]: (node, children, ...props) => (
      <H5 {...props}>{children}</H5>
    ),
    [BLOCKS.HEADING_6]: (node, children, ...props) => (
      <H6 {...props}>{children}</H6>
    ),
    [BLOCKS.EMBEDDED_ENTRY]: (node, children, ...props) => {
      const type = node.data.target.sys.contentType.sys.contentful_id
      if (type === "actionButton") {
        const fields = node.data.target.fields
        return (
          <Button primary to={fields.link["en-US"]} {...props}>
            {fields.text["en-US"]}
          </Button>
        )
      } else {
        return null
      }
    },
    [INLINES.HYPERLINK]: (node, children, ...props) => (
      <Hyperlink to={node.data.uri} {...props}>
        {children}
      </Hyperlink>
    ),
  },
}

const RichText = ({ children, ...rest }) =>
  documentToReactComponents(children, options)

export default RichText
