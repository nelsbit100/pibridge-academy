import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AcademyProvider, useAcademy } from "../AcademyContext";
import { AcademyLanding } from "./AcademyLanding";

/** Reads the current view out of the context so we can assert navigation. */
function ViewProbe() {
  const { currentView } = useAcademy();
  return <div data-testid="current-view">{currentView}</div>;
}

function renderLanding() {
  return render(
    <AcademyProvider>
      <AcademyLanding />
      <ViewProbe />
    </AcademyProvider>
  );
}

describe("AcademyLanding", () => {
  it("renders the hero headline", () => {
    renderLanding();
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      /prove you can use it/i
    );
  });

  it("renders the featured programme path cards", () => {
    renderLanding();
    expect(
      screen.getByRole("heading", { name: /cybersecurity professional path/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /software engineering professional path/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /cloud & infrastructure professional path/i })
    ).toBeInTheDocument();
  });

  it("renders the platform stats", () => {
    renderLanding();
    expect(screen.getByText("742+")).toBeInTheDocument();
    expect(screen.getByText("Active Learners")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("Courses Available")).toBeInTheDocument();
  });

  it("renders the primary call-to-action buttons", () => {
    renderLanding();
    expect(screen.getByRole("button", { name: /browse programmes/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /i already have an account/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /get started/i })).toBeInTheDocument();
  });

  it("renders the instructors section", () => {
    renderLanding();
    expect(screen.getByText("Learn from the best.")).toBeInTheDocument();
    expect(screen.getByText("Kwame Asante")).toBeInTheDocument();
  });

  it("navigates to the programmes view when Browse Programmes is clicked", async () => {
    const user = userEvent.setup();
    renderLanding();
    await user.click(screen.getByRole("button", { name: /browse programmes/i }));
    expect(screen.getByTestId("current-view")).toHaveTextContent("programmes");
  });

  it("navigates to the learner dashboard when the account button is clicked", async () => {
    const user = userEvent.setup();
    renderLanding();
    await user.click(
      screen.getByRole("button", { name: /i already have an account/i })
    );
    expect(screen.getByTestId("current-view")).toHaveTextContent("learner-dashboard");
  });
});
