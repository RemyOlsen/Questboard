import { useState } from "react";
import type { SubmitEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createQuest } from "../api/quests";

export function QuestForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [xpReward, setXpReward] = useState(50);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createQuest,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["quests"],
      });

      setTitle("");
      setDescription("");
      setXpReward(50);
    },
  });

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    mutation.mutate({
      title,
      description,
      xpReward,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Quest</h2>
      <label>
        Title:
        <input
          type='text'
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <br />

      <label>
        Description
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </label>

      <br />

      <label>
        XP Reward:
        <input
          type='number'
          value={xpReward}
          onChange={(event) => setXpReward(Number(event.target.value))}
          min={1}
          required
        />
      </label>

      <br />

      <button type='submit' disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Quest"}
      </button>

      {mutation.isError && <p>{mutation.error.message}</p>}
    </form>
  );
}
