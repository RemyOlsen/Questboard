import styled from "styled-components";
import { createFileRoute, Link } from "@tanstack/react-router";
import Row from "../styles/layout/Row";
import Column from "../styles/layout/Column";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <Column gap='2rem' align='center' justify='center'>
      <Heading>Questboard</Heading>

      <Row gap='1rem' align='center' justify='center'>
        {/* Buttons are temp and non functional, just for visual purposes atm */}
        <button
          style={{
            backgroundColor: "#282c34",
            color: "#61dafb",
            borderRadius: "8px",
            padding: "12px 20px",
          }}
        >
          Login
        </button>
        {/* Buttons are temp and non functional, just for visual purposes atm */}
        <button
          style={{
            backgroundColor: "#282c34",
            color: "#61dafb",
            borderRadius: "8px",
            padding: "12px 20px",
          }}
        >
          Sign Up
        </button>
      </Row>
      <Column gap='2rem'>
        <Description>
          To make progressing on tasks and projects feel like a game. TO-DO
          list, Kanban, Scrum etc.
          <br />
          It's going to be Customizable so everything can be modified to fit a
          teams preference for progress.
        </Description>
        <StyledLink to='/test'>To Test Page</StyledLink>
      </Column>
    </Column>
  );
}

const Container = styled.main`
  max-width: 800px;
  margin: 100px auto;
  padding: 23px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.5rem;
  line-height: 1.5;
  // color: #e0e0e0;
`;

const StyledLink = styled(Link)`
  display: inline-block;
  padding: 12px 20px;
  background: #282c34;
  color: #61dafb;
  border-radius: 8px;
  text-decoration: none;

  &:hover {
    background: #61dafb;
    color: #282c34;
  }
`;
