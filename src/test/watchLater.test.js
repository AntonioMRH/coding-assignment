import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "./utils";
import App from "../App";

import "./intersectionObserver.mock";

it("Watch Later movies page", async () => {
  renderWithProviders(<App />);

  await userEvent.type(screen.getByTestId("search-movies"), "forrest gump");
  await waitFor(() => {
    expect(
      screen.getAllByText("Through the Eyes of Forrest Gump")[0]
    ).toBeInTheDocument();
  });
  const watchLaterLink = screen.getAllByTestId("watch-later")[0];
  await waitFor(() => {
    expect(watchLaterLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterLink);

  const watchLaterNavLink = screen.getByTestId("nav-watch-later");
  await waitFor(() => {
    expect(watchLaterNavLink).toBeInTheDocument();
  });
  await userEvent.click(watchLaterNavLink);
  const watchLaterDiv = screen.getByTestId("watch-later-div");
  await waitFor(() => {
    expect(watchLaterDiv).toBeInTheDocument();
  });
});
