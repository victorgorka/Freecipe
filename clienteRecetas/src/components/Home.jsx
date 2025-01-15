import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";
import LandingPage from "./home/LandingPage";


function Home() {
	return (
	// <Container>
	// 	<Row>
	// 		<Col>
	// 			<SearchContainer />
	// 		</Col>
	// 		<Col>
	// 			<SearchResults />
	// 		</Col>
	// 	</Row>
	// </Container>
	<LandingPage></LandingPage>
  );
}

export default Home;