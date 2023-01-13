import React, { useCallback, useReducer } from "react";
import "./App.css";
import { initialGameData } from "./common/data";
import { convertArrayToKeyRecords } from "./common/utils";
import Summary from "./sections/summary";
import mainReducer from "./modules/main-reducer";
import { HomeAwayTuple, UpdateScoreAction } from "./types";
import StartGame from "./sections/start-game";

function useAppStateAndActions() {
  const [state, dispatch] = useReducer(
    mainReducer,
    initialGameData,
    convertArrayToKeyRecords
  );
  const addGame = useCallback(
    (homeAwayTuple: HomeAwayTuple) => {
      dispatch({
        type: "START_GAME",
        payload: homeAwayTuple,
      });
    },
    [dispatch]
  );
  const finishGame = useCallback(
    (id: string) => {
      dispatch({
        type: "FINISH_GAME",
        payload: id,
      });
    },
    [dispatch]
  );
  const updateScore = useCallback(
    (payload: UpdateScoreAction["payload"]) => {
      dispatch({
        type: "UPDATE_SCORE",
        payload,
      });
    },
    [dispatch]
  );
  return {
    state,
    addGame,
    finishGame,
    updateScore,
  };
}

function App() {
  const { state, addGame, finishGame, updateScore } = useAppStateAndActions();
  return (
    <div className="app_container">
      <header>
        <h1>Football World Cup Score Board</h1>
      </header>
      <main>
        <StartGame addGame={addGame} />
        <hr />
        <Summary
          games={state}
          finishGame={finishGame}
          updateGame={updateScore}
        />
      </main>
    </div>
  );
}

export default App;
