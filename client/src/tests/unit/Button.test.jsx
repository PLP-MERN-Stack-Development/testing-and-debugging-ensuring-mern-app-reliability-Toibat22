import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../../components/button";

describe("Button Component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("btn-primary btn-md");
  });

  it("renders with custom type, size, and variant", () => {
    render(
      <Button type="button" size="lg" variant="secondary">
        Custom Button
      </Button>
    );
    const button = screen.getByRole("button", { name: /custom button/i });
    expect(button).toHaveClass("btn-secondary btn-lg");
  });

  it("handles click events", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByText(/click/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
