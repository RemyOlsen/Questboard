import { createFileRoute, Link } from "@tanstack/react-router";
import styled from "styled-components";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <Container>
      <Heading>QuestBoard</Heading>
      <Description>
        To make progressing on tasks and projects feel like a game. TO-DO list,
        Kanban, Scrum etc. Want it to be Customizable so everything can be
        modified to fit a teams preference for progress.
      </Description>

      <StyledLink to='/test'>To Test Page</StyledLink>
    </Container>
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
  color: #e0e0e0;
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
