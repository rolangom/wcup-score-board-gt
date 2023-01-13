import React, { useReducer } from "react";
import "./App.css";
import { initialGameData } from "./common/data";
import { convertArrayToKeyRecords } from "./common/utils";
import Summary from "./sections/summary";
import mainReducer from "./modules/main-reducer";

function useAppStateAndActions() {
  const [state, dispatch] = useReducer(
    mainReducer,
    initialGameData,
    convertArrayToKeyRecords
  );
  return {
    state,
  };
}

function App() {
  const { state } = useAppStateAndActions();
  return (
    <div>
      <header>
        <h1>Football World Cup Score Board</h1>
      </header>
      <main>
        <Summary games={state} />
      </main>
    </div>
  );
}

export default App;
