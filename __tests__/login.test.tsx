import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "@/components/LoginForm"; // Adjust this path to match your project structure
import { useRouter } from "next/navigation";
import "@testing-library/jest-dom";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm Component", () => {
  let mockPush: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    localStorage.clear();
  });

  it("renders the login form", () => {
    render(<LoginForm />);
    expect(screen.getByText("Welcome!")).toBeInTheDocument();
    expect(
      screen.getByText("Please login to view your finances."),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();
  });

  it("shows validation messages for invalid inputs", async () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button", { name: /login/i });
    await userEvent.click(submitButton);

    expect(
      await screen.findByText("Username must be at least 4 characters."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Password must be at least 8 characters."),
    ).toBeInTheDocument();
  });

  it("shows an error message for invalid credentials", async () => {
    render(<LoginForm />);

    await userEvent.type(screen.getByPlaceholderText("Enter username"), "user");
    await userEvent.type(
      screen.getByPlaceholderText("Enter password"),
      "wrongpassword",
    );
    await userEvent.type(
        screen.getByPlaceholderText("Enter username"),
        "wrongusername",
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      await screen.findByText("Invalid username. Please try again."),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Invalid password. Please try again."),
    ).toBeInTheDocument();
  });

  it("redirects to /dashboard on successful login", async () => {
    render(<LoginForm />);

    await userEvent.type(
      screen.getByPlaceholderText("Enter username"),
      "admin",
    );
    await userEvent.type(
      screen.getByPlaceholderText("Enter password"),
      "password123",
    );
    await userEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/dashboard");
    });

    expect(localStorage.getItem("credentials")).toEqual(
      JSON.stringify({ username: "admin", password: "password123" }),
    );
  });

  it("redirects to /dashboard if user is already logged in", () => {
    localStorage.setItem(
      "credentials",
      JSON.stringify({ username: "admin", password: "password123" }),
    );

    render(<LoginForm />);

    expect(mockPush).toHaveBeenCalledWith("/dashboard");
  });
});
