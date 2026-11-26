import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteQuest, fetchQuests } from "../api/quests";
import styled from "styled-components";
import Column from "../styles/layout/Column";
import Row from "../styles/layout/Row";
import { QuestForm } from "../components/QuestForm";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

function RouteComponent() {
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const {
    data: quests,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["quests"],
    queryFn: fetchQuests,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteQuest,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["quests"],
      });
    },
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
      <QuestForm />
      <h1>Test Quests</h1>
      {quests.map((quest) => (
        <QuestCard key={quest.id}>
          <Row>
            <h2>{quest.title}</h2>
            <h3>{quest.id}</h3>
          </Row>
          <p>{quest.description}</p>
          <Row>
            <span>+{quest.xpReward} XP</span>
            {confirmId === quest.id ? (
              <>
                <button
                  onClick={() => {
                    mutation.mutate(quest.id);
                    setConfirmId(null);
                  }}
                  disabled={mutation.isPending}
                >
                  Yes
                </button>
                <button
                  onClick={() => setConfirmId(null)}
                  disabled={mutation.isPending}
                >
                  No
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setConfirmId(quest.id)}
                  disabled={mutation.isPending}
                >
                  {mutation.isPending && mutation.variables === quest.id
                    ? "Deleting..."
                    : "Delete"}
                </button>
              </>
            )}
          </Row>
          <ErrorMessage role='alert'>
            {mutation.isError && mutation.variables === quest.id
              ? mutation.error.message
              : ""}
          </ErrorMessage>
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
    margin-right: auto;
  }

  h3 {
    margin-top: 0;
  }

  span {
    color: #a78bfa;
    font-weight: bold;
    margin-right: auto;
  }
`;

const ErrorMessage = styled.div`
  min-height: 1.25rem;
  font-size: 0.875rem;
  color: #f87171;
`;
