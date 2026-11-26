export interface Quest {
  id: number;
  title: string;
  description: string;
  xpReward: number;
}

// Typescript equivalent of backend's CreateQuestDto
export interface CreateQuestRequest {
  title: string;
  description: string;
  xpReward: number;
}

export interface UpdateQuestRequest {
  title: string;
  description: string;
  xpReward: number;
}

// export type CreateQuestRequest = Omit<Quest, "id">;
