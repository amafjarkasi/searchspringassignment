/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import './App.css'
import Topbar from './Topbar'
import { Row, Container, Col, Form, Button } from 'react-bootstrap'

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

  // have issue with undefined when changed not available
  const handlePageClick = (e, changed) => {
    e.preventDefault()
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
  function handleSubmit(e) {
    e.preventDefault()
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
    setTotalResults(json.pagination.totalResults)
    setIsOpen(true)
    return json
  }

  // compare pricing msrp vs sale price, display msrp if sale price is not available
  function checkPricing(msrp, price) {
    if (msrp > price && msrp !== '') {
      return (
        <>
          <span style={{ textDecoration: 'line-through', color: 'gray' }}>
            {formatter.format(msrp)}
          </span>
          &nbsp;
          <span style={{ fontWeight: 'bold' }}>{formatter.format(price)}</span>
        </>
      )
    }
    return `Price: ${price}`
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
                  <p>{result.title}</p>
                  <p>
                    {result.msrp && checkPricing(result.msrp, result.price)}
                  </p>
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
                onClick={handleSubmit}
                onKeyPress={(e) => (e === 13 ? handleSubmit(e) : '')}
              >
                Search
              </Button>
            </Col>
            <Col xs="auto" className="my-1">
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
        <br />

        {getResults !== undefined && getResults !== '' && (
          <>
            <Button
              variant="secondary"
              value="decrease"
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

        {isOpen && displayResults()}
        <br />
        <p>
          {isOpen &&
            'Page: ' + getPage + ' / ' + getPagination.results.totalPages}
        </p>
        {getResults !== undefined && getResults !== '' && (
          <>
            <Button
              variant="secondary"
              value="decrease"
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
        <br />
      </Container>
    </div>
  )
}

export default App
