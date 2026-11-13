import type { Quest } from "../types/quest";

export async function fetchQuests(): Promise<Quest[]> {
  const response = await fetch("http://localhost:5102/api/quests");

  if (!response.ok) {
    throw new Error("Failed to fetch quests");
  }

  return response.json() as Promise<Quest[]>;
}
