export interface TeamScore {
  name: string;
  score: number;
}

type ID = string;
export interface Game {
  id: ID;
  homeTeam: TeamScore;
  awayTeam: TeamScore;
}

export type ScoreBoard = Record<ID, Game>;

export interface Action {
  type: string;
  payload: any;
}

export type HomeAwayTuple = [home: string, away: string];
export type HomeAwayScoreTuple = [home: number, away: number];

export interface StartGameAction extends Action {
  type: "START_GAME";
  payload: HomeAwayTuple;
}
export interface UpdateScoreAction extends Action {
  type: "UPDATE_SCORE";
  payload: {
    id: ID;
    scores: HomeAwayScoreTuple;
  };
}

export interface FinishGameAction extends Action {
  type: "FINISH_GAME";
  payload: ID;
}

export type GameAction = StartGameAction | UpdateScoreAction | FinishGameAction;
