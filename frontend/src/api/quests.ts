import type { Quest, CreateQuestRequest } from "../types/quest";

const API_URL = "http://localhost:5102";

export async function fetchQuests(): Promise<Quest[]> {
  const response = await fetch(`${API_URL}/api/quests`);

  if (!response.ok) {
    throw new Error("Failed to fetch quests");
  }

  return response.json() as Promise<Quest[]>;
}

export async function createQuest(quest: CreateQuestRequest): Promise<Quest> {
  const response = await fetch(`${API_URL}/api/quests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(quest),
  });

  if (!response.ok) {
    throw new Error("Failed to create quest");
  }

  return response.json() as Promise<Quest>;
}
