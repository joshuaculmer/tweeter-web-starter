import { AuthToken } from "tweeter-shared";
import {
  AppNavbarPresenter,
  AppNavbarView,
} from "../../src/model.presenter/AppNavbarPresenter";
import {
  anything,
  instance,
  mock,
  verify,
  spy,
  when,
} from "@typestrong/ts-mockito";
import { AuthService } from "../../src/model.service/AuthService";

describe("AppNavbarPresenter", () => {
  let mockAppNavbarPresenterView: AppNavbarView;
  let appNavbarPresenter: AppNavbarPresenter;
  let mockService: AuthService;

  const authToken: AuthToken = new AuthToken("abc123", Date.now());
  beforeEach(() => {
    mockAppNavbarPresenterView = mock<AppNavbarView>();
    const mockAppNavbarPresenterViewInstance = instance(
      mockAppNavbarPresenterView
    );

    when(
      mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)
    ).thenReturn("messageID123");

    const appNavbarPresenterSpy = spy(
      new AppNavbarPresenter(mockAppNavbarPresenterViewInstance)
    );
    appNavbarPresenter = instance(appNavbarPresenterSpy);

    mockService = mock<AuthService>();
    when(appNavbarPresenterSpy.service).thenReturn(instance(mockService));
  });

  it("displays logging out message", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(
      mockAppNavbarPresenterView.displayInfoMessage("Logging Out...", 0)
    ).once();
  });

  it("calls logout on Auth service with the correct auth token", async () => {
    await appNavbarPresenter.logOut(authToken);
    verify(mockService.logout(authToken)).once();
  });

  it("When the logout is successful, the presenter tells the view to clear the info message that was displayed previously, clear the user info, and navigate to the login page.", async () => {
    await appNavbarPresenter.logOut(authToken);

    verify(mockAppNavbarPresenterView.deleteMessage("messageID123")).once();
    verify(mockAppNavbarPresenterView.clearUserInfo()).once();
    verify(mockAppNavbarPresenterView.navigateToLogin()).once();

    verify(mockAppNavbarPresenterView.displayErrorMessage(anything())).never();
  });

  it("When the logout is not successful, the presenter tells the view to display an error message and does not tell it to clear the info message, clear the user info or navigate to the login page", async () => {
    let error = new Error("An error occured");
    when(mockService.logout(anything())).thenThrow(error);
    await appNavbarPresenter.logOut(authToken);
    let expectedErrorMsg =
      "Failed to log user out because of exception: Error: An error occured";
    verify(
      mockAppNavbarPresenterView.displayErrorMessage(expectedErrorMsg)
    ).once();
    verify(mockAppNavbarPresenterView.deleteMessage(anything())).never();
    verify(mockAppNavbarPresenterView.clearUserInfo()).never();
    verify(mockAppNavbarPresenterView.navigateToLogin()).never();
  });
});
