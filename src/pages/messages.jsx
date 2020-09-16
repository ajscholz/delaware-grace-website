import React, { useState } from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// import PageBanner from "../components/PageBanner"
import MessageCard from "../components/cards/MessageCard"
import Container from "../components/Container"
import InfoChip from "../components/InfoChip"
import tw from "twin.macro"
// import Filter from "../components/Filter"
import FilteredList from "../components/filter/FilteredList"
import { VscTriangleDown } from "react-icons/vsc"
import { useSpring, animated } from "react-spring"
import Button from "../components/Button"
import Filter from "../components/filter/Filter"

const MessagesPage = ({ data }) => {
  const {
    page,
    messages: { all: messages },
    ...rest
  } = data

  // const testData = {
  //   communicator: {
  //     unselected: ["Dave Pacheco", "Jeff Martin"],
  //   },
  //   topics: {
  //     unselected: ["bible", "church", "humility", "life", "relationships"],
  //   },
  //   year: {
  //     unselected: ["2020", "2019"],
  //   },
  // }

  const queryData = { ...rest }
  const latestMessage = [...messages].shift()
  const restOfMessages = [...messages].splice(1)

  // Object.keys(testData).forEach(key => (testData[key].selected = []))
  // const initialState = { ...testData }
  Object.keys(queryData).forEach(key => (queryData[key].selected = []))
  const initialState = { ...queryData }

  // console.log(queryData)
  const [showFilters, setShowFilters] = useState(false)
  const [filter, setFilter] = useState(initialState)

  const update = (filterType, newState) => {
    setFilter({
      ...filter,
      [filterType]: newState,
    })
  }

  const flip = useSpring({
    transform: showFilters ? "rotate(180deg)" : "rotate(0deg)",
  })

  const open = useSpring({
    height: showFilters ? "256px" : "0px",
    opacity: showFilters ? 1 : 0,
  })

  const AnimatedIcon = animated(VscTriangleDown)

  console.log(messages)
  console.log(initialState)

  return (
    <>
      <SEO
        title="Messages"
        // description="Plan a visit today to Delaware Grace. We would love to meet you."
      />
      {/* <PageBanner banner={page.banner} /> */}
      <Container className="pt-12">
        <div className="w-full grid grid-cols-2">
          <Title tw="text-black text-6xl">Messages</Title>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            tw="flex items-center my-auto mr-0 ml-auto py-2 px-8 bg-dgBlue-500 border-dgBlue-500 text-blue-100 rounded-full active:outline-none focus:outline-none shadow-sm"
          >
            <span tw="mr-2">
              <AnimatedIcon style={flip} />
            </span>
            {/* {`${showFilters ? `Show` : `Hide`} Filters`} */}
            Filter Messages
          </Button>
          <animated.div
            tw="h-64 col-span-2 overflow-hidden border-t-2 border-gray-300 pt-6"
            style={open}
          >
            {/* {Object.keys(filter).some(key => filter[key].selected.length !== 0) && (
          <FilterClearButton click={clearFilters}>Clear All</FilterClearButton>
        )} */}
            <div tw="grid grid-cols-3 grid-rows-none gap-x-4">
              {Object.keys(queryData).map(item => (
                <Filter
                  data={filter[item]}
                  filterType={item}
                  update={update}
                  key={item}
                />
              ))}
            </div>

            {/* <div tw="flex mt-6">
          <button
            tw="mx-auto text-sm bg-dgRed-200 text-dgRed-100 py-1 px-6"
            onClick={() => clearFilters()}
          >
            Clear All
          </button>
        </div> */}
          </animated.div>
          {/* <Filter /> */}
        </div>
        <FilteredList filters={filter} cardData={messages} />

        {/* <MessageCard large message={latestMessage} overlay fadeUp>
          <div>
            <InfoChip>Latest Message</InfoChip>
            <Title>{latestMessage.title}</Title>
          </div>

          <h6 className="text-gray-200 mr-1 flex items-end mb-3 text-2xl">
            {latestMessage.date} | {latestMessage.communicator.name}
          </h6>
        </MessageCard>
        <div className="grid grid-cols-3 gap-5">
          {restOfMessages.map(message => (
            <MessageCard key={message.id} message={message} />
          ))}
        </div> */}
      </Container>
    </>
  )
}

export default MessagesPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Messages" }) {
      ...PageBannerFragment
    }
    messages: allContentfulMessage(sort: { fields: date, order: DESC }) {
      all: nodes {
        ...MessageCardFragment
        year: date(formatString: "YYYY")
      }
    }
    communicator: allContentfulMessage {
      unselected: distinct(field: communicator___name)
    }
    topics: allContentfulMessage {
      unselected: distinct(field: tags)
    }
    year: allContentfulMessage {
      unselected: distinct(field: year)
    }
  }
`

const Title = tw.h1`text-white text-5xl ml-1`
