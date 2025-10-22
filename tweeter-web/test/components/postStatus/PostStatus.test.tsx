import { MemoryRouter } from "react-router-dom";
import PostStatus from "../../../src/components/postStatus/PostStatus";
import { render, screen } from "@testing-library/react";
import { UserEvent, userEvent } from "@testing-library/user-event";
import "@testing-library/jest-dom";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { anything, instance, mock, verify } from "@typestrong/ts-mockito";
import { useUserInfo } from "../../../src/model.presenter/UserInfoContexts";
import { AuthToken, User } from "tweeter-shared";
import { PostStatusPresenter } from "../../../src/model.presenter/PostStatusPresenter";
library.add(fab);

jest.mock("../../../src/model.presenter/UserInfoContexts", () => ({
  ...jest.requireActual("../../../src/model.presenter/UserInfoContexts"),
  __esModule: true,
  useUserInfo: jest.fn(),
}));

describe("PostStatus", () => {
  beforeAll(() => {
    const mockUser = mock<User>();
    const mockUserInstance = instance(mockUser);

    const mockAuthToken = mock<AuthToken>();
    const mockAuthTokenInstance = instance(mockAuthToken);

    (useUserInfo as jest.Mock).mockReturnValue({
      currentUser: mockUserInstance,
      authToken: mockAuthTokenInstance,
    });
  });
  it("Post Status and Clear buttons are both disabled upon first render.", async () => {
    const { user, postbutton, clearbutton, textField } =
      renderLoginAndGetElements();
    expect(postbutton).toBeDisabled();
    expect(clearbutton).toBeDisabled();
  });

  it("enables both buttons when text field has text", async () => {
    const { user, postbutton, clearbutton, textField } =
      renderLoginAndGetElements();
    expect(postbutton).toBeDisabled();
    expect(clearbutton).toBeDisabled();

    await user.type(textField, "something");
    expect(postbutton).toBeEnabled();
    expect(clearbutton).toBeEnabled();
  });

  it("disables both buttons are disabled when the text field is cleared.", async () => {
    const { user, postbutton, clearbutton, textField } =
      renderLoginAndGetElements();
    expect(postbutton).toBeDisabled();
    expect(clearbutton).toBeDisabled();

    await user.type(textField, "something");
    expect(postbutton).toBeEnabled();
    expect(clearbutton).toBeEnabled();

    await user.clear(textField);
    expect(postbutton).toBeDisabled();
    expect(clearbutton).toBeDisabled();
  });

  it("calls postStatus method is called with correct parameters when the Post Status button is pressed.", async () => {
    const mockPresenter = mock<PostStatusPresenter>();
    const mockPresenterInstance = instance(mockPresenter);

    const { user, postbutton, clearbutton, textField } =
      renderLoginAndGetElements(mockPresenterInstance);
    expect(postbutton).toBeDisabled();
    expect(clearbutton).toBeDisabled();

    await user.type(textField, "something");
    expect(postbutton).toBeEnabled();
    expect(clearbutton).toBeEnabled();

    verify(
      mockPresenter.postStatus(anything(), anything(), anything())
    ).never();

    await user.click(postbutton);

    verify(mockPresenter.postStatus(anything(), anything(), anything())).once();
  });
});

function renderPostStatus(presenter?: PostStatusPresenter) {
  return render(
    <MemoryRouter>
      {!!presenter ? (
        <PostStatus presenter={presenter}></PostStatus>
      ) : (
        <PostStatus></PostStatus>
      )}
    </MemoryRouter>
  );
}

function renderLoginAndGetElements(presenter?: PostStatusPresenter) {
  const user = userEvent.setup();

  renderPostStatus(presenter);
  const postbutton = screen.getByRole("button", { name: "submit" });
  const clearbutton = screen.getByRole("button", { name: "clear" });
  const textField = screen.getByRole("textbox", {
    name: "text field for status",
  });

  return { user, postbutton, clearbutton, textField };
}
