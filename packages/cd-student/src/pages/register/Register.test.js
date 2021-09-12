import { render, screen } from "@testing-library/react";
import Register from "./Register";

describe("All inputs loaded properly", () => {
  test("disabled inputs are working properly", () => {
    render(<Register />);

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email");
    const campusInput = screen.getByPlaceholderText("Campus");

    expect(firstNameInput).toBeDisabled();
    expect(lastNameInput).toBeDisabled();
    expect(emailInput).toBeDisabled();
    expect(campusInput).toBeDisabled();
  });
});
