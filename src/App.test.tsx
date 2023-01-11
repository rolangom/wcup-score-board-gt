import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders main header", () => {
  render(<App />);
  const titleEl = screen.getByRole("heading", {
    name: /football world cup score board/i,
  });
  expect(titleEl).toBeInTheDocument();
});
