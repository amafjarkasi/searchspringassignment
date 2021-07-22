/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import { Row, Container, Col, Form, Button } from 'react-bootstrap'
import ScrollToTop from 'react-scroll-to-top'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
})

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [getSearchBar, setSearchBar] = useState('')
  const [getResults, setResults] = useState()
  const [getTotalResults, setTotalResults] = useState()
  const [getPage, setPage] = useState(1)
  const [offset, setOffset] = useState(0)
  const [getPagination, setPagination] = useState()

  useEffect(() => {
    getResults && searchResults(getSearchBar)
  }, [offset])

  // handle increments in changes in pagination
  const handlePageClick = (event, changed) => {
    event.preventDefault()
    if (changed === 'increase' && getPage < getPagination.results.totalPages) {
      setPage(getPage + 1)
      setOffset(offset + 1)
    } else if (changed === 'decrease') {
      if (getPage > 1) {
        setPage(getPage - 1)
        setOffset(offset - 1)
      } else {
        setPage(1)
        setOffset(0)
      }
    }
  }

  // handle submit from buttons
  function handleSubmit(event) {
    event.preventDefault()
    setOffset(0)
    setPage(1)
    searchResults(getSearchBar)
  }

  // api search function for products
  async function searchResults(searchTerm) {
    const response = await fetch(
      'https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=' +
        searchTerm +
        '&page=' +
        getPage,
    )
    const json = await response.json()
    setResults(json)
    setPagination({ results: json.pagination })
    setTotalResults(getPagination.results.totalResults)
    setIsOpen(true)
    return json
  }

  // compare pricing msrp vs sale price, display msrp if sale price is not available
  function checkPricing(msrp, price, salePrice) {
    if (isNaN(salePrice) && isNaN(msrp) && isNaN(price)) {
      return <span style={{ fontWeight: 'bold' }}>Sold Out</span>
    } else if (isNaN(msrp) && isNaN(price) && salePrice !== "") {
      return (
        <span style={{ fontWeight: 'bold' }}>
          {formatter.format(salePrice)}
        </span>
      )
    } else if (msrp > price) {
      return (
        <>
          <span style={{ textDecoration: 'line-through', color: 'gray' }}>
            {formatter.format(msrp)}
          </span>
          &nbsp;
          <span style={{ fontWeight: 'bold' }}>{formatter.format(price)}</span>
        </>
      )
    } else {
      return (
        <span style={{ fontWeight: 'bold' }}>{formatter.format(price)}</span>
      )
    }
  }

  // clear search results
  const clearResults = () => {
    setPage(1)
    setOffset(0)
    setSearchBar('')
    setResults('')
    setTotalResults('')
    setIsOpen(false)
    setPagination('')
  }

  // display results title and pricing, then send msrp and price to checkPricing
  function displayResults() {
    return (
      <div className="search-results-list pt-4">
        <Row>
          {getResults.results.map((result) => {
            return (
              <Col key={result.id} md={4}>
                <div className="search-result">
                  <img src={result.thumbnailImageUrl} thumbnail="true" />
                  <p className="pt-3 pb-4">
                    {result.title}
                    <br />
                    {checkPricing(
                      parseInt(result.msrp),
                      parseInt(result.price),
                      parseInt(result.sale_price),
                    )}
                  </p>
                  <p></p>
                </div>
              </Col>
            )
          })}
        </Row>
      </div>
    )
  }

  return (
    <div className="App">
      <ScrollToTop smooth color="#3a23ad" />
      <Topbar />
      <Container className="pt-3 pb-3">
        <Form className="pb-4">
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control
                id="inlineFormInputName"
                value={getSearchBar}
                placeholder="Enter product"
                onChange={(e) => setSearchBar(e.target.value)}
              />
            </Col>
            <Col xs="auto" className="my-1">
              <Button
                type="submit"
                variant="secondary"
                onClick={handleSubmit}
                onKeyPress={(e) => (e === 13 ? handleSubmit(e) : '')}
              >
                Search
              </Button>
            </Col>
            <Col xs="auto" className="">
              <Button variant="warning" onClick={clearResults}>
                Clear
              </Button>
            </Col>
          </Row>
        </Form>
        <p>{isOpen && 'Product results: ' + getTotalResults}</p>
        <p>
          {isOpen &&
            'Page: ' + getPage + ' / ' + getPagination.results.totalPages}
        </p>
        {getResults !== undefined && getResults !== '' && (
          <>
            <Button
              variant="primary"
              value="decrease"
              style={{ marginRight: '6px' }}
              onClick={(e) => handlePageClick(e, 'decrease')}
            >
              <i className="bi bi-caret-left-fill" />
            </Button>
            <Button
              variant="danger"
              value="increase"
              onClick={(e) => handlePageClick(e, 'increase')}
            >
              <i className="bi bi-caret-right-fill" />
            </Button>
          </>
        )}
        <div className="pb-4" />
        {isOpen && displayResults()}
        <br />
        <p>
          {isOpen &&
            'Page: ' + getPage + ' / ' + getPagination.results.totalPages}
        </p>
        {getResults !== undefined && getResults !== '' && (
          <div className="pb-2">
            <Button
              variant="primary"
              value="decrease"
              style={{ marginRight: '6px' }}
              onClick={(e) => handlePageClick(e, 'decrease')}
            >
              <i className="bi bi-caret-left-fill" />
            </Button>
            <Button
              variant="danger"
              value="increase"
              onClick={(e) => handlePageClick(e, 'increase')}
            >
              <i className="bi bi-caret-right-fill" />
            </Button>
          </div>
        )}
        <br />
      </Container>
    </div>
  )
}

export default App
