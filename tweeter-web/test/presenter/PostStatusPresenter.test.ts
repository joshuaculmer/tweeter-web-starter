import { AuthToken, Status, User } from "tweeter-shared";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../src/model.presenter/PostStatusPresenter";
import {
  anything,
  instance,
  mock,
  verify,
  spy,
  when,
} from "@typestrong/ts-mockito";
import { StatusService } from "../../src/model.service/StatusService";

describe("PostStatusPresenter", () => {
  let mockPostStatusView: PostStatusView;
  let postStatusPresenter: PostStatusPresenter;
  let mockService: StatusService;

  const authToken: AuthToken = new AuthToken("abc123", Date.now());
  const defaultUser: User = new User(
    "first",
    "last",
    "defaultuser",
    "imageUrl"
  );

  const status: Status = new Status(
    "new status abc123",
    defaultUser,
    Date.now()
  );

  beforeEach(() => {
    mockPostStatusView = mock<PostStatusView>();
    const mockPostStatusViewInstance = instance(mockPostStatusView);

    when(
      mockPostStatusView.displayInfoMessage("Posting status...", 0)
    ).thenReturn("messageID123");

    const postStatusPresenterSpy = spy(
      new PostStatusPresenter(mockPostStatusViewInstance)
    );
    postStatusPresenter = instance(postStatusPresenterSpy);

    mockService = mock<StatusService>();

    when(postStatusPresenterSpy.service).thenReturn(instance(mockService));
  });

  it("tells the view to display a posting status message", async () => {
    await postStatusPresenter.postStatus(
      authToken,
      "new status abc123",
      defaultUser
    );
    verify(mockPostStatusView.displayInfoMessage(anything(), 0)).once();
  });

  it("calls postStatus on the post status service with the correct status string and auth token.", async () => {
    await postStatusPresenter.postStatus(
      authToken,
      "new status abc123",
      defaultUser
    );
    verify(mockService.postStatus(authToken, "new status abc123")).once();
  });

  it("When posting of the status is successful, the presenter tells the view to clear the info message that was displayed previously, clear the post, and display a status posted message", async () => {
    await postStatusPresenter.postStatus(
      authToken,
      "new status abc123",
      defaultUser
    );

    verify(mockPostStatusView.deleteMessage("messageID123")).once();
    verify(mockPostStatusView.setPost("")).once();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).once();
  });

  it("When posting of the status is not successful, the presenter tells the view to clear the info message and display an error message but does not tell it to clear the post or display a status posted message.", async () => {
    let error = new Error("An error occured");
    when(mockService.postStatus(anything(), anything())).thenThrow(error);

    await postStatusPresenter.postStatus(
      authToken,
      "new status abc123",
      defaultUser
    );

    let expectedErrorMsg =
      "Failed to posting status because of exception: Error: An error occured";
    verify(mockPostStatusView.displayErrorMessage(expectedErrorMsg)).once();

    verify(mockPostStatusView.deleteMessage("messageID123")).once();
    verify(mockPostStatusView.setPost("")).never();
    verify(
      mockPostStatusView.displayInfoMessage("Status posted!", 2000)
    ).never();
  });
});
