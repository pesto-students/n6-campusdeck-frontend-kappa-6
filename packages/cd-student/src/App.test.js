import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App.jsx renders correctly", () => {
  test("Hello world renders correctly", () => {
    render(<App />);
    const linkElement = screen.getByText(/Hello, world/i);
    expect(linkElement).toBeInTheDocument();
  });
});
