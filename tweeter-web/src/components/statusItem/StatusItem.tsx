import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken, Status, FakeData, User } from "tweeter-shared";
import { useContext, useState } from "react";
import {
  UserInfoActionsContext,
  UserInfoContext,
} from "../userInfo/UserInfoContexts";
import { ToastActionsContext } from "../toaster/ToastContexts";
import { ToastType } from "../toaster/Toast";

export const PAGE_SIZE = 10;

interface Props {}

const StatusItem = (props: Props) => {
  const { displayToast } = useContext(ToastActionsContext);
  const [items, setItems] = useState<Status[]>([]);
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const { displayedUser, authToken } = useContext(UserInfoContext);
  const [lastItem, setLastItem] = useState<Status | null>(null);
  const navigate = useNavigate();
  const { setDisplayedUser } = useContext(UserInfoActionsContext);
  const addItems = (newItems: Status[]) =>
    setItems((previousItems) => [...previousItems, ...newItems]);

  const loadMoreItems = async (lastItem: Status | null) => {
    try {
      const [newItems, hasMore] = await loadMoreStoryItems(
        authToken!,
        displayedUser!.alias,
        PAGE_SIZE,
        lastItem
      );

      setHasMoreItems(() => hasMore);
      setLastItem(() => newItems[newItems.length - 1]);
      addItems(newItems);
    } catch (error) {
      displayToast(
        ToastType.Error,
        `Failed to load story items because of exception: ${error}`,
        0
      );
    }
  };

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`/story/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayToast(
        ToastType.Error,
        `Failed to get user because of exception: ${error}`,
        0
      );
    }
  };

  const extractAlias = (value: string): string => {
    const index = value.indexOf("@");
    return value.substring(index);
  };

  const getUser = async (
    authToken: AuthToken,
    alias: string
  ): Promise<User | null> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.findUserByAlias(alias);
  };

  const loadMoreStoryItems = async (
    authToken: AuthToken,
    userAlias: string,
    pageSize: number,
    lastItem: Status | null
  ): Promise<[Status[], boolean]> => {
    // TODO: Replace with the result of calling server
    return FakeData.instance.getPageOfStatuses(lastItem, pageSize);
  };

  return (
    <div className="container px-0 overflow-visible vh-100">
      <InfiniteScroll
        className="pr-0 mr-0"
        dataLength={items.length}
        next={() => loadMoreItems(lastItem)}
        hasMore={hasMoreItems}
        loader={<h4>Loading...</h4>}
      >
        {items.map((item, index) => (
          <div
            key={index}
            className="row mb-3 mx-0 px-0 border rounded bg-white"
          >
            <div className="col bg-light mx-0 px-0">
              <div className="container px-0">
                <div className="row mx-0 px-0">
                  <div className="col-auto p-3">
                    <img
                      src={item.user.imageUrl}
                      className="img-fluid"
                      width="80"
                      alt="Posting user"
                    />
                  </div>
                  <div className="col">
                    <h2>
                      <b>
                        {item.user.firstName} {item.user.lastName}
                      </b>{" "}
                      -{" "}
                      <Link
                        to={`/feed/${item.user.alias}`}
                        onClick={navigateToUser}
                      >
                        {item.user.alias}
                      </Link>
                    </h2>
                    {item.formattedDate}
                    <br />
                    <Post status={item} featurePath="/feed" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};
