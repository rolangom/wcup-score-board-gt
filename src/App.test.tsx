import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { initialGameData } from "./common/data";

test("renders main header", () => {
  render(<App />);
  const titleEl = screen.getByRole("heading", {
    name: /football world cup score board/i,
  });
  expect(titleEl).toBeInTheDocument();
});

test("renders Summary, length and descending by default", () => {
  render(<App />);
  const listItems = screen.getAllByRole("listitem");
  expect(listItems).toHaveLength(initialGameData.length);

  const [firstElement] = listItems;
  const lastElement = listItems[listItems.length - 1];

  const firstListItem = initialGameData[0];
  const lastListItem = initialGameData[initialGameData.length - 1];

  const lastElText = `${lastListItem.homeTeam.name} ${lastListItem.homeTeam.score} - ${lastListItem.awayTeam.name} ${lastListItem.awayTeam.score}`;
  const firstElText = `${firstListItem.homeTeam.name} ${firstListItem.homeTeam.score} - ${firstListItem.awayTeam.name} ${firstListItem.awayTeam.score}`;

  expect(firstElement.textContent).toMatch(new RegExp(`^${lastElText}`, "i"));
  expect(lastElement.textContent).toMatch(new RegExp(`^${firstElText}`, "i"));
});

test("Add a new game and check summary, length and content of first listitem (most recent)", () => {
  render(<App />);

  const homeInput = screen.getByLabelText("Home team");
  const awayInput = screen.getByLabelText("Away team");

  const homeTeam = "Dominican Rep.";
  const awayTeam = "Venezuela";

  fireEvent.change(homeInput, { target: { value: homeTeam } });
  fireEvent.change(awayInput, { target: { value: awayTeam } });

  fireEvent.click(screen.getByRole("button", { name: /start game/i }));

  const listItems = screen.getAllByRole("listitem");

  // length of default + 1
  expect(listItems).toHaveLength(initialGameData.length + 1);

  const [firstElement] = listItems;
  const expectedFirstElText = `${homeTeam} 0 - ${awayTeam} 0`;

  expect(firstElement.textContent).toMatch(
    new RegExp(`^${expectedFirstElText}`, "i")
  );
});
