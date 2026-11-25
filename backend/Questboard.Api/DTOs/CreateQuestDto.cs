namespace Questboard.Api.DTOs;

public record CreateQuestDto(
  string Title,
  string Description,
  int XpReward
);