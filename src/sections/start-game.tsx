import SimpleField from "../common/components/simple-field";
import { handleFormEventPrepareValues } from "../common/utils";
import { HomeAwayTuple } from "../types";

interface Props {
  addGame: (arg: HomeAwayTuple) => void;
}

function StartGame({ addGame }: Props) {
  // Handling submit imperatively, to prevent rerender on every input change
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    const [form, formProps] = handleFormEventPrepareValues(ev);
    const gameTuple = [formProps.homeTeam, formProps.awayTeam] as HomeAwayTuple;
    addGame(gameTuple);
    form.reset();
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Enter Start Game info</h2>
      <SimpleField name="homeTeam" id="home-team-input" label="Home team" />
      <SimpleField name="awayTeam" id="away-team-input" label="Away team" />
      <button type="submit">Start Game</button>
    </form>
  );
}

export default StartGame;
