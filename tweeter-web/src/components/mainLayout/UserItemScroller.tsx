import {
  useUserInfo,
  useUserInfoActions,
} from "../../model.presenter/UserInfoContexts";
import { useState, useEffect, useRef } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { AuthToken, User } from "tweeter-shared";
import { useParams } from "react-router-dom";
import UserItem from "../userItem/UserItem";
import { useMessageActions } from "../../model.presenter/messagehooks";
import { UserItemPresenter } from "../../model.presenter/UserItemPresenter";
import { PagedItemView } from "../../model.presenter/PagedItemPresenter";

interface Props {
  featureUrl: string;
  presenterFactory: (view: PagedItemView<User>) => UserItemPresenter;
}

const UserItemScroller = (props: Props) => {
  const { displayErrorMessage } = useMessageActions();
  const [items, setItems] = useState<User[]>([]);
  const { displayedUser, authToken } = useUserInfo();
  const { setDisplayedUser } = useUserInfoActions();
  const { displayedUser: displayedUserAliasParam } = useParams();

  const listener: PagedItemView<User> = {
    addItems(newItems: User[]) {
      setItems((previousItems) => [...previousItems, ...newItems]);
    },
    displayErrorMessage: displayErrorMessage,
  };

  const presenterRef = useRef<UserItemPresenter | null>(null);
  if (!presenterRef.current) {
    presenterRef.current = props.presenterFactory(listener);
  }

  // Update the displayed user context variable whenever the displayedUser url parameter changes. This allows browser forward and back buttons to work correctly.
  useEffect(() => {
    if (
      authToken &&
      displayedUserAliasParam &&
      displayedUserAliasParam != displayedUser!.alias
    ) {
      getUser(authToken!, displayedUserAliasParam!).then((toUser) => {
        if (toUser) {
          setDisplayedUser(toUser);
        }
      });
    }
  }, [displayedUserAliasParam]);

  // Initialize the component whenever the displayed user changes
  useEffect(() => {
    reset();
    loadMoreItems();
  }, [displayedUser]);

  const reset = async () => {
    setItems(() => []);
    presenterRef.current!.reset();
  };

  const loadMoreItems = async () => {
    presenterRef.current!.loadMoreItems(authToken!, displayedUser!.alias);
  };

  // potentially refactor
  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    return presenterRef.current!.getUser(authToken, alias);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={loadMoreItems}
        hasMore={presenterRef.current!.hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <UserItem user={item} featurePath={props.featureUrl} />
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default UserItemScroller;
