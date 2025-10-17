import { Status } from "tweeter-shared";
import StatusItem from "../statusItem/StatusItem";
import { StatusItemPresenter } from "../../model.presenter/StatusItemPresenter";
import { PagedItemView } from "../../model.presenter/PagedItemPresenter";
import ItemScroller from "./ItemScroller";

interface Props {
  featureUrl: string;
  presenterFactory: (view: PagedItemView<Status>) => StatusItemPresenter;
}

const StatusItemScroller = (props: Props) => {
  return (
    <ItemScroller<Status>
      featureUrl={props.featureUrl}
      presenterFactory={props.presenterFactory}
      itemComponent={StatusItem}
    ></ItemScroller>
  );
};

export default StatusItemScroller;
