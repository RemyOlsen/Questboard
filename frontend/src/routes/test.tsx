import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteQuest, fetchQuests, updateQuest } from "../api/quests";
import styled from "styled-components";
import Column from "../styles/layout/Column";
import Row from "../styles/layout/Row";
import { QuestForm } from "../components/QuestForm";
import type { UpdateQuestRequest } from "../types/quest";
import type { SubmitEvent } from "react";

export const Route = createFileRoute("/test")({
  component: RouteComponent,
});

interface UpdateQuestVariables {
  id: number;
  quest: UpdateQuestRequest;
}

function RouteComponent() {
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [titleEdit, setTitleEdit] = useState<string>("");
  const [descriptionEdit, setDescriptionEdit] = useState<string>("");
  const [xpRewardEdit, setXpRewardEdit] = useState<number>(0);

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

  const mutationEdit = useMutation({
    mutationFn: ({ id, quest }: UpdateQuestVariables) => updateQuest(id, quest),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["quests"],
      });

      setEditingId(null);
    },
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (editingId === null) return;

    mutationEdit.mutate({
      id: editingId,
      quest: {
        title: titleEdit,
        description: descriptionEdit,
        xpReward: xpRewardEdit,
      },
    });
  }

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
          <form onSubmit={handleSubmit}>
            <Row justify='space-between'>
              <Column gap='0'>
                {editingId === quest.id ? (
                  <>
                    <label>
                      Title
                      <br />
                      <input
                        type='text'
                        value={titleEdit}
                        onChange={(event) => setTitleEdit(event.target.value)}
                        placeholder={quest.title}
                        required
                      />
                    </label>
                    <label>
                      Description
                      <br />
                      <textarea
                        value={descriptionEdit}
                        onChange={(event) =>
                          setDescriptionEdit(event.target.value)
                        }
                        placeholder={quest.description}
                      />
                    </label>
                    <label>
                      XP:
                      <br />
                      <input
                        type='number'
                        value={xpRewardEdit}
                        onChange={(event) =>
                          setXpRewardEdit(Number(event.target.value))
                        }
                        placeholder={quest.xpReward.toString()}
                        min={1}
                        required
                      />
                    </label>
                  </>
                ) : (
                  <>
                    <h2>{quest.title}</h2>
                    <p>{quest.description}</p>
                    <span>+{quest.xpReward} XP</span>
                  </>
                )}
              </Column>
              <Column align='end' justify='end'>
                <h3>#{quest.id}</h3>
                <Row>
                  {confirmId === quest.id ? (
                    <>
                      <button
                        type='button'
                        onClick={() => {
                          mutation.mutate(quest.id);
                          setConfirmId(null);
                        }}
                        disabled={
                          mutation.isPending ||
                          mutationEdit.isPending ||
                          editingId !== null
                        }
                      >
                        Yes
                      </button>
                      <button
                        type='button'
                        onClick={() => setConfirmId(null)}
                        disabled={mutation.isPending}
                      >
                        No
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type='button'
                        onClick={() => setConfirmId(quest.id)}
                        disabled={
                          mutation.isPending ||
                          mutationEdit.isPending ||
                          editingId !== null
                        }
                      >
                        {mutation.isPending && mutation.variables === quest.id
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </>
                  )}
                </Row>
                <Row>
                  {editingId === quest.id ? (
                    <>
                      <button
                        key='save'
                        type='submit'
                        disabled={mutationEdit.isPending}
                      >
                        {mutationEdit.isPending ? "Saving..." : "Save"}
                      </button>

                      <button
                        key='cancel'
                        type='button'
                        disabled={mutationEdit.isPending}
                        onClick={() => {
                          setEditingId(null);
                        }}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        key='edit'
                        type='button'
                        disabled={
                          mutationEdit.isPending ||
                          mutation.isPending ||
                          editingId !== null ||
                          confirmId !== null
                        }
                        onClick={() => {
                          mutationEdit.reset();
                          setEditingId(quest.id);
                          setTitleEdit(quest.title);
                          setDescriptionEdit(quest.description);
                          setXpRewardEdit(quest.xpReward);
                        }}
                      >
                        Edit
                      </button>
                    </>
                  )}
                </Row>
              </Column>
            </Row>
          </form>
          <ErrorMessage role='alert'>
            {mutation.isError && mutation.variables === quest.id
              ? mutation.error.message
              : ""}

            {mutationEdit.isError && mutationEdit.variables?.id === quest.id
              ? mutationEdit.error?.message
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
