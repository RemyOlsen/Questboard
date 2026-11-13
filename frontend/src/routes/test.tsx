import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchQuests } from "../api/quests";
import styled from "styled-components";
import Column from "../styles/layout/Column";
import Row from "../styles/layout/Row";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: quests,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  if (isPending) {
    return <p> Loading Quests...</p>;
  }

  if (isError) {
    console.error("Error fetching quests:", error);
    return <p> Error: {error.message}</p>;
  }

  return (
    <Column gap='2rem' align='center' justify='center'>
      <h1>Test Quests</h1>

      {quests.map((quest) => (
        <QuestCard key={quest.id}>
          <h2>{quest.title}</h2>
          <p>{quest.description}</p>
          <span>+{quest.xpReward} XP</span>
        </QuestCard>
      ))}
    </Column>
  );
}

const QuestCard = styled.article`
  text-align: left;
  width: 32rem;
  background: #242424;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 20px;

  h2 {
    margin-top: 0;
  }

  span {
    color: #a78bfa;
    font-weight: bold;
  }
`;
