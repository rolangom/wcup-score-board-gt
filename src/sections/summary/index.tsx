import { useMemo } from "react";
import { sortGamesByKeyDesc } from "../../common/utils";
import { ScoreBoard, UpdateScoreAction } from "../../types";
import GameItem from "./components/game-item";

interface SummaryProps {
  games: ScoreBoard;
  finishGame: (id: string) => void;
  updateGame: (payload: UpdateScoreAction["payload"]) => void;
}
function Summary({ games, finishGame, updateGame }: SummaryProps) {
  const gamesSorted = useMemo(
    () => sortGamesByKeyDesc(Object.values(games)),
    [games]
  );
  return (
    <section>
      <h2>Summary</h2>
      <ul>
        {gamesSorted.map((it) => (
          <GameItem
            key={it.id}
            game={it}
            finish={finishGame}
            updateGame={updateGame}
          />
        ))}
      </ul>
    </section>
  );
}

export default Summary;
