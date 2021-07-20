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
  const [getResults, setResults] = useState(null);
  const [getResultsList, setResultsList] = useState();
   
  function handleSubmit(e) {
    e.preventDefault();
    searchResults(getSearchBar);
  }

async function searchResults(searchTerm) {
  const response = await fetch('https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=' + searchTerm);
  const json = await response.json();
  setResults(json);
  setResultsList(json.pagination);
  setIsOpen(true);
  return json;
}

function displayResults() {
  return <Badge bg="secondary">{getResultsList.totalResults}</Badge>
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
        {isOpen && "Product results: " + <displayResults />}
      </Container>
    </div>
  );
}

export default App;
