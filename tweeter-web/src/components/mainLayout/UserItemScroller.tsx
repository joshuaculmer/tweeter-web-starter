import { User } from "tweeter-shared";
import UserItem from "../userItem/UserItem";
import { UserItemPresenter } from "../../model.presenter/UserItemPresenter";
import { PagedItemView } from "../../model.presenter/PagedItemPresenter";
import ItemScroller from "./ItemScroller";

interface Props {
  featureUrl: string;
  presenterFactory: (view: PagedItemView<User>) => UserItemPresenter;
}

const UserItemScroller = (props: Props) => {
  return (
    <ItemScroller<User>
      featureUrl={props.featureUrl}
      presenterFactory={props.presenterFactory}
      itemComponent={UserItem}
    ></ItemScroller>
  );
};

export default UserItemScroller;
