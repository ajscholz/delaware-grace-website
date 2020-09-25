import React, { useState, useMemo } from "react"
import { graphql } from "gatsby"
import tw from "twin.macro"

import SEO from "../../components/SEO"
import Container from "../../components/Container"
import FilteredList from "../../components/filter/FilteredList"
import FilterController from "../../components/filter/FilterController"

const SeriesPage = ({ data }) => {
  const { page, series, topics, year } = data

  const queryData = {
    topics: topics,
    year: year,
    month: {
      unselected: [
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
      ],
      selected: [],
    },
  }

  Object.keys(queryData).forEach(key => (queryData[key].selected = []))
  const initialState = { ...queryData }

  const [filter, setFilter] = useState(initialState)
  const [showFilters, setShowFilters] = useState(false)

  const categories = Object.keys(filter)

  // filter only that cards that meet all the selected filters
  const cards = useMemo(() => {
    console.log("filter", filter)
    console.log("categories", categories)
    return series.all.filter(card => {
      console.log("current card: ", card)
      // test each card with all the criteria
      // !categories.some is because .some returns as soon as it's truthy
      // so the card has to pass all the tests with FALSE instead of TRUE
      // That way as soon as it's truthy it exits the and excludes the card
      const includeCard = !categories.some(category => {
        console.log("current category: ", category)
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
    })
  }, [categories, series.all, filter])

  console.log(cards)

  return (
    <>
      <SEO
        title={page.title}
        description="All the Sunday messages from Delaware Grace Church. Filter by topic, communicator, or date to find a message to help you today."
        image={page.banner.image.file.url}
      />
      {/* <PageBanner banner={page.banner} /> */}
      <Container className="py-10">
        <div className="w-full grid grid-cols-1 md:grid-cols-2">
          <Title tw="text-black text-5xl md:text-6xl">Message Series</Title>

          <FilterController
            setFilter={setFilter}
            queryData={queryData}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
            filter={filter}
          >
            Filter Series
          </FilterController>
          {/* <Filter /> */}
        </div>
        <FilteredList
          showFilters={showFilters}
          filteredCards={cards}
          kind="series"
        />
      </Container>
    </>
  )
}

export default SeriesPage

export const data = graphql`
  {
    page: contentfulPage(title: { eq: "Message Archive" }) {
      ...SeoFragment
    }
    series: allContentfulMessageSeries(
      sort: { fields: startingDate, order: DESC }
    ) {
      all: nodes {
        ...SeriesCardFragment
      }
    }
    topics: allContentfulMessageSeries {
      unselected: distinct(field: tags)
    }
    year: allContentfulMessageSeries {
      unselected: distinct(field: year)
    }
  }
`

const Title = tw.h1`text-white text-5xl ml-1`
