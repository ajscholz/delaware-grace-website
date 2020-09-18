import React, { useState, useMemo } from "react"
import SEO from "../components/SEO"
import { graphql } from "gatsby"
// import PageBanner from "../components/PageBanner"
// import MessageCard from "../components/cards/MessageCard"
import Container from "../components/Container"
import tw from "twin.macro"
import FilteredList from "../components/filter/FilteredList"
import FilterController from "../components/filter/FilterController"

const MessagesPage = ({ data }) => {
  const {
    page,
    messages: { messages },
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
  // const latestMessage = [...messages].shift()
  // const restOfMessages = [...messages].splice(1)

  // Object.keys(testData).forEach(key => (testData[key].selected = []))
  // const initialState = { ...testData }
  Object.keys(queryData).forEach(key => (queryData[key].selected = []))
  const initialState = { ...queryData }

  const [filter, setFilter] = useState(initialState)

  const categories = Object.keys(filter)

  // filter only that cards that meet all the selected filters
  const cards = useMemo(
    () =>
      messages.filter((card, i) => {
        // test each card with all the criteria
        // !categories.some is because .some returns as soon as it's truthy
        // so the card has to pass all the tests with FALSE instead of TRUE
        // That way as soon as it's truthy it exits the and excludes the card
        const includeCard = !categories.some(category => {
          // if there is not a filter applied stop checking this category
          if (filter[category].selected.length === 0) {
            return false
            // if there is a filter and it's an array, not a string
          } else if (typeof card[category] === "string") {
            // return whether the filter includes the card data
            return filter[category].selected.includes(card[category])
              ? false
              : true
          }

          // this is because communicator has a name field underneath it
          if (category === "communicator")
            return filter[category].selected.includes(card[category].name)
              ? false
              : true

          // if there is a filter and it's not a string (it's an array)
          // return whether the
          return !filter[category].selected.some(item =>
            card[category].includes(item)
          )
        })

        return includeCard
      }),
    [categories, messages, filter]
  )

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

          <FilterController
            setFilter={setFilter}
            queryData={queryData}
            filter={filter}
          />
          {/* <Filter /> */}
        </div>
        <FilteredList filteredCards={cards} />

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
      messages: nodes {
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
