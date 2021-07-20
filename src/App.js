import React, {useState} from 'react';
import {
  Row,
  Container,
  Col,
  Form,
  Button,
} from "react-bootstrap";
import "./App.css";
import Topbar from "./Topbar";


function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [getSearchBar, setSearchBar] = useState("");
  const [getResults, setResults] = useState(false);
   
  function handleSubmit(e) {
    e.preventDefault();
    console.log(searchResults(getSearchBar));
  }

async function searchResults(searchTerm) {
  const response = await fetch('https://scmq7n.a.searchspring.io/api/search/search.json?siteId=scmq7n&resultsFormat=native&q=' + searchTerm);
  const json = await response.json();
  setResults(json);
  setIsOpen(true);
  return json;
}

  return (
    <div className="App">
      <Topbar />
      <Container className="pt-3">
        <Form>
          <Row className="align-items-center">
            <Col sm={3} className="my-1">
              <Form.Control id="inlineFormInputName" value={getSearchBar} placeholder="Enter product" onChange={(e) => setSearchBar(e.target.value)}/>
            </Col>
            <Col xs="auto" className="my-1">
              <Button type="submit" onClick={handleSubmit} onKeyPress={(e) => e === 13 ? handleSubmit(e) : ""}>Search</Button>
            </Col>
          </Row>
        </Form>
        {isOpen && getResults.pagination.totalResults}
      </Container>
    </div>
  );
}

export default App;
