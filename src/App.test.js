
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("booking form displays all important fields", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: /reserve a table/i })
  ).toBeInTheDocument();

  expect(screen.getByLabelText(/choose date/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/choose time/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/number of guests/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/occasion/i)).toBeInTheDocument();

  expect(
    screen.getByRole("button", { name: /make your reservation/i })
  ).toBeInTheDocument();
});

test("valid booking details display a confirmation message", () => {
  render(<App />);

  const dateInput = screen.getByLabelText(/choose date/i);

  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 1);

  const dateValue = [
    futureDate.getFullYear(),
    String(futureDate.getMonth() + 1).padStart(2, "0"),
    String(futureDate.getDate()).padStart(2, "0"),
  ].join("-");

  fireEvent.change(dateInput, {
    target: { value: dateValue },
  });

  fireEvent.change(screen.getByLabelText(/number of guests/i), {
    target: { value: "3" },
  });

  fireEvent.click(
    screen.getByRole("button", { name: /make your reservation/i })
  );

  expect(
    screen.getByRole("status")
  ).toHaveTextContent(/booking details entered/i);

  expect(screen.getByRole("status")).toHaveTextContent(/3 guests/i);
});

test("invalid past date displays an error message", () => {
  render(<App />);

  const dateInput = screen.getByLabelText(/choose date/i);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const dateValue = [
    yesterday.getFullYear(),
    String(yesterday.getMonth() + 1).padStart(2, "0"),
    String(yesterday.getDate()).padStart(2, "0"),
  ].join("-");

  fireEvent.change(dateInput, {
    target: { value: dateValue },
  });

  fireEvent.click(
    screen.getByRole("button", { name: /make your reservation/i })
  );

  expect(screen.getByRole("status")).toHaveTextContent(
    /select today or a future date/i
  );
});
