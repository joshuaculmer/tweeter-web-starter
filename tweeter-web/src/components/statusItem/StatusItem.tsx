import Post from "./Post";
import { Link, useNavigate } from "react-router-dom";
import { AuthToken, Status, FakeData, User } from "tweeter-shared";
import { useUserInfo, useUserInfoActions } from "../userInfo/UserInfoContexts";
import { useMessageActions } from "../toaster/messagehooks";

export const PAGE_SIZE = 10;

interface Props {
  item: Status;
  featurePath: string;
}

const StatusItem = (props: Props) => {
  const { displayErrorMessage } = useMessageActions();
  const item = props.item;
  const { displayedUser, authToken } = useUserInfo();
  const navigate = useNavigate();
  const { setDisplayedUser } = useUserInfoActions();

  const navigateToUser = async (event: React.MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      const alias = extractAlias(event.target.toString());

      const toUser = await getUser(authToken!, alias);

      if (toUser) {
        if (!toUser.equals(displayedUser!)) {
          setDisplayedUser(toUser);
          navigate(`${props.featurePath}/${toUser.alias}`);
        }
      }
    } catch (error) {
      displayErrorMessage(`Failed to get user because of exception: ${error}`);
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

  return (
    <>
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
                <Link to={`/feed/${item.user.alias}`} onClick={navigateToUser}>
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
    </>
  );
};

export default StatusItem;
