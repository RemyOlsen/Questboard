namespace Questboard.Api.Models;

public class Quest
{
  public int Id {get; set; }
  public string Title {get; set; } = string.Empty;
  public string Description {get; set; } = string.Empty;
  public int XpReward {get; set; }
}