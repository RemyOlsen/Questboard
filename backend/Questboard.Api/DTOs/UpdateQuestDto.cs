namespace Questboard.Api.DTOs;

public record UpdateQuestDto(
  string Title,
  string Description,
  int XpReward
);