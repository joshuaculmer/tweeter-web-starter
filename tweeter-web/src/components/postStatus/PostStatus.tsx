import "./PostStatus.css";
import { useState } from "react";
import { useUserInfo } from "../../model.presenter/UserInfoContexts";
import {
  PostStatusPresenter,
  PostStatusView,
} from "../../model.presenter/PostStatusPresenter";
import { useMessageActions } from "../../model.presenter/messagehooks";

interface Props {
  presenter?: PostStatusPresenter;
}
const PostStatus = (props: Props) => {
  const { currentUser, authToken } = useUserInfo();
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { displayErrorMessage, displayInfoMessage, deleteMessage } =
    useMessageActions();

  const listener: PostStatusView = {
    setIsLoading: setIsLoading,
    setPost: setPost,
    deleteMessage: deleteMessage,
    displayInfoMessage: displayInfoMessage,
    displayErrorMessage: displayErrorMessage,
  };
  const presenter = props.presenter ?? new PostStatusPresenter(listener);

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();
    await presenter.postStatus(authToken, post, currentUser);
  };

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    setPost("");
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          aria-label="text field for status"
          rows={10}
          placeholder="What's on your mind?"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          aria-label="submit"
          disabled={checkButtonStatus()}
          style={{ width: "8em" }}
          onClick={submitPost}
        >
          {isLoading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <div>Post Status</div>
          )}
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          aria-label="clear"
          disabled={checkButtonStatus()}
          onClick={clearPost}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
