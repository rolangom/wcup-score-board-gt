import SimpleField from "../../../common/components/simple-field";
import { handleFormEventPrepareValues } from "../../../common/utils";
import { Game, HomeAwayScoreTuple, UpdateScoreAction } from "../../../types";

interface Props {
  game: Game;
  updateGameScore: (payload: UpdateScoreAction["payload"]) => void;
  cancel: () => void;
}

function EditGameItem({ game, updateGameScore, cancel }: Props) {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    const [_form, formProps] = handleFormEventPrepareValues(ev);
    const gameScoresTuple = [
      Number(formProps.homeTeam),
      Number(formProps.awayTeam),
    ] as HomeAwayScoreTuple;
    updateGameScore({
      id: game.id,
      scores: gameScoresTuple,
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <h3>Edit scores</h3>
      <SimpleField
        name="homeTeam"
        id={`${game.id}_home-score-input`}
        type="number"
        label={game.homeTeam.name}
        defaultValue={game.homeTeam.score}
      />
      <SimpleField
        name="awayTeam"
        id={`${game.id}_away-score-input`}
        type="number"
        label={game.awayTeam.name}
        defaultValue={game.awayTeam.score}
      />
      <button type="submit">Update</button>
      <button type="button" onClick={cancel}>
        Cancel
      </button>
      <hr />
    </form>
  );
}

export default EditGameItem;
