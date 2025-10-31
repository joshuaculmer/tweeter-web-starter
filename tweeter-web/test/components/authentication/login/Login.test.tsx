import { MemoryRouter } from "react-router-dom";
import Login from "../../../../src/components/authentication/login/Login";
import { render, screen } from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { LoginPresenter } from "../../../../src/model.presenter/LoginPresenter";
import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
library.add(fab);

describe("Login Component", () => {
  it("starts with sign in button disabled", async () => {
    const { signInButton } = renderLoginAndGetElements("/");
    expect(signInButton).toBeDisabled();
  });

  it("enables the sign in button if both alias and password fields have text", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/");

    await typeAliasAndPassword(aliasField, passwordField, signInButton, user);
  });

  it("enables the sign in button if either alias or password field is cleared", async () => {
    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/");

    await typeAliasAndPassword(aliasField, passwordField, signInButton, user);

    await user.clear(aliasField);
    expect(signInButton).toBeDisabled();
    await user.type(aliasField, "alias here");
    expect(signInButton).toBeEnabled();
    await user.clear(passwordField);
    expect(signInButton).toBeDisabled();
  });

  it("calls the presenter's login method with correct parameters when the sign in button is pressed", async () => {
    const mockPresenter = mock<LoginPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { signInButton, aliasField, passwordField, user } =
      renderLoginAndGetElements("/", mockPresenterInstance);

    await typeAliasAndPassword(aliasField, passwordField, signInButton, user);
    await user.click(signInButton);

    verify(mockPresenter.doLogin("alias", "password", false)).once();
  });
});

async function typeAliasAndPassword(
  aliasField: HTMLElement,
  passwordField: HTMLElement,
  signInButton: HTMLElement,
  user: UserEvent
) {
  await user.type(aliasField, "alias");
  await user.type(passwordField, "password");
  expect(signInButton).toBeEnabled();
}

function renderLogin(originalUrl: string, presenter?: LoginPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <Login originalUrl={originalUrl} presenter={presenter}></Login>
      ) : (
        <Login originalUrl={originalUrl}></Login>
      )}
    </MemoryRouter>
  );
}

function renderLoginAndGetElements(
  originalUrl: string,
  presenter?: LoginPresenter
) {
  const user = userEvent.setup();
  console.log("in render function" + presenter);
  renderLogin(originalUrl, presenter);
  const signInButton = screen.getByRole("button", { name: /Sign in/i });
  const aliasField = screen.getByLabelText("alias");
  const passwordField = screen.getByLabelText("password");

  return { user, signInButton, aliasField, passwordField };
}
