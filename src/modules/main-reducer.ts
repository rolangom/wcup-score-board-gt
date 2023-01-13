import { naiveID } from "../common/utils";
import {
  FinishGameAction,
  Game,
  ScoreBoard,
  GameAction,
  StartGameAction,
} from "../types";

function handleStarGameAction(
  state: ScoreBoard,
  action: StartGameAction
): ScoreBoard {
  const [home, away] = action.payload;
  const newGame: Game = {
    id: naiveID(),
    homeTeam: {
      name: home,
      score: 0,
    },
    awayTeam: {
      name: away,
      score: 0,
    },
  };
  return {
    ...state,
    [newGame.id]: newGame,
  };
}

function handleFinishGameAction(
  state: ScoreBoard,
  action: FinishGameAction
): ScoreBoard {
  const { payload: id } = action;
  const { [id]: _keyToRemove, ...rest } = state;
  return rest;
}

function reducer(state: ScoreBoard, action: GameAction): ScoreBoard {
  switch (action.type) {
    case "START_GAME":
      return handleStarGameAction(state, action);
    case "FINISH_GAME":
      return handleFinishGameAction(state, action);
    default:
      return state;
  }
}

export default reducer;
