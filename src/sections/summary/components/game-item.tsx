import { useReducer } from "react";
import { toggleReducer } from "../../../common/utils";
import { Game, TeamScore, UpdateScoreAction } from "../../../types";
import EditGameItem from "./edit-game";

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
  updateGame: (payload: UpdateScoreAction["payload"]) => void;
}

function GameItem({ game, finish, updateGame }: GameItemProps) {
  const [isEditMode, toggle] = useReducer(toggleReducer, false);
  const handleLocalUpdate: typeof updateGame = (payload) => {
    updateGame(payload);
    toggle();
  };
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
        <button onClick={toggle} disabled={isEditMode}>
          Edit
        </button>
        &nbsp;
        <button
          className="finish"
          onClick={() => finish(id)}
          disabled={isEditMode}
        >
          Finish
        </button>
      </span>
      {isEditMode && (
        <EditGameItem
          game={game}
          updateGameScore={handleLocalUpdate}
          cancel={toggle}
        />
      )}
    </li>
  );
}

export default GameItem;
