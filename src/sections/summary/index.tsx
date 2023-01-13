import { useMemo } from "react";
import { sortGamesByKeyDesc } from "../../common/utils";
import { ScoreBoard } from "../../types";
import GameItem from "./components/game-item";

interface SummaryProps {
  games: ScoreBoard;
}
function Summary({ games }: SummaryProps) {
  const gamesSorted = useMemo(
    () => sortGamesByKeyDesc(Object.values(games)),
    [games]
  );
  return (
    <section>
      <h2>Summary</h2>
      <ul>
        {gamesSorted.map((it) => (
          <GameItem key={it.id} game={it} />
        ))}
      </ul>
    </section>
  );
}

export default Summary;
