/* eslint-disable jsx-a11y/alt-text */
import React, {useState, useEffect} from 'react';
import "./App.css";
import Topbar from "./Topbar";
import ReactPaginate from 'react-paginate';
import {
  Row,
  Container,
  Col,
  Form,
  Button,
} from "react-bootstrap";
const formatter = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 2
});

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [getSearchBar, setSearchBar] = useState("");
  const [getResults, setResults] = useState();
  const [getTotalResults, setTotalResults] = useState();
  const [getPage, setPage] = useState(1);
  const [offset, setOffset] = useState(0);

  const handlePageClick = (e) => {
    setOffset(offset + 1)
};

  useEffect(() => {
    getResults && searchResults(getSearchBar)
  }, [offset])

function handleSubmit(e) {
   e.preventESDefault();
   searchResults(getSearchBar);
  }

async function searchResults(searchTerm) {
  const response = await fetch('https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=' + searchTerm + '&page=' + getPage);
  const json = await response.json();
  setResults(json);
  setTotalResults(json.pagination.totalResults);
  setIsOpen(true);
  return json;
}

function checkPricing(msrp, price) {
  if(msrp > price && msrp !== "") {
    return (
      <>
      <span style={{ textDecoration: 'line-through', color: 'gray' }}>{formatter.format(msrp)}</span>&nbsp;<span style={{ fontWeight: 'bold' }}>{formatter.format(price)}</span>
      </>
    );
  }
    return `Price: ${price}`;    
}

function displayResults() {
    return (
              <div className="search-results-list pt-4">
                {getResults.results.map(result => {
                  return (
                    <div key={result.id} className="search-result">
                      <img src={result.thumbnailImageUrl} thumbnail/>
                      <p>{result.title}</p>
                      <p>{result.msrp && checkPricing(result.msrp,result.price)}</p>
                    </div>
                  );
                })}
              </div>
    );
}

  return (
    <div className="App">
      <Topbar />
      <Container className="pt-3">
        <Form className="pb-4">
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control id="inlineFormInputName" value={getSearchBar} placeholder="Enter product" onChange={(e) => setSearchBar(e.target.value)}/>
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit" onClick={handleSubmit} onKeyPress={(e) => e === 13 ? handleSubmit(e) : ""}>Search</Button>
            </Col>
            <Col xs="auto" className="my-1">
              <Button variant="warning" onClick={() => {
                setSearchBar("");
                setIsOpen(false)
                }}>Clear</Button>
                              <Button variant="danger" onClick={() => {
                setPage(getPage + 1);
                }}>+</Button>
            </Col>
          </Row>
        </Form>
        {isOpen && "Product results: " + getTotalResults}
        <br/>
        {isOpen && <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={getPage}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>}
        <br/>
        {isOpen && displayResults()}
      </Container>
    </div>
  );
}

export default App;
