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
  finish: (id: string) => void;
}

function GameItem({ game, finish }: GameItemProps) {
  const { homeTeam, awayTeam, id } = game;
  return (
    <li>
      <span className="text">
        <TeamScoreItem team={homeTeam} />
        {" - "}
        <TeamScoreItem team={awayTeam} />
      </span>
      &nbsp;
      <span className="actions">
        <button onClick={() => finish(id)}>Finish</button>
      </span>
    </li>
  );
}

export default GameItem;
