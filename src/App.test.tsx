/* eslint-disable testing-library/no-node-access */
import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import App from "./App";
import { initialGameData } from "./common/data";

test("Renders main header", () => {
  render(<App />);
  const titleEl = screen.getByRole("heading", {
    name: /football world cup score board/i,
  });
  expect(titleEl).toBeInTheDocument();
});

test("Renders Summary, length and descending by default", () => {
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

test("Add a new game and check summary, length and content of first listitem (as most recent)", () => {
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

test("Finish a game and expect to be removed from summary", () => {
  render(<App />);

  const listItems = screen.getAllByRole("listitem");
  const prevLength = listItems.length;

  const [firstElement] = listItems;

  const finishBtn = within(firstElement).getByRole("button", {
    name: /finish/i,
  });

  // click the finish button to remove from document
  fireEvent.click(finishBtn);

  expect(firstElement).not.toBeInTheDocument();

  // check the new listitems length is prevLength - 1
  const newListItems = screen.getAllByRole("listitem");
  expect(newListItems.length).toBe(prevLength - 1);
});

test("Edit a game and expect to be updated in summary", async () => {
  render(<App />);

  const listItems = screen.getAllByRole("listitem");

  const [firstElement] = listItems;

  const editBtn = within(firstElement).getByRole("button", { name: /edit/i });
  fireEvent.click(editBtn);

  // After edit btn is clicked, the edit form is displayed
  expect(within(firstElement).getByText(/edit scores/i)).toBeInTheDocument();

  const newHomeScore = 12,
    newAwayScore = 8;

  const homeInput = firstElement.querySelector(`input[name="homeTeam"]`)!;
  const awayInput = firstElement.querySelector(`input[name="awayTeam"]`)!;
  const homeLabel = firstElement.querySelector(`label[for="${homeInput.id}"]`)!;
  const awayLabel = firstElement.querySelector(`label[for="${awayInput.id}"]`)!;

  const homeTeam = homeLabel.textContent;
  const awayTeam = awayLabel.textContent;

  fireEvent.change(homeInput, { target: { value: newHomeScore } });
  fireEvent.change(awayInput, { target: { value: newAwayScore } });

  // click update btn after update scores
  const updateBtn = within(firstElement).getByRole("button", {
    name: /update/i,
  });
  fireEvent.click(updateBtn);

  // Refetch summary list items to validate updated scores
  const newListItems = screen.getAllByRole("listitem");

  const [newFirstElement] = newListItems;
  const firstElText = `${homeTeam} ${newHomeScore} - ${awayTeam} ${newAwayScore}`;
  expect(newFirstElement.textContent).toMatch(
    new RegExp(`^${firstElText}`, "i")
  );
});
