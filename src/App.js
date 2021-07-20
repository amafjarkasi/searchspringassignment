/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react';
import {
  Row,
  Container,
  Col,
  Form,
  Button,
  Badge
} from "react-bootstrap";
import "./App.css";
import Topbar from "./Topbar";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [getSearchBar, setSearchBar] = useState("");
  const [getResults, setResults] = useState();
  const [getTotalResults, setTotalResults] = useState();
   
  function handleSubmit(e) {
    e.preventDefault();
    searchResults(getSearchBar);
  }

async function searchResults(searchTerm) {
  const response = await fetch('https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=' + searchTerm);
  const json = await response.json();
  setResults(json);
  setTotalResults(json.pagination.totalResults);
  setIsOpen(true);
  return json;
}

function displayResults() {
    return (
              <div className="search-results-list pt-4">
                {getResults.results.map(result => {
                  console.log(result.id);
                  return (
                    <div key={result.id} className="search-result">
                      <img src={result.thumbnailImageUrl} thumbnail/>
                      <p>{result.title}</p>
                      <p>{result.price}</p>
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
            </Col>
          </Row>
        </Form>
        {isOpen && "Product results: " + getTotalResults}
        <br/>
        {isOpen && displayResults()}
      </Container>
    </div>
  );
}

export default App;
