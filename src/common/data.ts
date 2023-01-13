import { Game } from "../types";
import { naiveID } from "./utils";

export const initialGameData: Game[] = [
  {
    id: naiveID(1),
    homeTeam: {
      name: "Germany",
      score: 2,
    },
    awayTeam: {
      name: "France",
      score: 2,
    },
  },
  {
    id: naiveID(2),
    homeTeam: {
      name: "Argentina",
      score: 3,
    },
    awayTeam: {
      name: "Australia",
      score: 1,
    },
  },
  {
    id: naiveID(3),
    homeTeam: {
      name: "Mexico",
      score: 0,
    },
    awayTeam: {
      name: "Canada",
      score: 5,
    },
  },
  {
    id: naiveID(4),
    homeTeam: {
      name: "Spain",
      score: 10,
    },
    awayTeam: {
      name: "Brazil",
      score: 2,
    },
  },
  {
    id: naiveID(5),
    homeTeam: {
      name: "Uruguay",
      score: 6,
    },
    awayTeam: {
      name: "Italy",
      score: 6,
    },
  },
];
