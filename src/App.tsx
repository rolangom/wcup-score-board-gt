import React, { useReducer } from "react";
import React, { useCallback, useReducer } from "react";
import "./App.css";
import { initialGameData } from "./common/data";
import { convertArrayToKeyRecords } from "./common/utils";
import Summary from "./sections/summary";
import mainReducer from "./modules/main-reducer";
import { HomeAwayTuple } from "./types";
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
  return {
    state,
    addGame,
  };
}

function App() {
  const { state, addGame } = useAppStateAndActions();
  return (
    <div>
      <header>
        <h1>Football World Cup Score Board</h1>
      </header>
      <main>
        <StartGame addGame={addGame} />
        <hr />
        <Summary games={state} />
      </main>
    </div>
  );
}

export default App;
