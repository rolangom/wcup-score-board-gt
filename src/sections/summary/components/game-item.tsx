import { Game, TeamScore } from "../../../types";

interface TeamScoreProps {
  team: TeamScore;
}

function TeamScoreItem({ team }: TeamScoreProps) {
  const { name, score } = team;
  return (
    <span>
      {name} {score}
    </span>
  );
}

interface GameItemProps {
  game: Game;
}

function GameItem({ game }: GameItemProps) {
  const { homeTeam, awayTeam, id } = game;
  return (
    <li>
      <span className="text">
        <TeamScoreItem team={homeTeam} />
        {" - "}
        <TeamScoreItem team={awayTeam} />
      </span>
    </li>
  );
}

export default GameItem;
