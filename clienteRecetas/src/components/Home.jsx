import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Home.css";
import SearchContainer from "./home/SearchContainer";
import SearchResults from "./home/SearchResults";


function Home() {
	return (
	<Container>
		<Row>
			<Col>
				<SearchContainer />
			</Col>
			<Col>
				<SearchResults />
			</Col>
		</Row>
	</Container>
  );
}

export default Home;